import LoginPage from "./PageObject/LoginPage";
import APIs from "./PageObject/APIs";
import Navigation from "./PageObject/Navigation";
import PaymentForm from "./PageObject/PaymentForm";

describe("KRA PAYMENTS", function () {
  beforeEach(function () {
    cy.fixture("Login").then((Login) => {
      this.Login = Login;
    });
    cy.fixture("url").then((url) => {
      this.url = url;
    });
  });
  it("KRA payments should be successful", function () {
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
    navigation.BillPayments();
    navigation.KRAPayments();
    paymentForm.AccountSelector();
    paymentForm.EnterEslip();
    cy.server();
    API.Eslip();
    paymentForm.Validate();
    cy.wait(["@eslip"], { responseTimeout: 100000 });
    paymentForm.KRANextButton();
    cy.server();
    API.PaymentOrder();
    paymentForm.SubmitPayment();
    paymentForm.PaymentResponse();
    paymentForm.AssertSuccess();
  });
});
