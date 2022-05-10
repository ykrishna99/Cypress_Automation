
// Author: Krishna Rao

import { home } from "../../support/page_objects/HomePage";
import { formLayout } from "../../support/page_objects/FormLayoutsPage";

describe('Forms Suite', function () {
    
    beforeEach('Open App', function () {
        cy.visit('pages')
        cy.title().should('include', 'ngx-admin')
        cy.get('.logo').should('have.text', 'ngx-admin')
        home.navigateTo_FormLayout()
    })

    it('Inline Form', function (){
        formLayout.forms_InlineForm('Krishna', 'krishna@test.com')
    })
    
    it('Using the Grid', function (){
        formLayout.forms_UsingTheGrid('krishna@test.com', 'test1234')
    })

    it('Forms Test', function (){
        formLayout.forms_InlineForm('Krishna', 'krishna@test.com')
        formLayout.forms_UsingTheGrid('krishna@test.com', 'test1234')
    })

})