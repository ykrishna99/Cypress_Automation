
// Author: Krishna Rao

import { home } from "../../support/page_objects/HomePage";
import { smartTable } from "../../support/page_objects/SmartTablesPage";

describe('Smart Tables Suite', function () {

    beforeEach('Open App', function () {
        cy.visit('pages')
        cy.title().should('include', 'ngx-admin')
        cy.get('.logo').should('have.text', 'ngx-admin')

        cy.get('a[title="Tables & Data"]').click()
        cy.get('a[title="Smart Table"]').click()
        cy.get('nb-card-header').should('have.text', ' Smart Table ')
        cy.get('table').should('be.visible')
    })

    it('Table headers Test', function (){
        smartTable.verifyTableHeaders()
    })

    it('Table filters Test', function (){
        smartTable.verifyTableFilter()
    })

    it('Add new row Test', function (){
        smartTable.addNewRowToTheTable()
    })

    it('Edit row Test', function (){
        smartTable.editTheTableRow()
    })

    it('Delete row Test', function (){
        smartTable.deleteTheTableRow()
    })

    it('Search Test', function (){
        smartTable.searchTheTable()
    })

    it('All Test', function (){
        smartTable.verifyTableHeaders()
        smartTable.verifyTableFilter()
        smartTable.addNewRowToTheTable()
        smartTable.editTheTableRow()
        smartTable.searchTheTable()
        smartTable.deleteTheTableRow()
    })
})