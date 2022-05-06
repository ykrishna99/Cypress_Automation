// Author: Krishna Rao

/// <references types="Cypress"/>

describe("ngx-admin forms suite", function () {

    it("Inline form", function () {
        cy.visit('pages')
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

    it("Using the Grid", function () {
        cy.get('nb-card-header').should('contain', 'Using the Grid')
        cy.get('#inputEmail1').type('krishna@test.com')
        cy.get('#inputPassword2').type('test1234')
        cy.get('div.form-group input[type="radio"]').then( radioOptions =>{
            cy.wrap(radioOptions)
                .first()
                .check({force: true})
                .should('be.checked')

            cy.wrap(radioOptions)
                .eq(1)
                .check({force: true})
                .should('be.checked')

            cy.wrap(radioOptions)
                .first()
                .should('not.be.checked')
            
            cy.wrap(radioOptions)
                .last()
                .should('be.disabled')
            
            cy.get('div.form-group button').contains('Sign in').click()
        })
    })
})