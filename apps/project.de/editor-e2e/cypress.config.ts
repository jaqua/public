import { nxE2EPreset } from '@nx/cypress/plugins/cypress-preset'
import { defineConfig } from 'cypress'
import { configurePlugin } from 'cypress-mongodb'

export default defineConfig({
  env: {
    mongodb: {
      uri: 'mongodb://127.0.0.1:27017',
      database: 'public-e2e'
    }
  },
  e2e: {
    ...nxE2EPreset(__dirname),
    setupNodeEvents(on) {
      configurePlugin(on)
    }
  }
})
