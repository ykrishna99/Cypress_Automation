//Author: Krishna Rao

import { home } from "../../support/page_objects/HomePage";
import { datepicker } from "../../support/page_objects/DatePickerPage";

describe('Datepicker Suite', function () {

    beforeEach('Open App', function () {
        cy.visit('pages')
        cy.title().should('include', 'ngx-admin')
        cy.get('.logo').should('have.text', 'ngx-admin')
        home.navigateTo_Datepicker()
    })

    it('Common Datepicker', function () {
        datepicker.commonDatepicker()
    })

    it('Range Datepicker', function () {
        datepicker.rangeDatepicker()
    })

    it('Min Max Datepicker', function () {
        datepicker.minmaxDatepicker()
    })
    
    it('All Datepickers Test', function () {
        datepicker.commonDatepicker()
        datepicker.rangeDatepicker()
        datepicker.minmaxDatepicker()
    })

})