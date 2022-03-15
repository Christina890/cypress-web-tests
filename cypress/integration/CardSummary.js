import LoginPage from "./PageObject/LoginPage";
import API from "./PageObject/APIs";
import Navigation from "./PageObject/Navigation";
describe("Get Card Summary", function () {
  beforeEach(function () {
    cy.fixture("Login").then((Login) => {
      this.Login = Login;
    });
    cy.fixture("url").then((url) => {
      this.url = url;
    });
  });
  it("Customer Cards should be fetched successfully", function () {
    const login = new LoginPage();
    const navigation = new Navigation();
    const api = new API();
    Cypress.on("uncaught:exception", (err, runnable) => {
      return false;
    });
    login.navigate();
    cy.server();
    api.CardSummary();
    login.enterUsername(this.Login.userName);
    login.enterPassword(this.Login.password);
    login.submit();
    navigation.selectSA();
    navigation.AccountsOverview();
    navigation.CardsMenu();
    cy.wait("@CardSummary", { timeout: 100000 })
      .its("status")
      .should("eq", 200);
  });
});
