describe('Create a new beneficiary',function(){

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
        cy.contains('Additional Services',{ timeout: 30000}).click()
        cy.contains('Beneficiary Manager').click();
        cy.contains('Create New', { timeout: 20000}).click();
        cy.contains('Select a transfer type').click();
        cy.contains('Local Payment').click();
        //Random Beneficiary Name
        const uuid = () => Cypress._.random(0, 1e6)
        const id = uuid()
        const benName = `Automation${id}`
        cy.get('input[id="beneficiaryName"]').type(benName);
        cy.get('input[id="bankName"]').click()
        cy.contains('Credit Bank',{ timeout: 20000}).click();
        //Random Account name
        const accName = `Account Name${id}`
        cy.get('input[id="account-name"]').type(accName);
        //Random Account number
        const accNumber = uuid();
        cy.get('input[id="account-number"]').type(accNumber);
        cy.contains('Save').click();
        cy.get('div[class="bb-notification__body"]').should('contain','New beneficiary has been saved successfully');
       





    

    })
});