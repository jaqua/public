import { nxE2EPreset } from '@nx/cypress/plugins/cypress-preset'
import { defineConfig } from 'cypress'

import { fixtures } from '@jaqua/project.de/factories'
import { seed } from '@jaqua/testing'

export default defineConfig({
  e2e: {
    ...nxE2EPreset(__dirname),
    setupNodeEvents(on) {
      on('task', {
        'db:seed': async (type) => {
          let data
          switch (type) {
            default:
              data = fixtures()
              break
          }
          return seed(data, 'public')
        }
      })
    }
  }
})
