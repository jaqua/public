/* eslint-disable */
export default {
  displayName: 'shared-util-media',
  preset: '../../../../jest.preset.js',
  testEnvironment: 'node',
  transform: {
    '^.+\\.[tj]s$': ['ts-jest', { tsconfig: '<rootDir>/tsconfig.spec.json' }]
  },
  moduleFileExtensions: ['ts', 'js', 'html'],
  setupFilesAfterEnv: ['./jest.setup.ts'],
  coverageDirectory: '../../../../coverage/libs/shared/util/media'
}
