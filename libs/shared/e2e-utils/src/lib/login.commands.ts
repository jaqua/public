/**
 * @author        Dr. J. Quader
 * @copyright     © 2020-2024 by J. Quader
 */

// load the global Cypress types
/// <reference types="cypress" />

export const login = () => {
  const username = 'admin'
  const password = 'admin'

  cy.request('/api/auth/csrf').then(({ body: { csrfToken } }) => {
    cy.request({
      method: 'POST',
      url: '/api/auth/callback/credentials',
      form: true,
      body: {
        username,
        password,
        csrfToken
      }
    }).then(() => {
      cy.getCookie('next-auth.session-token').should('exist')
    })
  })
}

export const loginUI = () => {
  cy.clearCookie('next-auth.session-token')
  const username = 'admin'
  const password = 'admin'

  cy.get('form').should('exist')

  cy.get('[name=username]').type(username)
  cy.get('[name=password]').type(password, { log: false })
  cy.get('[name=password]').should((el$) => {
    if (el$.val() !== password)
      throw new Error('Different value of typed password')
  })
  cy.get('[type=submit]').click()
  cy.get('form').should('not.exist')

  cy.getCookie('next-auth.session-token').should('exist')
}
