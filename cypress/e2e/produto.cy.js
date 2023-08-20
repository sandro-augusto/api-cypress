/// <reference types="cypress" />
import { faker } from '@faker-js/faker';

describe('Testes da funcionalidade Produto', () => {
    let token
    before(() => {
        cy.token('fulano@qa.com', 'teste').then(tkn => { token = tkn })
    })

    context('Cadastro, Listar e Excluir Produtos', () => {

        it('Listar Produtos', () => {
            cy.getProdutos()
                .then((response) => {
                    expect(response.status).to.eq(200)
                    expect(response.body).not.be.null
                    expect(response.body).to.have.property('produtos')
                })
        })
    
        it('Cadastrar Produtos', () => {
            let produto = `Teste Qa.Coders ${Math.floor(Math.random() * 999999)}`
    
            cy.cadastrarProdutos(token, produto, 1049, "TESTE QA", 1000)
                .then((response) => {
                    expect(response.status).to.eq(201)
                    expect(response.body.message).to.eq('Cadastro realizado com sucesso')
                })
        })
    
        it('Deve pesquisar por ID com sucesso', () => {
    
            cy.getId(token)
                .then(response => {
                    let id = response.body._id
                    expect(response.status).to.eq(200)
                    expect(id).to.eq(response.body._id)
                })
        })
    
        it('Deve Editar um Produto com sucesso', () => {
    
            cy.editarProdutos(token)
                .then(response => {
                    expect(response.body.message).to.eq('Registro alterado com sucesso')
                    expect(response.status).to.eq(200)
                })
        })
    
        it('Deve Excluir um Produto com sucesso', () => {
    
            cy.deletarProdutos(token)
                .then(response => {
                    expect(response.body.message).to.eq('Registro excluído com sucesso')
                    expect(response.status).to.eq(200)
                })
        })

    })

    context('Validação das mensagens de erro', () => {

        it('Validar mensagem de duplicação', () => {
            cy.cadastrarProdutos(token, "Teste QaCoders 2", 1049, faker.person.firstName(), 1000)
                .then((response) => {
                    expect(response.status).to.eq(400)
                    expect(response.body.message).to.eq('Já existe produto com esse nome')
                })
        })

        it('Validar mensagem de Token ausente', () => {
            cy.cadastrarProdutos("", "Teste QaCoders 2", 1049, faker.person.firstName(), 1000)
                .then((response) => {
                    expect(response.status).to.eq(401)
                    expect(response.body.message).to.eq('Token de acesso ausente, inválido, expirado ou usuário do token não existe mais')
                })
        })

        it('Validar mensagens dos campos obrigatórios', () => {
            cy.cadastrarProdutos(token, "", "", "", "")
                .then((response) => {
                    expect(response.status).to.eq(400)
                    expect(response.body.nome).to.eq('nome não pode ficar em branco')
                    expect(response.body.preco).to.eq('preco deve ser um número')
                    expect(response.body.descricao).to.eq('descricao não pode ficar em branco')
                    expect(response.body.quantidade).to.eq('quantidade deve ser um número')
                })
        })


    })



})