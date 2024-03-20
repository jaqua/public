import { Logger, NestApplicationOptions } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import graphqlUploadExpress from 'graphql-upload/graphqlUploadExpress.js'
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import helmet from 'helmet'

import { addFixtures } from '@jaqua/db'
import { fixtures } from '@jaqua/shared/util/factories'

type CorsOption = { credentials: boolean; origin: RegExp | boolean }
const helm = helmet({
  frameguard: false,
  contentSecurityPolicy: false,
  crossOriginResourcePolicy: false
})

const upload = graphqlUploadExpress({
  maxFileSize: 50 * 1024 * 1024,
  maxFiles: 1
})

export const terminate = (
  server: any,
  options = { coredump: false, timeout: 500 }
) => {
  const exit = (code: number) => {
    options.coredump ? process.abort() : process.exit(code)
  }

  return (code: number, reason: string) => (err: Error) => {
    if (err && err instanceof Error) Logger.error(err.message, err.stack)

    // Attempt a graceful shutdown
    server.close(exit)
    const timer = setTimeout(exit, options.timeout)
    clearTimeout(timer) // timer.unref()
  }
}

export const main = async (AppModule: unknown, corsOptions: CorsOption) => {
  const isDevelopment = process.env.NODE_ENV === 'development'
  const port: number = parseInt(process.env.PORT || '3000', 10)
  const options: NestApplicationOptions = {
    cors: true,
    logger: ['error', 'warn', 'log']
  }

  const app = await NestFactory.create(AppModule, options)

  app.use(helm, upload)

  app.enableCors(corsOptions)
  app.enableShutdownHooks()

  addFixtures(app, fixtures())

  const server = await app.listen(port, async () => {
    if (isDevelopment) Logger.log('Listening at http://localhost:' + port)
  })

  const exitHandler = terminate(server)

  process.on('uncaughtException', exitHandler(1, 'Unexpected Error'))
  process.on('unhandledRejection', exitHandler(1, 'Unhandled Promise'))
  process.on('SIGTERM', exitHandler(0, 'SIGTERM'))
  process.on('SIGINT', exitHandler(0, 'SIGINT'))
}
