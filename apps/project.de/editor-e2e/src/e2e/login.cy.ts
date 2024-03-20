import { loginUI } from '@jaqua/testing'

before(() => {
  cy.task('db:seed')
  cy.visit('/login')
})

it('should display form and perform login', () => {
  cy.findAllByText('Login').should('exist')
  loginUI()
})
