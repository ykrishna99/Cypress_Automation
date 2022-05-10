
// Author: Krishna Rao

import { home } from "../../support/page_objects/HomePage";

describe('Home Suite', function () {

    beforeEach('Open App', function () {
        cy.visit('pages')
        cy.title().should('include', 'ngx-admin')
        cy.get('.logo').should('have.text', 'ngx-admin')
    })

    it('Menus Validation', function () {
        home.menusValidation()
    })

    it('Themes Validation', function () {
        home.themesValidation()
    })

    it('Navigation Test', function () {
        home.menusValidation()
        home.themesValidation()
    })

})