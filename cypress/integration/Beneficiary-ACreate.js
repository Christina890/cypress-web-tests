import LoginPage from "./PageObject/LoginPage";
import APIs from "./PageObject/APIs";
import Navigation from "./PageObject/Navigation";
import BeneficiaryPage from "./PageObject/BeneficiaryPage";
import RandomDataGenerator from "./PageObject/RandomDataGenerator";

describe("Create a new beneficiary", function () {
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
    const navigation = new Navigation();
    const api = new APIs();
    const beneficiary = new BeneficiaryPage();
    const RandomData = new RandomDataGenerator();
    var benName = RandomData.BeneficiaryName();
    var accName = RandomData.AccountName();
    var accNumber = RandomData.AccountNumber();

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
    beneficiary.CreateNewButton();
    beneficiary.TransferType();
    beneficiary.SpecificType();
    beneficiary.BeneficiaryName(benName);
    beneficiary.SelectBank();
    beneficiary.AccountName(accName);
    beneficiary.AccountNumber(accNumber);
    beneficiary.SaveBeneficiary();
    cy.get('div[class="bb-notification__body"]').should(
      "contain",
      "New beneficiary has been saved successfully"
    );
  });
});
