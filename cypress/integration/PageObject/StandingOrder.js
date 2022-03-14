class StandingOrder {
  SIAmount() {
    cy.get('input[id="bb_element_15"]').type(33000);
  }
  SelectFequencyDaily() {
    cy.get(
      'button[class="bb-input-datepicker__calendar-opener-button btn-link btn btn-md"'
    ).click();
    cy.get('div[class="ngb-dp-day ngb-dp-today"]').click();
    cy.get('select[id="bb_input_11"]').select("Daily");
  }
  SelectEndDateNever() {
    cy.get('label[class="bb-input-radio-group__radio btn"]').eq(0).click();
  }
  AssertSuccess() {
    cy.get('span[class="modal-title"]').should(
      "contain",
      "Standing Order Successful"
    );
  }
}
export default StandingOrder;
