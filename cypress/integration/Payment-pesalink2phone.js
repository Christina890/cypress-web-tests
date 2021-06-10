
describe('Pesalink to Phone',function(){

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
it('Pesalink to Phone Payments should successful',function(){
    Cypress.on('uncaught:exception', (err, runnable) => {
        return false;
    });

    cy.get('#bb-menu-header-button-2').click()
    cy.contains('PesaLink to Phone').click()
    cy.get('input[id="beneficiaryName"]').click()
    cy.wait(5000)
    cy.get('button[class="bb-grouped-list__item bb-list__item--no-separator dropdown-item"]').eq(1).click();
    cy.get('button[class="bb-load-button btn-primary btn btn-md"]').eq(0).click();
    cy.get('input[id="bankName"]').click()
    cy.wait(10000)
    cy.get('div[class="dropdown-menu pre-scrollable bb-grouped-list bb-grouped-list--density-md col-md-12 show"]').eq(0).click()
    cy.get('input[id="bb_element_13"]').type(18);
    cy.get('input[id="reference"]').click();
    cy.contains('Insurance').click();
    cy.get('button[class="bb-load-button btn-primary btn btn-md"]').eq(1).click()
    cy.wait(2000)
    cy.server();
    cy.route('POST', '/api/payment-order-service/client-api/v2/payment-orders').as('route1');
    cy.contains('Submit').click()
    cy.wait(['@route1'], { responseTimeout: 60000 });
    cy.get('span[class="modal-title"]').should('contain','Payment Successful')
})
});