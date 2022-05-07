// Author: Krishna Rao

/// <reference types = "Cypress"/>

const smartTblColumns = ['ID', 'First Name', 'Last Name', 'Username', 'E-mail', 'Age']

describe("Smart Table Suite", function () {

    it("Smart Table - Verify table headers", function () {
        cy.visit('pages')
        cy.title().should('include', 'ngx-admin')
        cy.get('.logo').should('have.text', 'ngx-admin')

        cy.get('a[title="Tables & Data"]').click()
        cy.get('a[title="Smart Table"]').click()
        cy.get('nb-card-header').should('have.text', ' Smart Table ')
        cy.get('table').should('be.visible')

        // Verifying table headers
        cy.get('.ng2-smart-actions div').should('have.text', 'Actions')
        cy.get('ng2-smart-table-title a').each( (tableColumns, index) => {
            var colName = tableColumns.text().trim()
            expect(colName).equals(smartTblColumns[index])
        })

        // Verifying table headers filters placeholder value
        cy.get('.ng2-smart-actions-title a').should('have.attr', 'href').should('eq', '#')
        cy.get('input.form-control').each( (tableColumns, index) => {
            cy.wrap(tableColumns).then( tblCol =>{
                cy.log(tblCol.attr('placeholder'))
                var plsValue = tblCol.attr('placeholder')
                expect(plsValue).equals(smartTblColumns[index])
            })
        })
    })

     //add new row to the table
    it('Add new row to the table', function () {
        const data = {
                        'ID':61, 
                        'First_Name':'Krishna', 
                        'Last_Name':'Yallampalli', 
                        'Username':'krishna', 
                        'E_mail':'krishna@test.com', 
                        'Age': 40
                    }
        
        cy.get('a.ng2-smart-action-add-add').click()
        cy.get('i.nb-checkmark').should('be.visible')
        cy.get('input-editor input[placeholder="ID"]').type(data.ID)
        cy.get('input-editor input[placeholder="First Name"]').type(data.First_Name)
        cy.get('input-editor input[placeholder="Last Name"]').type(data.Last_Name)
        cy.get('input-editor input[placeholder="Username"]').type(data.Username)
        cy.get('input-editor input[placeholder="E-mail"]').type(data.E_mail)
        cy.get('input-editor input[placeholder="Age"]').type(data.Age)
        cy.get('i.nb-checkmark').click()
        cy.wait(2000)
        cy.get('input-filter input[placeholder="ID"]').type(`${data.ID}{enter}`)
        cy.get('div[ng-reflect-ng-switch="number"] div').should('contain', data.ID)
    })
})