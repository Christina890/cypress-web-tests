describe("Edit SI", function () {
  beforeEach(function () {
    cy.fixture("Login").then((Login) => {
      this.Login = Login;
    });
    cy.fixture("url").then((url) => {
      this.url = url;
    });
  });

  it("SI should be edited successfully", function () {
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

    cy.contains("Standing Orders").click();
    cy.get("td", { timeout: 10000 }).eq(0).click();
    cy.contains("Edit Standing Order").click();
    cy.get('input[id="reference"]').click();
    cy.contains("Insurance").click();
    cy.wait(5000);
    cy.contains("Next").click();
    cy.get('div[class="bb-notification__body"]', { timeout: 60000 }).should(
      "contain",
      "successfully modified"
    );
  });
});
