import LoginPage from "./PageObject/LoginPage";
import PageNavigation from "./PageObject/Navigation";
describe("Login", function () {
  beforeEach(function () {
    cy.fixture("Login").then((Login) => {
      this.Login = Login;
    });
    cy.fixture("url").then((url) => {
      this.url = url;
    });
  });
  it("User should be logged in successfully", function () {
    const login = new LoginPage();
    const navigation = new PageNavigation();
    Cypress.on("uncaught:exception", (err, runnable) => {
      return false;
    });
    login.navigate();
    login.enterUsername(this.Login.userName);
    login.enterPassword(this.Login.password);
    login.submit();
    navigation.selectSA();
    cy.get('h3[aria-level="3"]', { timeout: 60000 }).should(
      "contain",
      this.Login.name
    );
  });
});
