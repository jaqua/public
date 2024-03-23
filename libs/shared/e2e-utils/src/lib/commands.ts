// eslint-disable-next-line @typescript-eslint/no-namespace
declare namespace Cypress {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface Chainable<Subject> {
    login(username: string, password: string, useUI?: boolean): void
    seed(data: any): void
  }
}

Cypress.Commands.add('login', (username, password, useUI) => {
  cy.clearCookie('next-auth.session-token')

  expect(username, 'username was set').to.be.a('string').and.not.be.empty
  if (typeof password !== 'string' || !password)
    throw new Error('Missing password value, set using CYPRESS_PASSWORD=...')

  if (useUI) {
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
  } else {
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
})

Cypress.Commands.add('seed', (data) => {
  for (const [collection, documents] of Object.entries(data)) {
    cy.dropCollection(collection, { failSilently: 'true' })
    if (documents?.length)
      cy.insertMany(documents as Document[], {
        collection,
        failSilently: 'true'
      })
  }
})
