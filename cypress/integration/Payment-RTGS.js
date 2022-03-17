import LoginPage from "./PageObject/LoginPage";
import APIs from "./PageObject/APIs";
import Navigation from "./PageObject/Navigation";
import PaymentForm from "./PageObject/PaymentForm";

describe("RTGS Payment", function () {
  beforeEach(function () {
    cy.fixture("Login").then((Login) => {
      this.Login = Login;
    });
    cy.fixture("url").then((url) => {
      this.url = url;
    });
    cy.fixture("Accounts").then((Accounts) => {
      this.Accounts = Accounts;
    });
  });
  it("Pesalink to Account Payments should successful", function () {
    const login = new LoginPage();
    const navigation = new Navigation();
    const API = new APIs();
    const paymentForm = new PaymentForm();
    Cypress.on("uncaught:exception", (err, runnable) => {
      return false;
    });
    login.navigate();
    login.enterUsername(this.Login.userName);
    login.enterPassword(this.Login.password);
    login.submit();
    navigation.selectSA();
    navigation.PaymentMenu();
    navigation.BankPayments();
    navigation.LocalPayments();
    cy.wait(5000);
    paymentForm.AccountSelector();
    paymentForm.PesalinkBeneficiary();
    paymentForm.RTGSAmount();
    paymentForm.PaymentReason();
    paymentForm.NextButton();
    cy.server();
    API.PaymentOrder();
    paymentForm.SubmitPayment();
    cy.wait(["@route1"], { responseTimeout: 200000 });
    paymentForm.PaymentResponse();
    paymentForm.AssertSuccess();
  });
});
