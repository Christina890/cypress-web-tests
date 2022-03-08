import LoginPage from "./PageObject/LoginPage";
import APIs from "./PageObject/APIs";
import Navigation from "./PageObject/Navigation";
import BeneficiaryPage from "./PageObject/BeneficiaryPage";
import RandomDataGenerator from "./PageObject/RandomDataGenerator";

describe("Delete a beneficiary", function () {
  beforeEach(function () {
    cy.fixture("Login").then((Login) => {
      this.Login = Login;
    });
    cy.fixture("url").then((url) => {
      this.url = url;
    });
  });
  it("Beneficiary should be deleted successfully", function () {
    const login = new LoginPage();
    const navigation = new Navigation();
    const beneficiary = new BeneficiaryPage();
    Cypress.on("uncaught:exception", (err, runnable) => {
      return false;
    });
    login.navigate();
    login.enterUsername(this.Login.userName);
    login.enterPassword(this.Login.password);
    login.submit();
    navigation.selectSA();
    navigation.additionalServices();
    navigation.beneficiarymanager();
    beneficiary.DeleteBeneficiary();
    cy.get('div[class="bb-notification__body"]').should(
      "contain",
      "Beneficiary has been deleted successfully"
    );
  });
});
