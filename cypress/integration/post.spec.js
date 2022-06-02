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
})