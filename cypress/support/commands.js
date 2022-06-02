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
Cypress.Commands.add('limparAmbiente', function(){
    cy.request({
        method: 'DELETE',
        url: '/back2thepast/62977773fd16d2001677e1a3',
    }).then(function(response){
        expect(response.status).to.be.equal(200)            
    })
})

Cypress.Commands.add('login', function(){    
    const login = {
        email: "",
        password: ""
    }

    cy.request({
        method: 'POST',
        url: '/sessions',
        body: login
    }).then(function(response){
        expect(response.status).to.be.equal(200)        
        Cypress.env('token', response.body.token)
    })
})

Cypress.Commands.add('cadastraPersonagen', function(payload){
    cy.request({
        method: 'POST',
        url: '/characters',
        headers: {
            Authorization: Cypress.env('token')
        },
        body: payload, 
        failOnStatusCode: false 
    }).then(function(response){
        return response
    })
})