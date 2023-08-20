/// <reference types="Cypress"/>
import { faker } from '@faker-js/faker';

describe('Deve realizar as funcionalidades do carrinho', () => {

    it.only('Deve verificar os carrinhos cadastrados', () => {

        cy.api({
            method: 'GET',
            url: '/carrinhos'
        }).then((response) => {
            expect(response.status).to.eq(200)
            expect(response.body).not.be.null
        })
    })


})