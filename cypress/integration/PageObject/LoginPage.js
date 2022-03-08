class LoginPage {
  navigate() {
    cy.visit("/");
  }
  enterUsername(username) {
    cy.get('input[id="username"]', { timeout: 10000 }).type(username);
    return this;
  }

  enterPassword(password) {
    cy.get('input[id="password"]').type(password);
    return this;
  }

  submit() {
    cy.get('button[id="kc-submit"]').click();
    return this;
  }
}

export default LoginPage;
