

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
        cy.visit('/')
        cy.get('input[id="username"]', { timeout: 10000}).type(this.Login.userName)
        cy.get('input[id="password"]').type(this.Login.password)
        cy.get('button[id="kc-submit"]').click()
        cy.get('div[class="mt-3 py-1  bb-product-kind"]', { timeout: 100000}).eq(0).click();
        cy.contains('00101748915010').click();
        cy.wait('@Transactions',{ timeout: 100000}).its('status').should('eq', 200);
      

    })
});