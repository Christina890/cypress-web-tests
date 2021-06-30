describe('Send Money to phone payment',function(){

    beforeEach(() =>{
        Cypress.on('uncaught:exception', (err, runnable) => {
            return false;
        });

        cy.visit('https://test-dxp.imbank.com/inm-retail/login')
        //cy.wait(2000);
        cy.get('input[id="username"]').type('christineapondi')
        cy.get('input[id="password"]').type('Password1*')
        cy.get('button[id="kc-submit"]').click()
        //cy.wait(20000)         
        })
        //beforeEach(() =>{
            //Cypress.Cookies.preserveOnce('session_id', 'remember_token')});
    it('Payment should be successful',function(){
        cy.server();
        cy.route('GET', '/api/product-summary-presentation-service/client-api/v2/productsummary').as('products');
        cy.wait(['@products'], { responseTimeout: 60000 });
      

        cy.get('#bb-menu-header-button-2',{ timeout: 10000}).click()
        cy.contains('Mobile Payments').click()
        cy.contains('Send Money to Mobile').click()
        cy.wait(5000)
        cy.get('div[class="bb-product-selector__item-content"]').click()
        cy.contains('KES').click()
        cy.get('button[class="dropdown-toggle btn-outline-secondary btn btn-md"]').click()
        cy.get('button[class="bb-grouped-list__item bb-list__item--no-separator dropdown-item"]').eq(0).click();
        cy.get('input[id="bb_element_12"]').type(15);
        cy.contains('Next').click()
        cy.server();
        cy.route('POST', '/api/payment-order-service/client-api/v2/payment-orders').as('route1');
        cy.contains('Submit',{ timeout: 60000}).click()
        cy.wait(['@route1'], { responseTimeout: 200000 });
        cy.get('span[class="modal-title"]').should('contain','Payment Successful')
    })
    
});