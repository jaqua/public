import { INestApplication, Inject, Module } from '@nestjs/common'
import { assert } from 'check-types'
import { Db, MongoClient, MongoClientOptions } from 'mongodb'

const DB_CLIENT_PROVIDER_KEY = 'DATABASE_CLIENT'
const DB_CONNECTION_PROVIDER_KEY = 'DATABASE_CONNECTION'

type TClient = {
  client: MongoClient | null
}

const getMongoClient = async () => {
  const isProduction = process.env.NODE_ENV === 'production'
  // const isTest = process.env.NODE_ENV === 'test'

  const database = process.env.DB_DATABASE
  const user = process.env.DB_USER
  const pwd = process.env.DB_PASSWORD

  const host =
    process.env.DB_HOST ??
    (database && isProduction
      ? 'mongodb-0.mongodb-headless.databases.svc.cluster.local:27017,mongodb-1.mongodb-headless.databases.svc.cluster.local:27017,mongodb-2.mongodb-headless.databases.svc.cluster.local:27017/?replicaSet=rs0&authSource=admin'
      : '127.0.0.1:27017')

  const mongo: string =
    'mongodb://' +
    (isProduction && user && pwd ? user + ':' + pwd + '@' : '') +
    host

  const options: MongoClientOptions = {}
  const client = new MongoClient(mongo, options)
  return client
}
const getDbConnection = async (client: MongoClient) => {
  const isTest = process.env.NODE_ENV === 'test'
  const database = process.env.DB_DATABASE
  try {
    await client.connect()
    return client.db(isTest ? database + '-e2e' : database)
  } catch (error) {
    console.error(error)
  }
}

export const mongodb = async (): Promise<Db | undefined> => {
  const client = await getMongoClient()
  return await getDbConnection(client)
}

@Module({
  providers: [
    {
      provide: DB_CLIENT_PROVIDER_KEY,
      useFactory: (): TClient => {
        return { client: null }
      }
    },
    {
      provide: DB_CONNECTION_PROVIDER_KEY,
      inject: [DB_CLIENT_PROVIDER_KEY],
      useFactory: async (databaseClientProvider: TClient) => {
        databaseClientProvider.client = await getMongoClient()
        return await getDbConnection(databaseClientProvider.client)
      }
    }
  ],
  exports: [DB_CONNECTION_PROVIDER_KEY, DB_CLIENT_PROVIDER_KEY]
})
export class DatabaseModule {
  constructor(@Inject(DB_CLIENT_PROVIDER_KEY) private dbClient: TClient) {}

  async onModuleDestroy(): Promise<void> {
    try {
      const client: MongoClient | null = this.dbClient.client
      if (client) {
        await client.close()
      }
      console.log('mongodb connection closed')
    } catch (error) {
      console.error(error)
    }
  }

  onApplicationShutdown(signal: string) {
    if (signal) console.log(signal + ' signal recieved') // e.g. "SIGINT"
  }
}

interface Collection {
  type: string
  number?: number
}
/**
 * Uses factories to generate data. Insert data to db.
 * If generated data is type of files, the documents array gets flattened
 * @param {Collection} data Fixtures data array
 * @param {Db} db Instance of Mongo Db
 * @param {Object} factories Factories to build data
 * @returns {Array|Object} Inserted documents (as array if multiple)
 */
export const insertData = async (
  data: Collection[],
  db: Db,
  factories: any
) => {
  const result = []
  const files = []

  for (let i = 0; i < data.length; i++) {
    const { type, number }: Collection = data[i]
    // Generate documents
    const d = factories[type].buildList(number || 1)
    // Flatten files
    const isFiles = type === 'fs.files'
    if (isFiles) {
      for (let i = 0; i < d.length; i++) {
        const element = d[i].files
        files.push(...element)
      }
    }
    const documents = isFiles ? files : d

    // Add documents to collection
    if (db) {
      await db.collection(type).insertMany(documents)
    }

    // ...and to result array, which gets finally returned by this function
    result.push(documents.length > 1 ? documents : documents[0])
  }
  return result.length > 1 ? result : result[0]
}

/**
 * Drop given collections.
 * @param {string[]} collections
 * @param {Db} db Instance of Mongo Db
 */
export const dropCollections = async (collections: Array<string>, db: Db) => {
  for (let index = 0; index < collections.length; index++) {
    const name: string = collections[index]
    const list = await db.listCollections({ name }).toArray()
    if (list.length !== 0) {
      const isDropped = await db.dropCollection(name)
      if (!isDropped) throw Error('Could not drop ' + name + 'collection')
    }
  }
  return null
}

export const addFixtures = async (app: INestApplication, data: any) => {
  if (process.env.NODE_ENV === 'development') {
    const db = app.get(DB_CONNECTION_PROVIDER_KEY, { strict: false })
    // console.log(db, 'mongo db')
    for (const [collection, documents] of Object.entries(data)) {
      const count = await db.collection(collection).countDocuments()
      if (count === 0) {
        const { insertedCount } = (await db
          .collection(collection)
          .insertMany(documents)) || { insertedCount: 0 }
        console.log(insertedCount + ' documents inserted in ' + collection)
      }
    }
  }
}

/**
 * @param {Db} db Instance of Mongo Db
 * @param {string} field config data field
 */
export const updateVersion = async (db: Db, field: string) => {
  assert.in(field, ['patch', 'minor', 'major'])
  assert.not.undefined(db)

  try {
    const version = await db.collection('config').findOne({ name: 'version' })
    if (version)
      await db.collection('config').updateOne(
        { name: 'version' },
        {
          $set: {
            [field]: version[field] + 1,
            lastModified: new Date()
          }
        }
      )
    else
      await db.collection('config').insertOne({
        name: 'version',
        major: 1,
        minor: 0,
        patch: 0,
        lastModified: new Date()
      })

    return true
  } catch (error) {
    console.error(error)
  }
}
