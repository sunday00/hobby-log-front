import type { CodegenConfig } from '@graphql-codegen/cli'

const config: CodegenConfig = {
  overwrite: true,
  generates: {
    'src/gql/types.ts': {
      schema: ['./gpls/*.graphqls'],
      plugins: [
        'typescript',
        'typescript-operations',
        'codegen.plugin.empty.js',
      ],
    },
  },
}

export default config
