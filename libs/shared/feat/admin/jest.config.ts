/* eslint-disable */
export default {
  displayName: 'shared-feat-admin',
  preset: '../../../../jest.preset.js',
  transform: {
    '^.+\\.[tj]sx?$': ['babel-jest', { presets: ['@nx/react/babel'] }]
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  coverageDirectory: '../../../../reports/coverage/libs/shared/feat/admin'
}
