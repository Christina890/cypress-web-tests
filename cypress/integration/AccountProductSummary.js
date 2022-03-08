import LoginPage from "./PageObject/LoginPage";
import API from "./PageObject/APIs";
import Navigation from "./PageObject/Navigation";
describe("Get Product Summary", function () {
  beforeEach(function () {
    cy.fixture("Login").then((Login) => {
      this.Login = Login;
    });
    cy.fixture("url").then((url) => {
      this.url = url;
    });
  });
  it("Customer Products should be fetched successfully", function () {
    const login = new LoginPage();
    const navigation = new Navigation();
    const api = new API();
    Cypress.on("uncaught:exception", (err, runnable) => {
      return false;
    });
    login.navigate();
    cy.server();
    api.ProductSummary();
    login.enterUsername(this.Login.userName);
    login.enterPassword(this.Login.password);
    login.submit();
    navigation.selectSA();
    cy.wait("@Products", { timeout: 100000 }).its("status").should("eq", 200);
  });
});
