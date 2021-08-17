
describe('Utility Payments',function(){

    beforeEach(function() {
        cy.fixture('Login').then((Login)=>{

            this.Login=Login;
                
        })
        cy.fixture('url').then((url)=>{

            this.url=url;
                
        })
    })
it('KPLC Prepaid payments should be successful',function(){
    Cypress.on('uncaught:exception', (err, runnable) => {
        return false;
    });
    cy.visit('/')
    cy.get('input[id="username"]', { timeout: 10000}).type(this.Login.userName)
    cy.get('input[id="password"]').type(this.Login.password)
    cy.get('button[id="kc-submit"]').click()
    cy.get('#bb-menu-header-button-2',{ timeout: 60000}).click()
    cy.contains('Bill Payments').click()
    cy.contains('Utility Payment').click()
    cy.get('button[class="bb-product-selector__item dropdown-toggle btn-unstyled btn btn-md"]').click({force: true})
    cy.wait(2000);
    cy.contains('KES').click()
    cy.get('input[id="beneficiaryName"]').click({force: true})
    cy.get('button[class="bb-grouped-list__item bb-list__item--no-separator dropdown-item"]').eq(0).click({force: true});
    cy.get('button[class="bb-load-button btn-primary btn btn-md"]').eq(0).click();
    cy.get('input[id="bb_element_12"]').type(19);
    cy.get('button[class="bb-load-button btn-primary btn btn-md"]').eq(1).click()
   
    cy.server();
    cy.route('POST', '/api/payment-order-service/client-api/v2/payment-orders').as('route1');
    cy.contains('Submit',{ timeout: 60000}).click()
    cy.wait(['@route1'], { responseTimeout: 60000 });
    cy.get('span[class="modal-title"]').should('contain','Payment Successful')
})
});