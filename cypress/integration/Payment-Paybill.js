import LoginPage from "./PageObject/LoginPage";
import APIs from "./PageObject/APIs";
import Navigation from "./PageObject/Navigation";
import PaymentForm from "./PageObject/PaymentForm";

describe("Paybill Payments ", function () {
  beforeEach(function () {
    cy.fixture("Login").then((Login) => {
      this.Login = Login;
    });
    cy.fixture("url").then((url) => {
      this.url = url;
    });
  });
  it("Paybill Payments should be successful", function () {
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
    navigation.MobilePayments();
    navigation.Paybill();
    cy.wait(5000);
    paymentForm.AccountSelector();
    paymentForm.SelectBeneficiary();
    paymentForm.PaybillAmount();
    cy.server();
    API.MpesaOrganizationQuery();
    paymentForm.KRANextButton();
    cy.wait(["@MpesaQuery"], { responseTimeout: 100000 });
    //cy.wait(15000)
    cy.server();
    API.PaymentOrder();
    paymentForm.SubmitPayment;
    cy.wait(["@route1"], { responseTimeout: 200000 });
    paymentForm.AssertSuccess();
  });
});
