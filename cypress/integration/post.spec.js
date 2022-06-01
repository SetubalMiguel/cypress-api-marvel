describe('POST /characters', function () {

    before(function () {

        const login = {
            email: "jonaslima2122@gmail.com",
            password: "grniqw78@@"
        }

        cy.request({
            method: 'POST',
            url: '/sessions',
            body: login
        }).then(function(response){
            expect(response.status).to.be.equal(200)
            cy.log(response.body.token)
            Cypress.env('token', response.body.token)
        })
    })

    it('Deve cadastrar um personagem', function () {
        const character = {
            name: "Charles Chavier",
            alias: "Professor X",
            team: ["x-main", "a"],
            active: false
        }

        cy.request({
            method: 'POST',
            url: '/characters',
            headers:{
                Authorization: Cypress.env('token')
            },
            body: character
        }).then(function (response) {
            expect(response.status).to.be.equal(201)
        })

    })
})