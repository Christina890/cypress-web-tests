class PageNavigation {
  selectSA() {
    cy.contains("Individual accounts", { timeout: 100000 }).click();
  }
  selectAccount() {
    cy.get('div[class="mb-3 mt-0 py-1  bb-product-kind"]', { timeout: 100000 })
      .eq(0)
      .click();
  }
  additionalServices() {
    cy.contains("Additional Services", { timeout: 100000 }).click();
  }
  beneficiarymanager() {
    cy.contains("Beneficiary Manager").click({ force: true });
  }
  PaymentMenu() {
    cy.get("#bb-menu-header-button-2", { timeout: 60000 }).click();
  }
  MobilePayments() {
    cy.contains("Mobile Payments").click();
  }
  AirtimePayment() {
    cy.contains("Airtime Purchase").click();
  }
  SendMoney() {
    cy.contains("Send Money to Mobile").click();
  }
  BillPayments() {
    cy.contains("Bill Payments").click();
  }
  KRAPayments() {
    cy.contains("KRA Payment").click();
  }
  UtilityPayments() {
    cy.contains("Utility Payment").click();
  }
  InternationalPayments() {
    cy.contains("International Payment").click();
  }
  BuyGoods() {
    cy.contains("Buy Goods").click();
  }
  Paybill() {
    cy.contains("M-PESA Paybill").click();
  }
  BankPayments() {
    cy.get("#bb-menu-header-button-2").click();
  }
  LocalPayments() {
    cy.contains("Local Payment").click();
  }
}

export default PageNavigation;