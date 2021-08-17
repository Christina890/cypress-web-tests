describe('Delete a beneficiary',function(){

    beforeEach(function() {
        cy.fixture('Login').then((Login)=>{

            this.Login=Login;
                
        })
        cy.fixture('url').then((url)=>{

            this.url=url;
                
        })
    })
    it('Beneficiary should be deleted successfully',function(){
        Cypress.on('uncaught:exception', (err, runnable) => {
            return false;
        });
        cy.visit('/')
        cy.get('input[id="username"]', { timeout: 10000}).type(this.Login.userName)
        cy.get('input[id="password"]').type(this.Login.password)
        cy.get('button[id="kc-submit"]').click()
        cy.contains('Additional Services',{ timeout: 30000}).click()
        cy.contains('Beneficiary Manager').click();
        cy.contains('Automation', { timeout: 100000}).click();
        cy.contains('Delete Beneficiary').click()
        cy.get('button[aria-label="Delete Beneficiary"').click();
        cy.get('div[class="bb-notification__body"]').should('contain','Beneficiary has been deleted successfully');

    })
});