
describe('Internal Transfers',function(){

    beforeEach(() =>{
        Cypress.on('uncaught:exception', (err, runnable) => {
            return false;
        });

        cy.visit('https://test-dxp.imbank.com/inm-retail/login')
        //cy.wait(10000);
        cy.get('input[id="username"]').type('christineapondi')
        cy.get('input[id="password"]').type('Password1*')
        cy.get('button[id="kc-submit"]').click()
        cy.wait(20000)         
        })
it('Internal Transfers should be successful',function(){
    Cypress.on('uncaught:exception', (err, runnable) => {
        return false;
    });

    cy.get('#bb-menu-header-button-2').click()
    cy.contains('Local Payment').click()
    cy.get('input[id="beneficiaryName"]').click()
    cy.wait(5000)
    cy.get('button[class="bb-grouped-list__item bb-list__item--no-separator dropdown-item"]').eq(0).click();
    cy.get('input[id="bb_element_12"]').type(16);
    cy.get('input[id="reference"]').click();
    cy.contains('Insurance').click();
    cy.get('button[class="bb-load-button btn-primary btn btn-md"]').click()
    cy.wait(2000)
    cy.server();
    cy.route('POST', '/api/payment-order-service/client-api/v2/payment-orders').as('route1');
    cy.contains('Submit').click()
    cy.wait(['@route1'], { responseTimeout: 60000 });
    cy.get('span[class="modal-title"]').should('contain','Payment Successful')
})
});