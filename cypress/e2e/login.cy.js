/// <reference types="cypress" />

describe('Login - Testes de API ServeRest', () => {

    context('Login', () => {
        it('Deve fazer o login com sucesso', () => {
            cy.login()
                .then((response) => {
                    expect(response.status).to.eq(200)
                    expect(response.body.message).to.eql('Login realizado com sucesso')
                    expect(response.body.authorization).not.be.null
                })
        })
    })
})

