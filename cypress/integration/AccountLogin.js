describe('Open Retail Omni web',function(){

    beforeEach(function() {
        cy.fixture('Login').then((Login)=>{

            this.Login=Login;
                
        })
        cy.fixture('url').then((url)=>{

            this.url=url;
                
        })
    })
    it('User should be logged in successfully',function(){
        Cypress.on('uncaught:exception', (err, runnable) => {
            return false;
        });
        cy.visit('https://test-dxp.imbank.com/inm-retail/login')
        cy.get('input[id="username"]', { timeout: 10000}).type('christineapondi')
        cy.get('input[id="password"]').type('Password1*')
        cy.get('button[id="kc-submit"]').click()
        cy.get('h3[aria-level="3"]', { timeout: 10000}).should('contain','Christine Onyango')

    })
});