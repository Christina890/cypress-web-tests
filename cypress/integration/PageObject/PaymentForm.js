class PaymentForm {
  AccountSelector() {
    cy.get('div[class="bb-product-selector__dropdown dropdown"]')
      .trigger("mouseover")
      .click();
    cy.contains("00101748911250", { timeout: 60000 }).click();
  }
  SelectUtility() {
    cy.get(
      'button[class="bb-product-selector__item dropdown-toggle btn-unstyled btn btn-md"]'
    ).click({ force: true });
    cy.wait(2000);
    cy.contains("00101748911250").click();
  }
  AirtimeOther() {
    cy.contains("Other").click();
  }
  SelectBeneficiary() {
    cy.get('input[id="beneficiaryName"]').click();
    cy.get(
      'button[class="bb-grouped-list__item bb-list__item--no-separator dropdown-item"]'
    )
      .eq(0)
      .click();
  }
  Approve() {
    cy.get('bb-icon-ui[class="pl-3 pr-3 pb-0"]').eq(0).click();
  }
  ConfirmApproval() {
    cy.contains("Approve").click();
  }
  Decline() {
    cy.get('bb-icon-ui[class="pl-3 pr-3 pb-0"]').eq(1).click();
  }
  PesalinkBeneficiary() {
    cy.get('input[id="beneficiaryName"]').click();
    cy.get(
      'button[class="bb-grouped-list__item bb-list__item--no-separator dropdown-item"]'
    )
      .eq(1)
      .click();
  }
  InternationalBeneficiary() {
    cy.get('div[class="bb-search-box__append-content input-group-append"]', {
      timeout: 10000,
    })
      .eq(0)
      .click();
    cy.get(
      'button[class="bb-grouped-list__item bb-list__item--no-separator dropdown-item"'
    )
      .eq(0)
      .click();
  }
  PaymentAmountAirtime() {
    cy.get('input[id="bb_element_12"]').type(11);
  }
  BuyGoodsAmount() {
    cy.get('input[id="bb_element_12"]').type(12);
  }

  PaybillAmount() {
    cy.get('input[id="bb_element_12"]').type(14);
  }
  PesalinkAmount() {
    cy.get('input[id="bb_element_12"]').type(18);
  }
  RTGSAmount() {
    cy.get('select[id="bb_element_8"]').select("3: USD");
    cy.get('input[id="bb_element_12"]').type(17);
  }
  WithinAmount() {
    cy.get('input[id="bb_element_12"]').type(16);
  }
  PaymentReason() {
    cy.get('input[id="reference"]').click();
    cy.contains("Insurance").click();
  }
  EnterEslip() {
    cy.get('div[class="d-flex justify-content-between mx-0"]').type(
      2020210002868651
    );
  }
  Validate() {
    cy.get('button[class="bb-load-button btn-primary btn btn-md"]')
      .eq(1)
      .click();
  }
  KRANextButton() {
    cy.get('button[class="bb-load-button btn-primary btn btn-md"]')
      .eq(1)
      .click();
  }
  NextButton() {
    cy.get('button[class="bb-load-button btn-primary btn btn-md"]').click();
  }
  SubmitPayment() {
    cy.contains("Submit", { timeout: 60000 }).click();
  }
  PaymentResponse() {
    cy.wait(["@route1"], { responseTimeout: 60000 }).then((xhr) => {
      cy.log(JSON.stringify(xhr.response.body));
    });
  }
  EnterPaymentReference() {
    cy.get('input[placeholder="Enter a payment reference"]').type("ref12344");
  }
  AssertSuccess() {
    cy.get('span[class="modal-title"]').should("contain", "Payment Successful");
  }
  AssertSubmission() {
    cy.get('span[class="modal-title"]').should("contain", "Payment Submitted");
  }
}
export default PaymentForm;
