
// Author: Krishna Rao

import { home } from "../../support/page_objects/HomePage";
import { smartTable } from "../../support/page_objects/SmartTablesPage";

describe('Smart Tables Suite', function () {

    beforeEach('Open App', function () {
        cy.openApplication()
        home.navigateTo_SmartTable()
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