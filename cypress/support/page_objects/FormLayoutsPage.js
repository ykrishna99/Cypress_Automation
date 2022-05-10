/// <references types="Cypress"/>

export class FormLayoutsPage {

    forms_InlineForm(userName, email){
        cy.get('nb-card-header').should('contain', 'Inline form')
        cy.get('form.form-inline input[placeholder="Jane Doe"]').type(userName, {force: true})
        cy.get('form.form-inline input[placeholder="Email"]').type(email, {force: true})
        cy.get('form.form-inline span.text').should('have.text', 'Remember me')
        cy.get('form.form-inline input[type="checkbox"]').click({force: true})
        cy.get('form.form-inline span.custom-checkbox').invoke('attr', 'class').should('include', 'checked')
        cy.get('form.form-inline button').contains('Submit').click()
    }

    forms_UsingTheGrid(email, password){
        cy.get('nb-card-header').should('contain', 'Using the Grid')
        cy.get('#inputEmail1').type(email)
        cy.get('#inputPassword2').type(password)
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
    } 
}

export const formLayout = new FormLayoutsPage()