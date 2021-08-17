describe('Delete SI',function(){

    beforeEach(function() {
        cy.fixture('Login').then((Login)=>{

            this.Login=Login;
                
        })
        cy.fixture('url').then((url)=>{

            this.url=url;
                
        })
    })

    it('SI should be deleted successfully',function(){
        Cypress.on('uncaught:exception', (err, runnable) => {
            return false;
        });
        cy.visit('/')
        cy.get('input[id="username"]', { timeout: 10000}).type(this.Login.userName)
        cy.get('input[id="password"]').type(this.Login.password)
        cy.get('button[id="kc-submit"]').click()
        cy.contains('Additional Services',{ timeout: 30000}).click()

        cy.contains('Standing Orders').click();
        cy.get('td',{ timeout: 10000}).eq(0).click();
        cy.contains('Delete Standing Order',{ timeout: 10000}).click()
        cy.get('button[class="bb-load-button btn-primary btn btn-md"]').click();
       
    })
    
});