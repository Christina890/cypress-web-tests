//https://test-dxp.imbank.com/api/omni-integration-service/client-api/v1/standing-order-summary-query?size=1000&custId=0174891&from=0

describe("SI list ", function () {
  beforeEach(function () {
    cy.fixture("Login").then((Login) => {
      this.Login = Login;
    });
    cy.fixture("url").then((url) => {
      this.url = url;
    });
  });

  it("SI List should be fetched successfully", function () {
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
    cy.contains("Additional Services", { timeout: 30000 }).click();
    cy.server();
    cy.route(
      "GET",
      "/api/omni-integration-service/client-api/v1/standing-order-summary-query?size=1000&custId=******&from=0"
    ).as("SI");
    cy.contains("Standing Orders").click();
    cy.wait("@SI", { responseTimeout: 100000 }).its("status").should("eq", 200);
  });
});
