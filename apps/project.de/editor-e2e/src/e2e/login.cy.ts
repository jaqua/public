import { fixtures } from '@jaqua/project.de/factories'

before(() => {
  cy.seed(fixtures())
  cy.visit('/login')
})

it('should display form and perform login', () => {
  cy.findAllByText('Login').should('exist')
  cy.login('admin', 'admin', true)
  cy.findByRole('button', { name: /upload/i }).should('exist')
})
