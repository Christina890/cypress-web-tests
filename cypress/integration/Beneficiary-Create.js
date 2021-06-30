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
        cy.visit('https://test-dxp.imbank.com/inm-retail/login')
        cy.get('input[id="username"]', { timeout: 10000}).type('christineapondi')
        cy.get('input[id="password"]').type('Password1*')
        cy.get('button[id="kc-submit"]').click()
        cy.get('bb-icon-ui[class="bb-mega-menu__expand-marker bb-mega-menu__expand-marker--vertical"]').click()
        cy.contains('Beneficiary Manager').click();
        cy.contains('Create New').click();
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