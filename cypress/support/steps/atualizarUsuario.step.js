import { Given, When, Then } from 'cypress-cucumber-preprocessor/steps';
import {faker} from '@faker-js/faker';
import ListaUsuarioPage from '../pages/listaUsuarios.page';
import atualizarUsuarioPage from '../pages/atualizarUsuario.page';

const paginaUserList = new ListaUsuarioPage();
const paginaAtualizar = new atualizarUsuarioPage();

Given('que já existe um usuário cadastrado', function () {
    var novoNome = faker.person.firstName() + " Teste Atualizar";
    var emailFaker = faker.string.alpha(12).toLowerCase() + "@oi.com";
    
    cy.newUser(novoNome, emailFaker)
    .then((response) => {
        cy.wrap(response.body.id).as('idUser');
        cy.wrap(emailFaker).as('emailUser');
        cy.wrap(novoNome).as('nomeUser');
    });
});

Given('que acessei a página de detalhes de usuário', function () {
    cy.get('@idUser').then ((idUser) => {
        cy.visit("https://rarocrud-frontend-88984f6e4454.herokuapp.com/users/" + idUser);
    })
});

Given('que existe outro usuário cadastrado com determinado email', function () {
    const nomeUser2 = faker.person.firstName() + " Teste Email em Uso";
    const emailUser2 = faker.string.alpha(12).toLowerCase() + "@oi.com";
    
    cy.newUser(nomeUser2, emailUser2);
    cy.wrap(emailUser2).as('emailEmUso');
});

When('clicar em Editar', function () {
    paginaAtualizar.clickEditar();
});

When('informar um novo nome e um novo email para o usuário', function () {
    var novoEmail = faker.string.alpha(12).toLowerCase() + "@oi.com";

    cy.get(paginaAtualizar.inputName).clear();
    paginaAtualizar.typeName('Nome Atualizado');
    cy.wrap('Nome Atualizado').as('nomeAtual');
    cy.get(paginaAtualizar.inputEmail).clear();
    paginaAtualizar.typeEmail(novoEmail);
    cy.wrap(novoEmail).as('emailAtual');
});

When('clicar em Salvar', function () {
    paginaAtualizar.clickSalvar();
});

When('tentar acessar a página de detalhes de um usuário inexistente', function () {
    cy.visit("https://rarocrud-frontend-88984f6e4454.herokuapp.com/users/6a20fd06-g10c1-41c8-8c0c-4c3a8naoexiste");
});

When('limpar o campo Nome', function () {
    cy.get(paginaAtualizar.inputName).clear();
});

When('limpar o campo Email', function () {
    cy.get(paginaAtualizar.inputEmail).clear();
});

When('informar um novo e-mail {string} para o usuário', function (email) {
    paginaAtualizar.typeEmail(email);
});

When('informar um nome com mais de 100 caracteres para o usuário', function () {
    const name101 = faker.string.fromCharacters('abc', 101);
    paginaAtualizar.typeName(name101);
});

When('informar um e-mail com mais de 60 caracteres para o usuário', function () {
    const email61 = faker.string.fromCharacters('abc', 61);
    paginaAtualizar.typeEmail(email61);
});

When('informar o mesmo e-mail usado pelo outro usuário', function () {
    cy.get(paginaAtualizar.inputEmail).clear();
    cy.get('@emailEmUso').then((email) => {
        paginaAtualizar.typeEmail(email);
    })
});

Then('visualizarei a mensagem {string} na tela', function (message) {
    cy.contains(message).should("exist");
});

Then('os dados do usuário serão atualizados na lista', function () {
    cy.get('@emailAtual').then((email) => {
        cy.visit(paginaUserList.URL);
        paginaUserList.typeSearchBar(email);
        cy.wait(1500);
        paginaUserList.getUserList().invoke('text').should('contain', email);
    });
    
    cy.get('@nomeAtual').then((name) => {
        paginaUserList.getUserList().invoke('text').should('contain', name);
    });
});

Then('visualizarei o aviso {string} na tela', function (message) {
    cy.contains(message).should("exist");
    cy.contains("Não foi possível localizar o usuário.").should("exist");
    cy.contains("Cancelar").should("exist");
});

Then('serei redirecionado a lista de usuários', function () {
    cy.get('.sc-lcIPJg.ifkIA-D').invoke('text').should('equal', 'Cancelar');
    cy.get('.sc-lcIPJg.ifkIA-D').click();
    cy.wait(1500);
    cy.url().should('equal', paginaUserList.URL);
});

Then('visualizarei o alerta {string} na tela', function (message) {
    cy.contains(message).should("exist");
});

Then('visualizarei o erro {string} na tela', function (errorMessage) {
    cy.contains("Erro").should("exist");
    cy.contains(errorMessage).should("exist");
    cy.contains("Cancelar").should("exist");
});