export default class atualizarUsuarioPage {
    buttonsEditar = 'button[type="button"]';
    buttonSalvar = 'button[type="submit"]';
    inputName = '#userName';
    inputEmail = '#userEmail';
    inputID = '[name=id]';

    clickEditar() {
        cy.get(this.buttonsEditar).click();
    }

    clickSalvar() {
        cy.get(this.buttonSalvar).click();
    }

    clickCancelar() {
        cy.get(this.buttonsEditar).click();
    }

    typeName(name) {
        cy.get(this.inputName).type(name)
    }
    
    typeEmail(email) {
        cy.get(this.inputEmail).type(email)
    }
}