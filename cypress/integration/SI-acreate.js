describe("Create an SI", function () {
  beforeEach(function () {
    cy.fixture("Login").then((Login) => {
      this.Login = Login;
    });
    cy.fixture("url").then((url) => {
      this.url = url;
    });
  });

  it("SI should be created successfully", function () {
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
    cy.contains("Create New", { timeout: 60000 }).click();
    cy.contains("Mobile Payments").click();
    cy.contains("Send Money to Mobile").click();
    cy.wait(5000);
    cy.get('div[class="bb-product-selector__item-content"]').click();
    cy.contains("KES").click();
    cy.get(
      'button[class="dropdown-toggle btn-outline-secondary btn btn-md"]'
    ).click();
    cy.get(
      'button[class="bb-grouped-list__item bb-list__item--no-separator dropdown-item"]'
    )
      .eq(0)
      .click();
    cy.get('input[id="bb_element_15"]').type(33000);
    cy.get(
      'button[class="bb-input-datepicker__calendar-opener-button btn-link btn btn-md"'
    ).click();
    cy.get('div[class="ngb-dp-day ngb-dp-today"]').click();
    cy.get('select[id="bb_input_11"]').select("Daily");
    //cy.contains('Daily').click({force: true});
    cy.get('label[class="bb-input-radio-group__radio btn"]').eq(0).click();
    cy.contains("Next").click();
    cy.server();
    cy.route(
      "POST",
      "/api/payment-order-service/client-api/v2/payment-orders"
    ).as("route1");
    cy.contains("Submit", { timeout: 60000 }).click();
    cy.wait(["@route1"], { responseTimeout: 200000 });
    cy.get('span[class="modal-title"]').should(
      "contain",
      "Standing Order Successful"
    );
  });
});
