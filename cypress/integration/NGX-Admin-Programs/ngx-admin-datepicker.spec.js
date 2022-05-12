//Author: Krishna Rao

/// <reference types="Cypress"/>

const dpHeaders = ['Common Datepicker', 'Datepicker With Range', 'Datepicker With Disabled Min Max Values']
const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

describe('Datepicker suite', function () {

    it('Common Datepicker', function () {
        cy.visit('pages')
        cy.title().should('include', 'ngx-admin')
        cy.get('.logo').should('have.text', 'ngx-admin')

        cy.get('a[title="Forms"]').click()
        cy.get('a[title="Datepicker"]').click()
        cy.get('ngx-datepicker').should('be.visible')
        cy.get('nb-card nb-card-header').each( (dp, index) => {
            var dpName = dp.text().trim()
            expect(dpName).equals(dpHeaders[index])
        })
        cy.get('[placeholder="Form Picker"]').then(commDP =>{
            cy.wrap(commDP).click()
            var currentDate = new Date()
            var day = currentDate.getDate()
            cy.log("Todays day is: " + day)
            var myDate = currentDate.toLocaleDateString('en-us', { year:"numeric", month:"short", day:"numeric"}) 
            cy.log(myDate)
            cy.get('nb-calendar-day-cell').contains(`${day}`).click()
            cy.wrap(commDP).should('have.value', myDate)
        })
    })

    it('Datepicker With Range', function () {
        cy.get('[placeholder="Range Picker"]').then(rangeDP =>{
            cy.wrap(rangeDP).click()
            cy.get('nb-calendar-range-day-cell').contains(' 1 ').click()
            cy.get('nb-calendar-range-day-cell').contains(' 20 ').click()
            var currentDate = new Date()
            var month = monthNames[currentDate.getMonth()]
            var year = currentDate.getFullYear()            
            var myDate1 = month + " 1, " + year 
            var myDate2 = month + " 20, " + year 
            var finalRangeDate = myDate1 + ' - ' + myDate2
            cy.log(finalRangeDate)
            cy.wrap(rangeDP).should('have.value', finalRangeDate)
        })
    })

    it('Datepicker With Disabled Min Max Values', function () {
        cy.get('input[placeholder="Min Max Picker"]').then( mmDP => {
            cy.wrap(mmDP).click()
            var currentDate = new Date()
            var today = currentDate.getDate()
            var myDate = currentDate.toLocaleDateString('en-us', { year:"numeric", month:"short", day:"numeric"}) 
            var daystoPrev = today - 6
            var daystoFut = today + 6
            if (today > 6 ){         
                cy.get('nb-calendar-day-cell').contains(`${daystoPrev}`).should('have.class', 'disabled')
            }
            cy.get('nb-calendar-day-cell').contains(`${daystoFut}`).should('have.class', 'disabled')
            cy.get('nb-calendar-day-cell').contains(`${today}`).click()
            cy.wrap(mmDP).should('have.value', myDate)  
        })
    })
})