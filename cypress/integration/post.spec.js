/// <reference types="cypress"/>

describe('POST /characters', function () {

    before(function () {
        cy.limparAmbiente()
        cy.login()
    })

    it('Deve cadastrar um personagem', function () {
        const character = {
            name: "Charles Chavier",
            alias: "Professor X",
            team: ["x-main", "a"],
            active: true
        }
        cy.cadastraPersonagen(character).then(function (response) {
            expect(response.status).to.be.equal(201)
            expect(response.body.character_id).not.be.null
        })

    })

    context('dado que um personagem já existe', function () {

        const character = {
            name: "Wanda",
            alias: "Feitiseira",
            team: ["vingadores", "vila"],
            active: true
        }

        before(function () {
            cy.cadastraPersonagen(character).then(function (response) {
                expect(response.status).to.be.equal(201)
            })
        })

        it('não deve cadastrar duplicado', function () {
            cy.cadastraPersonagen(character).then(function (response) {
                expect(response.status).to.be.equal(400)
                expect(response.body.error).to.be.equal("Duplicate character")
            })
        })
    })

    context('Na tentativa de cadastrar um personagem', function () {

        it('se não for passado o nome, não deve concluir o cadastro', function () {
            const character = {
                alias: "Feitiseira",
                team: ["vingadores", "vila"],
                active: true
            }

            cy.cadastraPersonagen(character).then(function (response) {
                expect(response.status).to.be.equal(400)
                expect(response.body.validation.body.message).to.be.equal("\"name\" is required")
            })
        })

        it('se não for passado o codinome, não deve concluir o cadastro', function () {

            const character = {
                name: "Wanda",
                team: ["vingadores", "vila"],
                active: true
            }

            cy.cadastraPersonagen(character).then(function (response) {
                expect(response.status).to.be.equal(400)
                expect(response.body.validation.body.message).to.be.equal("\"alias\" is required")
            })
        })

        it('se não for passado ao menos um time, não deve concluir o cadastro', function () {

            const character = {
                name: "Wanda",
                alias: "Feitiseira",
                active: true
            }

            cy.cadastraPersonagen(character).then(function (response) {
                expect(response.status).to.be.equal(400)
                expect(response.body.validation.body.message).to.be.equal("\"team\" is required")
            })
        })

        it('se não for passado se o personagem está ativo ou não, não deve concluir o cadastro', function () {

            const character = {
                name: "Wanda",
                alias: "Feitiseira",
                team: ["vingadores", "vila"]
            }
            cy.cadastraPersonagen(character).then(function (response) {
                expect(response.status).to.be.equal(400)
                expect(response.body.validation.body.message).to.be.equal("\"active\" is required")
            })
        })
    })

    context('Ao tentar cadastrar um personagem', function () {
 

        it('se o nome for passado em branco, não deve concluir o cadastro', function () {

            const character = {
                name: "",
                alias: "Professor X",
                team: ["a"],
                active: true            
            }

            cy.cadastraPersonagen(character).then(function (response) {               

                expect(response.status).to.be.equal(400)
                expect(response.body.validation.body.message).to.be.equal("\"name\" is not allowed to be empty")
            })
        })


        it('se o codinome for passsado em branco, não deve concluir o cadastro', function () {

            const character = {
                name: "Charles Chavier",
                alias: "",
                team: ["a"],
                active: true            
            }

            cy.cadastraPersonagen(character).then(function (response) {
                expect(response.status).to.be.equal(400)
                expect(response.body.validation.body.message).to.be.equal("\"alias\" is not allowed to be empty")
            })
        })

        it('se o time for passado em branco, não deve concluir o cadastro', function () {

            const character = {
                name: "Charles Chavier",
                alias: "Professor X",
                team: [""],
                active: true            
            }

            cy.cadastraPersonagen(character).then(function (response) {
                expect(response.status).to.be.equal(400)
                expect(response.body.validation.body.message).to.be.equal("\"team[0]\" is not allowed to be empty")
            })
        })

        it('se o personagem está ativo ou não for passado em branco, não deve concluir o cadastro', function () {

            const character = {
                name: "Charles Chavier",
                alias: "Professor X",
                team: ["a"],
                active: ""            
            }

            cy.cadastraPersonagen(character).then(function (response) {
                expect(response.status).to.be.equal(400)
                expect(response.body.validation.body.message).to.be.equal("\"active\" must be a boolean")
            })
        })
    })
})


