// Author: Krishna Rao

/// <references types="Cypress"/>

const menus = ['Layout', 'Forms', 'Model & Overlays', 'Extra Components', 'Tables & Data', 'Auth']
const themesColors = {
        "Light":"rgb(255, 255, 255)",
        "Dark":"rgb(34, 43, 69)",
        "Cosmic":"rgb(50, 50, 89)",
        "Corporate":"rgb(255, 255, 255)",
    }

export class HomePage {

    menusValidation(){
        cy.get('span.menu-title').each( menuItems => {
            const actMenu = menuItems.text().trim()   
            for (let index = 0; index < menus.length; index++) {
                const element = menus[index];
                if (element == actMenu) {
                    expect(element).equal(actMenu)
                }
                
            }
        })
    }

    themesValidation(){
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
    }

    navigateTo_FormLayout(){
        cy.get('a[title="Forms"]').click()
        cy.get('a[title="Form Layouts"]').click()
        cy.get('ngx-form-layouts').should('be.visible')
    }

    navigateTo_Datepicker(){
        cy.get('a[title="Forms"]').click()
        cy.get('a[title="Datepicker"]').click()
        cy.get('ngx-datepicker').should('be.visible')
    }

    navigateTo_SmartTable(){
        cy.get('a[title="Tables & Data"]').click()
        cy.get('a[title="Smart Table"]').click()
        cy.get('nb-card-header').should('have.text', ' Smart Table ')
        cy.get('table').should('be.visible')
    }

    navigateTo_ModalDialog(){
        cy.contains('Modal & Overlays').click()
        cy.contains('Dialog').click()
        cy.get('nb-card-header').should('contain', 'Open Dialog')
    }

}

export const home = new HomePage()