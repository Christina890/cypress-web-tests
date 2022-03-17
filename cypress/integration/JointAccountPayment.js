import LoginPage from "./PageObject/LoginPage";
import APIs from "./PageObject/APIs";
import Navigation from "./PageObject/Navigation";
import PaymentForm from "./PageObject/PaymentForm";

describe("Joint Account Payments", function () {
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
  it("Payment initiation should be successful", function () {
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
    navigation.selectJointSA();
    navigation.PaymentMenu();
    navigation.BankPayments();
    navigation.LocalPayments();
    cy.wait(5000);
    paymentForm.PesalinkBeneficiary();
    paymentForm.PesalinkAmount();
    paymentForm.PaymentReason();
    paymentForm.NextButton();
    cy.server();
    API.PaymentOrder();
    paymentForm.SubmitPayment();
    paymentForm.PaymentResponse();
    paymentForm.AssertSubmission();
  });
  it("Payment approval should be successful", function () {
    const login = new LoginPage();
    const navigation = new Navigation();
    const API = new APIs();
    const paymentForm = new PaymentForm();
    Cypress.on("uncaught:exception", (err, runnable) => {
      return false;
    });
    login.navigate();
    login.enterUsername(this.Login.ApproverUsername);
    login.enterPassword(this.Login.password);
    login.submit();
    navigation.selectApproverSA();
    cy.server();
    API.ProductSummary();
    navigation.ApprovalQueue();
    cy.wait("@Products", { timeout: 1000000 });
    cy.wait(1000);
    paymentForm.Approve();
    cy.server();
    API.BulkApproval();
    paymentForm.ConfirmApproval();
    cy.get('div[class="bb-notification__body"]').should(
      "contain",
      "Payment Approved Successfully"
    );
  });
});
