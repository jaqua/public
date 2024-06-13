// import { GraphQLDefinitionsFactory } from '@nestjs/graphql'
// import { join } from 'path'

const GraphQLDefinitionsFactory =
  require('@nestjs/graphql').GraphQLDefinitionsFactory

const join = require('path').join

const definitionsFactory = new GraphQLDefinitionsFactory()
definitionsFactory.generate({
  typePaths: ['./**/*.graphql'],
  path: join(process.cwd(), 'apps/project.de/api/src/app/graphql.ts'),
  outputAs: 'interface'
})
