describe("Pesalink to Phone", function () {
  beforeEach(function () {
    cy.fixture("Login").then((Login) => {
      this.Login = Login;
    });
    cy.fixture("url").then((url) => {
      this.url = url;
    });
  });

  it("Pesalink to Phone Payments should successful", function () {
    Cypress.on("uncaught:exception", (err, runnable) => {
      return false;
    });
    cy.visit("/");
    cy.get('input[id="username"]', { timeout: 10000 }).type(
      this.Login.userName
    );
    cy.get('input[id="password"]').type(this.Login.password);
    cy.get('button[id="kc-submit"]').click();
    cy.get('div[class="agreement__item"]', { timeout: 100000 }).eq(2).click();

    cy.get("#bb-menu-header-button-2", { timeout: 60000 }).click();
    cy.contains("PesaLink to Phone").click();
    cy.get('input[id="beneficiaryName"]').click();
    cy.wait(5000);
    cy.get('div[class="bb-product-selector__item-content"]').click();
    cy.contains("00101748911250", { timeout: 60000 }).click();
    cy.get(
      'button[class="bb-grouped-list__item bb-list__item--no-separator dropdown-item"]'
    )
      .eq(1)
      .click({ force: true });
    cy.get('button[class="bb-load-button btn-primary btn btn-md"]')
      .eq(0)
      .click();
    cy.get('input[id="bankName"]').click();
    cy.wait(10000);
    cy.get(
      'div[class="dropdown-menu pre-scrollable bb-grouped-list bb-grouped-list--density-md col-md-12 show"]'
    )
      .eq(0)
      .click();
    cy.get('input[id="bb_element_13"]').type(18);
    cy.get('input[id="reference"]').click();
    cy.contains("Insurance").click();
    cy.get('button[class="bb-load-button btn-primary btn btn-md"]')
      .eq(1)
      .click();
    cy.server();
    cy.route(
      "POST",
      "/api/payment-order-service/client-api/v2/payment-orders"
    ).as("route1");
    cy.contains("Submit", { timeout: 60000 }).click();
    cy.wait(["@route1"], { responseTimeout: 60000 }).then((xhr) => {
      cy.log(JSON.stringify(xhr.response.body));
    });
    cy.get('span[class="modal-title"]').should("contain", "Payment Successful");
  });
});
