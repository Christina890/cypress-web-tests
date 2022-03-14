class API {
  ProductSummary() {
    cy.route(
      "GET",
      "/api/product-summary-presentation-service/client-api/v2/productsummary"
    ).as("Products");
  }
  TransactionListing() {
    cy.route(
      "GET",
      "https://uat-dxp.imbank.com/api/transaction-presentation-service/client-api/v2/transactions?arrangementId=8a808b3079f5f9b2017a61a1f48d010c"
    ).as("Transactions");
  }
  PaymentOrder() {
    cy.route(
      "POST",
      "/api/payment-order-service/client-api/v2/payment-orders"
    ).as("route1");
  }
  MpesaOrganizationQuery() {
    cy.route(
      "POST",
      "/api/omni-integration-service/client-api/v1/mpesa-organization-query"
    ).as("MpesaQuery");
  }
  Eslip() {
    cy.route(
      "GET",
      "api/omni-integration-service/client-api/v1/eslip-query?referenceNumber=2020200000003156"
    ).as("eslip");
  }
  BulkApproval() {
    cy.route(
      "POST",
      "api/payment-order-service/client-api/v2/payment-orders/bulk-approvals"
    ).as("BulkApproval");
  }
}

export default API;
