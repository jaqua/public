/**
 * @author        Dr. J. Quader
 * @copyright     © 2020-2024 by J. Quader
 */
import { MongoClient, MongoClientOptions } from 'mongodb'

/**
 * Drops each collection and insert fixture data.
 * Is called from `db:seed` task in e2e. It uses its own db connection.
 * @param data Data array, which is passed from test file itself
 * @param {string} dbName
 */
export const seed = async (
  data: Record<string, Document[]>,
  dbName: string
) => {
  if (!(data && dbName)) throw new Error('Data or database name missing')

  const url = 'mongodb://127.0.0.1:27017'
  const options: MongoClientOptions = {}
  const client = new MongoClient(url, options)

  try {
    await client.connect()
    const db = await client.db(dbName + '-e2e')

    for (const [collection, documents] of Object.entries(data)) {
      // drop collection
      const list = await db.listCollections({ name: collection }).toArray()
      if (list.length !== 0) {
        const isDropped = await db.dropCollection(collection)
        if (!isDropped)
          throw Error('Could not drop ' + collection + 'collection')
      }
      // add data
      if (documents?.length)
        await db.collection(collection).insertMany(documents)
    }

    client.close()
    return null
  } catch (error) {
    console.error(error)
  }
}
