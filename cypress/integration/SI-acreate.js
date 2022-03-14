import LoginPage from "./PageObject/LoginPage";
import APIs from "./PageObject/APIs";
import Navigation from "./PageObject/Navigation";
import PaymentForm from "./PageObject/PaymentForm";
import BeneficiaryPage from "./PageObject/BeneficiaryPage";
import StandingOrder from "./PageObject/StandingOrder";

describe("Create an SI", function () {
  beforeEach(function () {
    cy.fixture("Login").then((Login) => {
      this.Login = Login;
    });
    cy.fixture("url").then((url) => {
      this.url = url;
    });
  });

  it("SI should be created successfully", function () {
    const login = new LoginPage();
    const navigation = new Navigation();
    const API = new APIs();
    const paymentForm = new PaymentForm();
    const beneficiary = new BeneficiaryPage();
    const SI = new StandingOrder();
    Cypress.on("uncaught:exception", (err, runnable) => {
      return false;
    });
    login.navigate();
    login.enterUsername(this.Login.userName);
    login.enterPassword(this.Login.password);
    login.submit();
    navigation.selectSA();
    navigation.additionalServices();
    navigation.StandingOrder();
    beneficiary.CreateNewButton();
    navigation.MobilePayments();
    navigation.MobilePayments();
    navigation.SendMoney();
    cy.wait(5000);
    paymentForm.AccountSelector();
    paymentForm.SelectBeneficiary();
    SI.SIAmount();
    SI.SelectFequencyDaily();
    SI.SelectEndDateNever();
    paymentForm.NextButton();
    cy.server();
    API.PaymentOrder();
    paymentForm.SubmitPayment();
    cy.wait(["@route1"], { responseTimeout: 200000 });
    SI.AssertSuccess();
  });
});
