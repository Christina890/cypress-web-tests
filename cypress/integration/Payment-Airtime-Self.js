describe('Airtime Purchase to Self',function(){

        beforeEach(function() {
            cy.fixture('Login').then((Login)=>{
    
                this.Login=Login;
                    
            })
            cy.fixture('url').then((url)=>{
    
                this.url=url;
                    
            })
        })

        it('Airtime Purchase to Self should be successful',function(){
            Cypress.on('uncaught:exception', (err, runnable) => {
                return false;
            });
            cy.visit('/')
            cy.get('input[id="username"]', { timeout: 10000}).type(this.Login.userName)
            cy.get('input[id="password"]').type(this.Login.password)
            cy.get('button[id="kc-submit"]').click()
            cy.wait(1000)  
            cy.get('#bb-menu-header-button-2',{ timeout: 60000}).click()
            cy.contains('Mobile Payments').click()
            cy.contains('Airtime Purchase').click()
            cy.get('div[class="bb-product-selector__item-content"]').click()
            cy.contains('KES', { timeout: 60000}).click()
            cy.wait(5000)
            cy.get('input[id="bb_element_12"]').type(11);
            cy.get('button[class="bb-load-button btn-primary btn btn-md"]').click()
            cy.server();
            cy.route('POST', '/api/payment-order-service/client-api/v2/payment-orders').as('route1');
            cy.contains('Submit',{ timeout: 60000}).click()
            cy.wait(['@route1'], { responseTimeout: 60000 });
            cy.get('span[class="modal-title"]').should('contain','Payment Successful')
        })
    });