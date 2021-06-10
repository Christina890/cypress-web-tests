describe('Airtime Purchase to Other',function(){

    beforeEach(() =>{
        Cypress.on('uncaught:exception', (err, runnable) => {
            return false;
        });

        cy.visit('https://test-dxp.imbank.com/inm-retail/login')
        cy.wait(12000);
        cy.get('input[id="username"]').type('christineapondi')
        cy.get('input[id="password"]').type('Password1*')
        cy.get('button[id="kc-submit"]').click()
        // cy.wait(20000)         
        })
        it('Airtime Purchase to Other should be successful',function(){
            Cypress.on('uncaught:exception', (err, runnable) => {
                return false;
            });
    
            cy.get('#bb-menu-header-button-2').click()
            cy.contains('Mobile Payments').click()
            cy.contains('Airtime Purchase').click()
            cy.wait(5000)
            cy.contains('Other').click()
            cy.get('input[id="beneficiaryName"]').click();
            cy.get('div[class="bb-stack"]').eq(0).click();
            cy.get('input[id="bb_element_12"]').type(11);
            cy.get('button[class="bb-load-button btn-primary btn btn-md"]').click()
            cy.wait(10000)
            cy.server();
            cy.route('POST', '/api/payment-order-service/client-api/v2/payment-orders').as('route1');
            cy.contains('Submit').click()
            cy.wait(['@route1'], { responseTimeout: 60000 });
            cy.get('span[class="modal-title"]').should('contain','Payment Successful')
        })
    });