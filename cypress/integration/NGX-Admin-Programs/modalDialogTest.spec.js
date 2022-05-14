
// Author: Krishna Rao

import { home } from "../../support/page_objects/HomePage";
import { dialog } from "../../support/page_objects/ModalOverlaysDialogPage";

describe('Dialog Suite', function () {

    beforeEach('Open App', function () {
        cy.openApplication()
        home.navigateTo_ModalDialog()
    })

    it('Open Dialog', () => {
        dialog.openDialog()
    })

    it('Dialog Backdrop', () => {
        dialog.dialogBackdrop
    })

    it('Dialog Escape Close', () => {
        dialog.dialogEscClose()
    })

    it('Dialog Return Result', () => {
        dialog.dialogReturnResult()
    })

})