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

        cy.get('thead').find('.nb-plus').click()
        cy.get('.nb-checkmark').should('be.visible')
        cy.get('thead').find('tr').eq(2).then(tableRow =>{
            cy.wrap(tableRow).find('[placeholder="ID"]').type(data.ID)
            cy.wrap(tableRow).find('[placeholder="First Name"]').type(data.First_Name)
            cy.wrap(tableRow).find('[placeholder="Last Name"]').type(data.Last_Name)
            cy.wrap(tableRow).find('[placeholder="Username"]').type(data.Username)
            cy.wrap(tableRow).find('[placeholder="E-mail"]').type(data.E_mail)
            cy.wrap(tableRow).find('[placeholder="Age"]').type(data.Age)
            cy.wrap(tableRow).find('.nb-checkmark').click()
            cy.wait(2000)
        })
        cy.get('input-filter input[placeholder="ID"]').type(`${data.ID}{enter}`)
        cy.wait(500)
        cy.get('tbody').contains('tr',`${data.ID}`).then( tableRow1 =>{
            cy.wrap(tableRow1).find('td').eq(6).should('contain', `${data.Age}`)
        })
        cy.get('input-filter input[placeholder="ID"]').clear()
        cy.wait(500)
    })

    //Edit the table row
    it('Edit the table row', function () {      
        cy.get('a[title="Smart Table"]').click()  
        cy.get('tbody').contains('tr','Larry').then( tableRow =>{
            cy.wrap(tableRow).find('.nb-edit').click()
            cy.wrap(tableRow).find('[placeholder="Age"]').clear().type('40')
            cy.wrap(tableRow).find('.nb-checkmark').click()
            cy.wrap(tableRow).find('td').eq(6).should('contain', '40')
        })
    })

    it('Search the table', function () {
        const ageSearch = ['20', '25', '30', '35', '40', '45', '50', '55', '60']
        
        ageSearch.forEach( age => {
            cy.get('[placeholder="Age"]').clear().type(`${age}`)
            cy.wait(250)
            cy.get('tbody').find('tr').each( tableRows => {
                var rowData = tableRows.find('td').text().trim()
                if (rowData == 'No data found'){
                    cy.wrap(tableRows).find('td').should('contain', `${rowData}`)
                }else{
                    cy.wrap(tableRows).find('td').eq(6).should('contain', `${age}`)
                }    
            })    
        })
        cy.get('[placeholder="Age"]').clear()
        cy.wait(200)
    })

    it('Delete the table row', function () {

        //Delete the first row - approach1
        cy.get('tbody tr').first().find('.nb-trash').click()
        cy.on('window:confirm', (confirm) =>{
            expect(confirm).to.equal('Are you sure you want to delete?')            
        })

        //Delete the first row - approach2
        const stub = cy.stub()
        cy.on('window:confirm', stub)
        cy.get('tbody tr').first().find('.nb-trash').click().then( () =>{
            expect(stub.getCall(0)).to.be.calledWith('Are you sure you want to delete?')
        })
        
        //Delete confirming to false
        // cy.get('tbody tr').first().find('.nb-trash').click()
        // cy.on('window:confirm', () => false)
    })

})