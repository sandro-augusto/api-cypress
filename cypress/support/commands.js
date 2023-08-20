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
import { faker } from '@faker-js/faker';

Cypress.Commands.add('login', () => {
    cy.api({
        method: 'POST',
        url: '/login',
        body: {
            "email": "fulano@qa.com",
            "password": "teste"
        }
    }).then((response) => { return response })
})

Cypress.Commands.add('getProdutos', () => {
    cy.api({
        method: 'GET',
        url: '/produtos'
    })
        .then((response) => { return response })
})

Cypress.Commands.add('token', (email, senha) => {
    cy.api({
        method: 'POST',
        url: '/login',
        body: {
            "email": email,
            "password": senha
        }
    }).then((response) => {
        expect(response.status).to.eq(200)
        return response.body.authorization
    })
})

Cypress.Commands.add('cadastrarProdutos', (token, produto, preco, descricao, quantidade) => {

    cy.api({
        method: 'POST',
        url: '/produtos',
        headers: { authorization: token },
        body: {
            "nome": produto,
            "preco": preco,
            "descricao": descricao,
            "quantidade": quantidade
        },
        failOnStatusCode: false
    }).then((response) => { return response })
})

Cypress.Commands.add('editarProdutos', (token) => {
    cy.cadastrarProdutos(token, faker.person.firstName(), 1049, faker.person.fullName(), 1000)
        .then(response => {
            let id = response.body._id
            cy.api({
                method: 'PUT',
                url: `/produtos/${id}`,
                headers: { authorization: token },
                body:
                {
                    "nome": faker.person.firstName(),
                    "preco": faker.string.numeric(5),
                    "descricao": faker.person.firstName(),
                    "quantidade": faker.string.numeric(4)
                },
                failOnStatusCode: false
            }).then((response) => { return response })
        })
})

Cypress.Commands.add('deletarProdutos', (token) => {
    cy.cadastrarProdutos(token, faker.person.firstName(), 1049, faker.person.fullName(), 1000)
        .then(response => {
            let id = response.body._id
            cy.api({
                method: 'DELETE',
                url: `/produtos/${id}`,
                headers: { authorization: token }
            }).then((response) => { return response })
        })
})

Cypress.Commands.add('getId', (token) => {
    cy.cadastrarProdutos(token, faker.person.firstName(), 1049, faker.person.fullName(), 1000)
        .then(response => {
            let id = response.body._id
            cy.api({
                method: 'GET',
                url: `/produtos/${id}`,
                headers: { authorization: token },
                failOnStatusCode: false
            }).then((response) => { return response })
        })
})