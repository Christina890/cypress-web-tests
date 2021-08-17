describe('International Payments',function(){

    beforeEach(function() {
        cy.fixture('Login').then((Login)=>{

            this.Login=Login;
                
        })
        cy.fixture('url').then((url)=>{

            this.url=url;
                
        })
    })
        it('International Transfers should be successful ',function(){
            Cypress.on('uncaught:exception', (err, runnable) => {
                return false;
            });
            cy.visit('/')
            cy.get('input[id="username"]', { timeout: 10000}).type(this.Login.userName)
            cy.get('input[id="password"]').type(this.Login.password)
            cy.get('button[id="kc-submit"]').click()
            cy.get('#bb-menu-header-button-2',{ timeout: 60000}).click()
            cy.contains('International Payment').click()
            cy.get('div[class="bb-product-selector__item-content"]').click()
            cy.contains('00101748915010', {timeout: 10000} ).click()
            cy.get('div[class="bb-search-box__append-content input-group-append"]', {timeout: 10000}).eq(0).click()
            cy.get('button[class="bb-grouped-list__item bb-list__item--no-separator dropdown-item"').eq(0).click()
            cy.get('input[id="bb_element_12"]').type(13);
            cy.get('input[id="reference"]').click();
            cy.contains('Insurance',{ timeout: 10000} ).click();
            cy.get('input[placeholder="Enter a payment reference"]').type('ref12344');
            cy.contains('Next').click()
            cy.server();
            cy.route('POST', '/api/payment-order-service/client-api/v2/payment-orders').as('route1');
            cy.contains('Submit',{timeout: 10000}).click()
            cy.wait(['@route1'], { responseTimeout: 60000 });
            cy.get('span[class="modal-title"]').should('contain','Payment Successful')
        })
    });