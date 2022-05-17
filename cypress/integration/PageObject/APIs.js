class API {
  ProductSummary() {
    cy.route(
      "GET",
      "xxxxxxxxx"
    ).as("Products");
  }
  TransactionListing() {
    cy.route(
      "GET",
      "xxxxxxxxx"
    ).as("Transactions");
  }
  PaymentOrder() {
    cy.route(
      "POST",
      "xxxxxxxxx"
    ).as("route1");
  }
  MpesaOrganizationQuery() {
    cy.route(
      "POST",
      "xxxxxxxxx"
    ).as("MpesaQuery");
  }
  Eslip() {
    cy.route(
      "GET",
      "xxxxxxxxx"
    ).as("eslip");
  }
  BulkApproval() {
    cy.route(
      "POST",
      "xxxxxxxxx"
    ).as("BulkApproval");
  }
  CardSummary() {
    cy.route(
      "GET",
      "xxxxxxxxx"
    ).as("CardSummary");
  }
}

export default API;
