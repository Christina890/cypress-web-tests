describe('Edit Beneficiary',function(){

    beforeEach(function() {
        cy.fixture('Login').then((Login)=>{

            this.Login=Login;
                
        })
        cy.fixture('url').then((url)=>{

            this.url=url;
                
        })
    })
    it('Beneficiary should be edited successfully',function(){
        Cypress.on('uncaught:exception', (err, runnable) => {
            return false;
        });
        cy.visit('/')
        cy.get('input[id="username"]', { timeout: 10000}).type(this.Login.userName)
        cy.get('input[id="password"]').type(this.Login.password)
        cy.get('button[id="kc-submit"]').click()
        cy.contains('Additional Services',{ timeout: 30000}).click();
        cy.contains('Beneficiary Manager').click();
        cy.contains('Automation', { timeout: 100000}).click();
        cy.contains('Edit Beneficiary').click()
        const benName = `AutomationEdit`
        cy.get('input[id="beneficiaryName"]').click().clear().type(benName);
        const accName = `Account NameEdit`
        cy.get('input[id="account-name"]').clear().type(accName);
        //Random Account number
        cy.contains('Save').click();
        cy.get('div[class="bb-notification__body"]').should('contain','Beneficiary has been updated successfully');
       





    

    })
});