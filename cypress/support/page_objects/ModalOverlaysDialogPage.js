
// Author: Krishna Rao

/// <references types="Cypress"/>

export class ModalOverlaysDialogPage {

    //Dialog - Open Dialog
    openDialog(){
        //Open Dialog
        cy.get('button').contains('Open Dialog with component').click()
        cy.get('button').should('contain', 'Dismiss Dialog')
        cy.get('button').contains('Dismiss Dialog').click()

        cy.get('button').contains('Open Dialog with template').click()
        cy.get('button').should('contain', 'Close Dialog')
        cy.get('button').contains('Close Dialog').click()
    }

    //Dialog - Open Without Backdrop
    dialogBackdrop(){
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
    }

    //Esc Close
    dialogEscClose(){
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
    }

    //Return Result Dialog
    dialogReturnResult(){
        cy.contains('Enter Name').click()
        cy.get('[placeholder="Name"]').type('Hi Cypress')
        cy.contains('Cancel').click()
        cy.get('ul').should('not.contain', 'Hi Cypress')
        cy.contains('Enter Name').click()
        cy.get('[placeholder="Name"]').type('Hi Cypress')
        cy.contains('Submit').click()
        cy.get('ul').should('contain', 'Hi Cypress')
    }

}

export const dialog = new ModalOverlaysDialogPage()