import LoginPage from "./PageObject/LoginPage";
import APIs from "./PageObject/APIs";
import Navigation from "./PageObject/Navigation";
import PaymentForm from "./PageObject/PaymentForm";

describe("Utility Payments", function () {
  beforeEach(function () {
    cy.fixture("Login").then((Login) => {
      this.Login = Login;
    });
    cy.fixture("url").then((url) => {
      this.url = url;
    });
  });
  it("KPLC Prepaid payments should be successful", function () {
    const login = new LoginPage();
    const navigation = new Navigation();
    const API = new APIs();
    const paymentForm = new PaymentForm();
    Cypress.on("uncaught:exception", (err, runnable) => {
      return false;
    });
    cy.visit("/");
    login.navigate();
    login.enterUsername(this.Login.userName);
    login.enterPassword(this.Login.password);
    login.submit();
    navigation.selectSA();
    navigation.PaymentMenu();
    navigation.BillPayments();
    navigation.UtilityPayments();
    paymentForm.AccountSelector({ force: true });
    paymentForm.SelectBeneficiary({ force: true });
    paymentForm.Validate();
    paymentForm.PaybillAmount();
    paymentForm.KRANextButton();
    cy.server();
    API.PaymentOrder();
    paymentForm.SubmitPayment();
    cy.wait(["@route1"], { responseTimeout: 200000 });
    paymentForm.AssertSuccess();
  });
});
