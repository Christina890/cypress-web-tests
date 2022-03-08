describe("Loan Application", function () {
  beforeEach(function () {
    cy.fixture("Login").then((Login) => {
      this.Login = Login;
    });
    cy.fixture("url").then((url) => {
      this.url = url;
    });
  });
  it("User should be able to apply for a loan", function () {
    Cypress.on("uncaught:exception", (err, runnable) => {
      return false;
    });
    cy.visit("/");
    cy.get('input[id="username"]', { timeout: 10000 }).type(
      this.Login.usernameDl
    );
    cy.get('input[id="password"]').type(this.Login.password);
    cy.get('button[id="kc-submit"]').click();
    cy.get('div[class="agreement__item"]', { timeout: 100000 }).eq(1).click();
    cy.wait(1000);
    cy.contains("Additional Services", { timeout: 30000 }).click();
    cy.contains("Loan Management").click();
    cy.contains("Apply for a Loan", { timeout: 100000 }).click({ force: true });
    cy.get('div[class="d-flex flex-column align-items-center text-center"]')
      .eq(0)
      .click();

    cy.server();
    cy.route(
      "POST",
      "/api/omni-integration-service/client-api/v1/digital-lending/init-strategy"
    ).as("init");
    cy.get('input[id="bb_element_16"]').type(60000);
    cy.get('input[id="bb_input_5"]').type(20);
    cy.get('input[id="reference"]').click();
    cy.contains("Home Improvement", { timeout: 100000 }).click();
    cy.contains("Next").click();
    cy.wait(["@init"], { timeout: 100000 }).then((xhr) => {
      cy.log(JSON.stringify(xhr.response.body));
    });
    cy.get('input[id="bb_input_8"]', { timeout: 20000 }).type(254711111111);
    cy.get('input[id="bb_input_9"]').type("example@gmail.com");
    cy.get('input[id="bb_input_10"]', { timeout: 20000 }).select("Single");
    cy.contains("Next").click();
  });
});
