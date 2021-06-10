describe('International Payments',function(){

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
        it('International Transfers should be successful ',function(){
            Cypress.on('uncaught:exception', (err, runnable) => {
                return false;
            });
    
            cy.get('#bb-menu-header-button-2').click()
            cy.contains('International Payment').click()
            cy.get('button[class="dropdown-toggle btn-outline-secondary btn btn-md"]').eq(0).click()
            cy.get('div[class="bb-stack"]').eq(0).click({force: true});
            cy.get('input[id="bb_element_12"]').type(13);
            cy.get('input[id="reference"]').click();
            cy.contains('Insurance').click();
            cy.get('input[id="bb_input_19"]').type('ref12344');
            cy.contains('Next').click()
            cy.wait(15000)
            cy.server();
            cy.route('POST', '/api/payment-order-service/client-api/v2/payment-orders').as('route1');
            cy.contains('Submit').click()
            cy.wait(['@route1'], { responseTimeout: 60000 });
            cy.get('span[class="modal-title"]').should('contain','Payment Successful')
        })
    });