import { userFactory } from '@jaqua/shared/util/factories'

const user = userFactory.build({}, { transient: { role: 'editor' } })

before(() => {
  cy.seed({ users: [user] })
  cy.visit('/login')
})

it('should display form and perform login', () => {
  cy.findAllByText('Login').should('exist')
  cy.login('admin', 'admin', true)
  cy.findByRole('button', { name: /upload/i }).should('exist')
})
