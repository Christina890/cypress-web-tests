import LoginPage from "./PageObject/LoginPage";
import APIs from "./PageObject/APIs";
import Navigation from "./PageObject/Navigation";
import PaymentForm from "./PageObject/PaymentForm";
describe("Send Money to phone payment", function () {
  beforeEach(function () {
    cy.fixture("Login").then((Login) => {
      this.Login = Login;
    });
    cy.fixture("url").then((url) => {
      this.url = url;
    });
  });

  it("Payment should be successful", function () {
    const navigation = new Navigation();
    const API = new APIs();
    const paymentForm = new PaymentForm();
    const login = new LoginPage();
    Cypress.on("uncaught:exception", (err, runnable) => {
      return false;
    });

    login.navigate();
    login.enterUsername(this.Login.userName);
    login.enterPassword(this.Login.password);
    login.submit();
    navigation.selectSA();
    navigation.PaymentMenu();
    navigation.MobilePayments();
    navigation.SendMoney();
    paymentForm.AccountSelector();
    paymentForm.SelectBeneficiary();
    paymentForm.PaybillAmount();
    paymentForm.NextButton();
    cy.server();
    API.PaymentOrder();
    paymentForm.SubmitPayment();
    cy.wait(["@route1"], { responseTimeout: 200000 });
    paymentForm.AssertSuccess();
  });
});
