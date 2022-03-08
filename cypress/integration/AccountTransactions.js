import LoginPage from "./PageObject/LoginPage";
import API from "./PageObject/APIs";
import Navigation from "./PageObject/Navigation";

describe("Get Recent Transactions", function () {
  beforeEach(function () {
    cy.fixture("Login").then((Login) => {
      this.Login = Login;
    });
    cy.fixture("url").then((url) => {
      this.url = url;
    });
  });
  it("Recent Transactions should be fetched successfully", function () {
    const login = new LoginPage();
    const navigation = new Navigation();
    const api = new API();
    Cypress.on("uncaught:exception", (err, runnable) => {
      return false;
    });
    cy.server();
    api.TransactionListing();
    login.navigate();
    login.enterUsername(this.Login.userName);
    login.enterPassword(this.Login.password);
    login.submit();
    navigation.selectSA();
    navigation.selectAccount();
    cy.contains("00101748915010").click();
    cy.wait("@Transactions", { timeout: 100000 })
      .its("status")
      .should("eq", 200);
  });
});
