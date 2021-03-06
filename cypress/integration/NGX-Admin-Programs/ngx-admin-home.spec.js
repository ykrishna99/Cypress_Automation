// Author: Krishna Rao

/// <reference types='Cypress'/>

describe('Home suite', function () {

    const menus = ['Layout', 'Forms', 'Model & Overlays', 'Extra Components', 'Tables & Data', 'Auth']
    const themesColors = {
        "Light":"rgb(255, 255, 255)",
        "Dark":"rgb(34, 43, 69)",
        "Cosmic":"rgb(50, 50, 89)",
        "Corporate":"rgb(255, 255, 255)",
    }

    beforeEach('Open App', function () {
        cy.visit('pages')
        cy.title().should('include', 'ngx-admin')
        cy.get('.logo').should('have.text', 'ngx-admin')
    })

    it('Menus validation', function (){
        cy.get('span.menu-title').each( menuItems => {
            const actMenu = menuItems.text().trim()   
            for (let index = 0; index < menus.length; index++) {
                const element = menus[index];
                if (element == actMenu) {
                    expect(element).equal(actMenu)
                }
                
            }
        })
    })
    
    it('Themes validation', function () {
        cy.get('nb-select').click()
        cy.get('.options-list nb-option').each( (themes, index) =>{            
            const themeName = themes.text().trim()
            cy.wrap(themes).click()
            cy.get('nb-select').should('contain', themeName)
            cy.get('nb-layout-header nav').should('have.css', 'background-color', themesColors[themeName])
            if (index < 3){
                cy.get('nb-select').click()
            }            
        })
    })

});