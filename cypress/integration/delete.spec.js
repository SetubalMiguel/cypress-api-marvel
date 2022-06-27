/// <reference types="cypress"/>

describe('DELETE /characters/id', function () {

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

        it('deve remover o personagem pelo id', function () {
            const id = Cypress.env('charaterId')
            cy.removerPersonagenId(id).then(function (response) {
                expect(response.status).to.eql(204)               

            })

        })

        after(function(){
            const id = Cypress.env('charaterId')
            cy.buscarPersonagenId(id).then(function (response) {
                expect(response.status).to.eql(404)                

            })
        })

        it('deve retornar 404 ao remover por um id não cadastrado', function(){

            const id = '000000000000000000000000'
            cy.removerPersonagenId(id).then(function (response) {
                expect(response.status).to.eql(404)                
            })

        })

    })
})