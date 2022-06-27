/// <reference types="cypress"/>

describe('GET /characters', function () {

    const massa = [
        {
            name: "Charles Chavier 1",
            alias: "Professor X 1",
            team: ["x-main", "a"],
            active: true
        },
        {
            name: "Tony Stark 1",
            alias: "Homem de Ferro 1",
            team: ["vingadores"],
            active: true
        },
        {
            name: "Wanda 1",
            alias: "Feitiseira 1",
            team: ["vingadores", "vila"],
            active: true
        }

    ]

    before(function () {       
        cy.popularBase(massa)
    })


    it('deve retornar uma lista de personagens', function () {
        cy.pegarPersonagen().then(function (response) {
            expect(response.status).to.eql(200)
            expect(response.body).to.be.a('array')
            expect(response.body.length).greaterThan(0)
        })
    })

    it('deve retornar uma personagen pelo nome', function () {
        cy.buscarPersonagen('Wanda').then(function (response) {
            expect(response.status).to.eql(200)
            expect(response.body.length).to.eql(1)
            expect(response.body[0].name).to.eql('Wanda 1')
        })
    })

})

describe('GET /characters/id', function () {

    const tony = {
        name: "Tony Stark",
        alias: "Homem de Ferro",
        team: ["vingadores"],
        active: true
    }

    context('quando tenho um personagem cadastrado', function () {

        before(function () {
            cy.cadastraPersonagen(tony).then(function (response) {
                Cypress.env('charaterId', response.body.character_id)
            })

        })

        it('deve buscar o personagem pelo id', function () {
            const id = Cypress.env('charaterId')
            cy.buscarPersonagenId(id).then(function (response) {
                expect(response.status).to.eql(200)
                expect(response.body.name).to.eql('Tony Stark')

            })

        })

        it('deve retornar 404 ao buscar um id não cadastrado', function(){

            const id = '000000000000000000000000'
            cy.buscarPersonagenId(id).then(function (response) {
                expect(response.status).to.eql(404)                
            })

        })

    })

})