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
        cy.visit('/')
        cy.get('input[id="username"]', { timeout: 10000}).type(this.Login.userName)
        cy.get('input[id="password"]').type(this.Login.password)
        cy.get('button[id="kc-submit"]').click()
        cy.get('h3[aria-level="3"]', { timeout: 60000}).should('contain',this.Login.name)

    })
});