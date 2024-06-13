import { CodegenConfig } from '@graphql-codegen/cli'

const config: CodegenConfig = {
  schema: [
    'apps/project.de/api/src/**/*.graphql',
    'libs/shared/feat/modules/common/**/*.graphql',
    'libs/shared/feat/modules/admin/**/*.graphql'
  ],
  generates: {
    ['libs/project.de/util/graphql/src/lib/generated.ts']: {
      documents: [
        'libs/project.de/util/graphql/src/lib/documents/**/*.gql',
        'libs/shared/util/graphql/src/lib/documents/queries/*.gql',
        'libs/shared/util/graphql/src/lib/documents/mutations/admin/*.gql',
        'libs/shared/util/graphql/src/lib/documents/queries/admin/*.gql'
      ],
      plugins: [
        'typescript',
        'typescript-operations',
        'typescript-react-apollo',
        'typescript-mongodb'
      ],
      // preset: 'client',
      config: {
        declarationKind: 'class'
        // withHooks: false,
        // withComponent: false,
        // withHOC: false,
        // avoidOptionals: false,
        // preResolveTypes: false
      }
    }
  },
  overwrite: true
}

export default config
