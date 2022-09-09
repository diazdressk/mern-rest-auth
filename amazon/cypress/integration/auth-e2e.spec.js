/* E2E ИНТЕГРАЦИОННЫЙ ТЕСТ...они больше, тестируются всё вместе, не по отдельности,как модульные */

/* захожу в приложение
меня сразу должно перенаправить на сайнИн паге
*/
describe('Auth (e2e)', () => {
  /* должен перенаправлять в сайнИн */
  it('should load and redirect to /signin', () => {
    cy.visit('http://localhost:3001/');
    cy.url().should('include', 'signin');
  });

  /*там в сторе(настроил в App.tsx, стор добавил в window,оттуда забираю здесь и сравниваю ) должен соответствовать инитиалСтейту их редакса */
  it('should have default initial state', () => {
    const initialAppState = {
      auth: {
        user: null,
        jwt: null,
        isAuthenticated: false,
        isLoading: false,
        isSuccess: false,
        isError: false,
      },
    };

    /* вот тут забираю и сравниваю */
    cy.window().its('store').invoke('getState').should('deep.equal', initialAppState);
  });

  const randomInt = Math.floor(Math.random() * 100000);
  const name = `user-${randomInt}`;
  const email = `user-${randomInt}@gmail.com`;
  const password = `password`;

  it('should navigate to sign-in upon registering', () => {
    /* тут по айдишнику нахожу кнопку регистрации, нажимакю ее, перехожу на пейдж Регистрации,
    там заполняю поля
    */
    cy.get('#register-link').click();
    cy.get('#name').click().type(name);
    cy.get('#email').click().type(email);
    cy.get('#password').click().type(password);
    cy.get('#repassword').click().type(password);
    /* потом нажимаю на кнопку регистрации */
    cy.get('#register-btn').click();
    /* жду 500ms */
    cy.wait(500);
    /* потом проверяю урл,там должно быть sign-in....тобишь он должен перейти на страничку логина */
    cy.url().should('include', 'signin');
  });

  it('Sign-in button should be disabled', () => {
    /* нахожу кнопку по названию или айдишнику...и вот эта кнопка должна быть дисабледена изначально...проверяю это через have.attr */
    cy.contains('#signin-btn', 'Sign-In').should('have.attr', 'disabled');
  });

  /* заполняю поля и кнопка раздисейблится */
  it('Correct details should enable Sign-In button', () => {
    cy.get('#email').click().type(email);
    cy.get('#password').click().type(password);
    cy.contains('#signin-btn', 'Sign-In').should('not.have.attr', 'disabled');
  });

  it('Should navigate to HOme page', () => {
    cy.contains('#signin-btn', 'Sign-In').click();
    cy.wait(500);
    cy.url().should('not.include', 'signin');
    cy.url().should('include', '/');
  });
});
