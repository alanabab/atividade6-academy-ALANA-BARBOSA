// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

import {faker} from '@faker-js/faker';

Cypress.Commands.add('newUser', (name, email)=>{
    cy.request(
        'POST',
        'https://rarocrud-80bf38b38f1f.herokuapp.com/api/v1/users',
        {name: name, email: email}
      );
 })

 
Cypress.Commands.add('newDoubleUser', ()=>{
  let nomeUser1 = faker.person.firstName() + " Gelcia";
  let nomeUser2 = faker.person.firstName()
  let emailUser1 = faker.string.alpha(12).toLowerCase() + "@oi.com";
  let emailUser2 = faker.internet.email({firstName: 'Gelcia'}).toLowerCase(); 
  
  cy.request(
      'POST',
      'https://rarocrud-80bf38b38f1f.herokuapp.com/api/v1/users',
      {name: nomeUser1, email: emailUser1}
    );
     
  cy.request(
    'POST',
    'https://rarocrud-80bf38b38f1f.herokuapp.com/api/v1/users',
    {name: nomeUser2, email: emailUser2}
  );
})