class RandomDataGenerator {
  BeneficiaryName() {
    const uuid = () => Cypress._.random(0, 1e6);
    const id = uuid();
    const name = `Automation${id}`;
    return name;
  }
  AccountName() {
    const uuid = () => Cypress._.random(0, 1e6);
    const id = uuid();
    const accName = `Account Name${id}`;
    return accName;
  }
  AccountNumber() {
    const uuid = () => Cypress._.random(0, 1e6);
    const id = uuid();
    const accNumber = uuid();
    return accNumber;
  }
}
export default RandomDataGenerator;
