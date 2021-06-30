describe('Get Product Summary',function(){

    beforeEach(function() {
        cy.fixture('Login').then((Login)=>{

            this.Login=Login;
                
        })
        cy.fixture('url').then((url)=>{

            this.url=url;
                
        })
    })
    it('Customer Products should be fetched successfully',function(){
        Cypress.on('uncaught:exception', (err, runnable) => {
            return false;
        });
        cy.server();
        cy.route('GET', '/api/product-summary-presentation-service/client-api/v2/productsummary').as('Products');
        cy.visit('https://test-dxp.imbank.com/inm-retail/login')
        cy.get('input[id="username"]', { timeout: 15000}).type('christineapondi')
        cy.get('input[id="password"]').type('Password1*')
        cy.get('button[id="kc-submit"]').click()
        cy.wait('@Products',{ timeout: 10000}).its('status').should('eq', 200);
      

    })
});