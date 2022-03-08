class BeneficiaryPage {
  CreateNewButton() {
    cy.contains("Create New", { timeout: 20000 }).click();
  }
  TransferType() {
    cy.contains("Select a transfer type").click();
  }
  SpecificType() {
    cy.contains("Local Payment").click();
  }
  BeneficiaryName(benName) {
    cy.get('input[id="beneficiaryName"]').type(benName);
  }
  SelectBank() {
    cy.get('input[id="bankName"]').click();
    cy.contains("Credit Bank", { timeout: 20000 }).click();
  }
  AccountName(accName) {
    cy.get('input[id="account-name"]').type(accName);
  }
  AccountNumber(accNumber) {
    cy.get('input[id="account-number"]').type(accNumber);
  }
  SaveBeneficiary() {
    cy.contains("Save").click();
  }
  editBeneficiary() {
    cy.contains("Automation", { timeout: 100000 }).click();
    cy.wait(2000);
    cy.contains("Edit Beneficiary").click();
    const benName = `Automation NameEdit`;
    cy.get('input[id="beneficiaryName"]').click().clear().type(benName);
    const accName = `Account NameEdit`;
    cy.get('input[id="account-name"]').clear().type(accName);
  }
  DeleteBeneficiary() {
    cy.contains("Automation", { timeout: 100000 }).click();
    cy.contains("Delete Beneficiary").click();
    cy.get('button[aria-label="Delete Beneficiary"').click();
  }
}
export default BeneficiaryPage;
