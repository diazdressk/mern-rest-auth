/* НИХЕРА НЕ ПОНЯТНО,НО ЖЕСТОКО ИНТЕРЕСНО!!!ЕБУЧИЕ ТЕСТЫ,НЕНАВИЖУ ТЕСТЫ!!!БЛЯТЬ */
import { reducer, screen } from '../../../shared/utils/test-utils';

import SigninFormComponent from './SigninForm.component';

describe('Sign-In Form', () => {
  let signInButton = null;
  beforeEach(() => {
    reducer(<SigninFormComponent />);
    signInButton = screen.getByRole('button', {
      name: /sign-in/i,
    }); /* проверяю есть ли кнопка,которая называется sign-in(не смотря на регистр)*/
  });
  test('The login button should be in the document', () => {
    expect(signInButton).toBeInTheDocument();
  });
  test('The login button should initaly be disabled', () => {
    expect(signInButton).toBeDisabled();
  });
});
