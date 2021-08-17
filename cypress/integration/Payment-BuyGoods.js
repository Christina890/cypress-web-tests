describe('Buy goods Payments ',function(){

    beforeEach(function() {
        cy.fixture('Login').then((Login)=>{

            this.Login=Login;
                
        })
        cy.fixture('url').then((url)=>{

            this.url=url;
                
        })
    })
        it('Buy Goods should be successful',function(){
            Cypress.on('uncaught:exception', (err, runnable) => {
                return false;
            });
            cy.visit('/')
            cy.get('input[id="username"]', { timeout: 10000}).type(this.Login.userName)
            cy.get('input[id="password"]').type(this.Login.password)
            cy.get('button[id="kc-submit"]').click()
            cy.get('#bb-menu-header-button-2',{ timeout: 60000}).click()
            cy.contains('Mobile Payments').click()
            cy.contains('Buy Goods').click()
            cy.wait(5000)
            cy.get('div[class="bb-product-selector__item-content"]').click()
            cy.contains('KES', { timeout: 60000}).click()
            cy.get('input[id="beneficiaryName"]').click()
            cy.get('button[class="bb-grouped-list__item bb-list__item--no-separator dropdown-item"]').eq(0).click();
            cy.get('input[id="bb_element_12"]').type(12);
            cy.server();
            cy.route('POST', 'https://test-dxp.imbank.com/api/omni-integration-service/client-api/v1/mpesa-organization-query').as('MpesaQuery');
            cy.get('button[class="bb-load-button btn-primary btn btn-md"]').click()
            cy.wait(['@MpesaQuery'], { responseTimeout: 100000 });
            //cy.wait(15000)
            cy.server();
            cy.route('POST', '/api/payment-order-service/client-api/v2/payment-orders').as('route1');
            cy.contains('Submit',{ timeout: 60000}).click()
            cy.wait(['@route1'], { responseTimeout: 200000 });
            cy.get('span[class="modal-title"]').should('contain','Payment Successful')
        })
    });