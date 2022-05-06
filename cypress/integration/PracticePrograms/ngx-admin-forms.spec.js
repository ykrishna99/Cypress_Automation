// Author: Krishna Rao

/// <references types="Cypress"/>

const url = "http://localhost:4200/pages"

describe("ngx-admin forms suite", function () {

    it("Inline form", function () {
        cy.visit(url)
        cy.title().should('include', 'ngx-admin')
        cy.get('.logo').should('have.text', 'ngx-admin')

        cy.get('a[title="Forms"]').click()
        cy.get('a[title="Form Layouts"]').click()
        cy.get('ngx-form-layouts').should('be.visible')

        cy.get('nb-card-header').should('contain', 'Inline form')
        cy.get('form.form-inline input[placeholder="Jane Doe"]').type('krishna', {force: true})
        cy.get('form.form-inline input[placeholder="Email"]').type('krishna@test.com', {force: true})
        cy.get('form.form-inline span.text').should('have.text', 'Remember me')
        cy.get('form.form-inline input[type="checkbox"]').click({force: true})
        cy.get('form.form-inline span.custom-checkbox').invoke('attr', 'class').should('include', 'checked')
        cy.get('form.form-inline button').contains('Submit').click()
    })

    it.only("Using the Grid", function () {
        cy.visit(url)
        cy.title().should('include', 'ngx-admin')
        cy.get('.logo').should('have.text', 'ngx-admin')

        cy.get('a[title="Forms"]').click()
        cy.get('a[title="Form Layouts"]').click()
        cy.get('ngx-form-layouts').should('be.visible')

        cy.get('nb-card-header').should('contain', 'Using the Grid')
    })

    it("Basic form", function () {
        
    })

})