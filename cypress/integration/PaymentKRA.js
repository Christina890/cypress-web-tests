
describe('KRA PAYMENTS',function(){

    beforeEach(function() {
        cy.fixture('Login').then((Login)=>{

            this.Login=Login;
                
        })
        cy.fixture('url').then((url)=>{

            this.url=url;
                
        })
    })
it('KRA payments should be successful',function(){
    Cypress.on('uncaught:exception', (err, runnable) => {
        return false;
    });
    cy.visit('/')
    cy.get('input[id="username"]', { timeout: 10000}).type(this.Login.userName)
    cy.get('input[id="password"]').type(this.Login.password)
    cy.get('button[id="kc-submit"]').click()
    cy.get('#bb-menu-header-button-2',{ timeout: 60000}).click()
    cy.contains('Bill Payments').click()
    cy.contains('KRA Payment').click()
    cy.get('button[class="bb-product-selector__item dropdown-toggle btn-unstyled btn btn-md"]').click({force: true})
    cy.wait(2000);
    cy.contains('KES', { timeout: 10000}).click()
    cy.get('div[class="d-flex justify-content-between mx-0"]').type(2020200000003156)
    cy.server();
    cy.route('GET', 'api/omni-integration-service/client-api/v1/eslip-query?referenceNumber=2020200000003156').as('eslip');
    cy.get('button[class="bb-load-button btn-primary btn btn-md"]').eq(0).click();
    cy.wait(['@eslip'], { responseTimeout: 100000 });
    cy.get('button[class="bb-load-button btn-primary btn btn-md"]').eq(1).click()
    cy.server();
    cy.route('POST', '/api/payment-order-service/client-api/v2/payment-orders').as('paymentOrder');
    cy.contains('Submit',{ timeout: 60000}).click()
    cy.wait(['@paymentOrder'], { responseTimeout: 60000 });
    cy.get('span[class="modal-title"]').should('contain','Payment Successful')
})
});