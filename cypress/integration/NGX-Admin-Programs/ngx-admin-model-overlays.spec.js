// Author: Krishna Rao

/// <reference types='Cypress'/>

describe('Model & Overlays - Dialog Suite', function () {

    beforeEach('Open App', function () {
        cy.visit('pages')
        cy.title().should('include', 'ngx-admin')
        cy.get('.logo').should('have.text', 'ngx-admin')
        cy.contains('Modal & Overlays').click()
        cy.contains('Dialog').click()
        cy.get('nb-card-header').should('contain', 'Open Dialog')
    })

    it('Dialog - Open Dialog', function () {
        //Open Dialog
        cy.get('button').contains('Open Dialog with component').click()
        cy.get('button').should('contain', 'Dismiss Dialog')
        cy.get('button').contains('Dismiss Dialog').click()

        cy.get('button').contains('Open Dialog with template').click()
        cy.get('button').should('contain', 'Close Dialog')
        cy.get('button').contains('Close Dialog').click()        
    })

    it('Dialog - Open Without Backdrop', function () {
        //Open Without Backdrop
        cy.get('button').contains('Open Dialog with backdrop').click()
        cy.get('button').should('contain', 'Dismiss Dialog')
        cy.get('body').click(0,0);
        cy.get('button').should('not.contain', 'Dismiss Dialog')

        //Open Dialog without backdrop
        cy.get('button').contains('Open Dialog without backdrop').click()
        cy.get('button').should('contain', 'Close Dialog')
        cy.get('body').click(0,0);
        cy.get('button').should('contain', 'Close Dialog')
        cy.contains('Close Dialog').click()
    })

    it('Dialog - Open Without Esc Close', function () {
        //Open Without Esc Close
        cy.contains('Open Dialog with esc close').click()
        cy.get('button').should('contain', 'Dismiss Dialog')
        cy.get('body').type('{esc}')
        cy.get('button').should('not.contain', 'Dismiss Dialog')

        //Open Dialog without esc close
        cy.contains('Open Dialog without esc close').click()
        cy.get('button').should('contain', 'Close Dialog')
        cy.get('body').type('{esc}')
        cy.get('button').should('contain', 'Close Dialog')
        cy.contains('Close Dialog').click()
    })

    it('Dialog - Return Result From Dialog', function () {
        cy.contains('Enter Name').click()
        cy.get('[placeholder="Name"]').type('Hi Cypress')
        cy.contains('Cancel').click()
        cy.get('ul').should('not.contain', 'Hi Cypress')
        cy.contains('Enter Name').click()
        cy.get('[placeholder="Name"]').type('Hi Cypress')
        cy.contains('Submit').click()
        cy.get('ul').should('contain', 'Hi Cypress')
    })

})

