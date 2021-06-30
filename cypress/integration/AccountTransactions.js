

describe('Get Recent Transactions',function(){

    beforeEach(function() {
        cy.fixture('Login').then((Login)=>{

            this.Login=Login;
                
        })
        cy.fixture('url').then((url)=>{

            this.url=url;
                
        })
    })
    it('Recent Transactions should be fetched successfully',function(){
        Cypress.on('uncaught:exception', (err, runnable) => {
            return false;
        });
        cy.server();
        cy.route('GET', 'https://test-dxp.imbank.com/api/transaction-presentation-service/client-api/v2/transactions?arrangementId=8a808bcf772a166601775cf5adda0006').as('Transactions');
        cy.visit('https://test-dxp.imbank.com/inm-retail/login')
        cy.get('input[id="username"]', { timeout: 15000}).type('christineapondi')
        cy.get('input[id="password"]').type('Password1*')
        cy.get('button[id="kc-submit"]').click()
        cy.get('div[class="mt-3 py-1  bb-product-kind"]').eq(0).click();
        cy.contains('00101748915010').click();
        cy.wait('@Transactions',{ timeout: 15000}).its('status').should('eq', 200);
      

    })
});