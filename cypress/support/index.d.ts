/// <reference types="cypress" />

declare namespace Cypress {
  interface Chainable<Subject> {
    /**
     * Custom command to log-in user
     * @example cy.login('cypress', 'password123')
     */
    login(email: string, password: string): Chainable<Subject>;
  }
}
