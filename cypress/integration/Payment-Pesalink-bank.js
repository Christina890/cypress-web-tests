
describe('Pesalink to Account',function(){

    beforeEach(() =>{
        Cypress.on('uncaught:exception', (err, runnable) => {
            return false;
        });

        cy.visit('https://test-dxp.imbank.com/inm-retail/login')
        //cy.wait(10000);
        cy.get('input[id="username"]').type('christineapondi')
        cy.get('input[id="password"]').type('Password1*')
        cy.get('button[id="kc-submit"]').click()
        //cy.wait(20000)         
        })
it('Pesalink to Account Payments should successful',function(){
    Cypress.on('uncaught:exception', (err, runnable) => {
        return false;
    });

    cy.get('#bb-menu-header-button-2',{ timeout: 10000}).click()
    cy.contains('Local Payment').click()
    cy.get('input[id="beneficiaryName"]').click()
    cy.wait(5000)
    cy.get('div[class="bb-product-selector__item-content"]').click()
    cy.contains('KES').click()
    cy.get('button[class="bb-grouped-list__item bb-list__item--no-separator dropdown-item"]').eq(2).click({force: true});

    cy.get('input[id="bb_element_12"]').type(18);
    cy.get('input[id="reference"]').click();
    cy.contains('Insurance').click();
    cy.get('button[class="bb-load-button btn-primary btn btn-md"]').click()
    cy.server();
    cy.route('POST', '/api/payment-order-service/client-api/v2/payment-orders').as('route1');
    cy.contains('Submit',{ timeout: 60000}).click()
    cy.wait(['@route1'], { responseTimeout: 60000 });
    cy.get('span[class="modal-title"]').should('contain','Payment Successful')
})
});