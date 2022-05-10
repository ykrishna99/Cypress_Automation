
// Author: Krishna Rao

/// <references types="Cypress"/>

const smartTblColumns = ['ID', 'First Name', 'Last Name', 'Username', 'E-mail', 'Age']

export class SmartTablesPage {

    // Verifying table headers
    verifyTableHeaders(){
        cy.get('.ng2-smart-actions div').should('have.text', 'Actions')
        cy.get('ng2-smart-table-title a').each( (tableColumns, index) => {
            var colName = tableColumns.text().trim()
            expect(colName).equals(smartTblColumns[index])
        })
    }

    // Verifying table headers filters placeholder value
    verifyTableFilter(){
        cy.get('.ng2-smart-actions-title a').should('have.attr', 'href').should('eq', '#')
        cy.get('input.form-control').each( (tableColumns, index) => {
            cy.wrap(tableColumns).then( tblCol =>{
                cy.log(tblCol.attr('placeholder'))
                var plsValue = tblCol.attr('placeholder')
                expect(plsValue).equals(smartTblColumns[index])
            })
        })
    }

    addNewRowToTheTable(){
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
    }

    //Edit the table row
    editTheTableRow(){
        cy.get('a[title="Smart Table"]').click()  
        cy.get('tbody').contains('tr','Larry').then( tableRow =>{
            cy.wrap(tableRow).find('.nb-edit').click()
            cy.wrap(tableRow).find('[placeholder="Age"]').clear().type('40')
            cy.wrap(tableRow).find('.nb-checkmark').click()
            cy.wrap(tableRow).find('td').eq(6).should('contain', '40')
        })
    }

    //Search the table
    searchTheTable(){
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
    }

    //Delete the table row
    deleteTheTableRow(){
        //Delete the first row - approach1
        cy.get('tbody tr').first().find('.nb-trash').click()
        cy.on('window:confirm', (confirm) =>{
            expect(confirm).to.equal('Are you sure you want to delete?')            
        })
    }
}

export const smartTable = new SmartTablesPage()