import LoginPage from "./PageObject/LoginPage";
import APIs from "./PageObject/APIs";
import Navigation from "./PageObject/Navigation";
import BeneficiaryPage from "./PageObject/BeneficiaryPage";
import RandomDataGenerator from "./PageObject/RandomDataGenerator";

describe("Edit Beneficiary", function () {
  beforeEach(function () {
    cy.fixture("Login").then((Login) => {
      this.Login = Login;
    });
    cy.fixture("url").then((url) => {
      this.url = url;
    });
  });
  it("Beneficiary should be edited successfully", function () {
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
    beneficiary.editBeneficiary();
    beneficiary.SaveBeneficiary();
    cy.get('div[class="bb-notification__body"]').should(
      "contain",
      "Beneficiary has been updated successfully"
    );
  });
});
