import { validateNameLength, validatePasswordLength } from './length';

describe('Field length validation', () => {
  describe('Name field', () => {
    let name = '';

    test('a name should fail length validation if its not set', () => {/* проверка на пустую строку */
      expect(validateNameLength(name)).toEqual(false);
    });

    test('a name should fail length validation if its less than 2 characters', () => {/* проверка на меньше 2 символов */
      name = 'a'
      expect(validateNameLength(name)).toEqual(false);
    });

    test('a name should fail length validation if its 2 characters', () => {/* проверка на меньше 2 символов */
      name = 'ad'
      expect(validateNameLength(name)).toEqual(true);
    });

    test('a name should fail length validation if its more than 2 characters', () => {/* проверка на меньше 2 символов */
      name = 'adi'
      expect(validateNameLength(name)).toEqual(true);
    });
  })

  describe('Password field', () => {
    let password = '';

    test('a password should fail validation if its not set', () => {/* проверка на пустой пароль */
      expect(validatePasswordLength(password)).toEqual(false);
    });

    test('a password should fail validation if its less than 2 characters', () => {/* проверка на меньше 2 символов */
      password = 'a'
      expect(validatePasswordLength(password)).toEqual(false);
    });

    test('a password should fail validation if its more than 20 characters', () => {/* проверка больше 20 символов */
      password = 'aaaaaaaaaaaaaaaaaaaaaaaa'
      expect(validatePasswordLength(password)).toEqual(false);
    });

    test('a password should pass length validation if its 6-20 characters', () => {/* проверка на больше 6 или меньше 20  символов */
      password = 'password'
      expect(validatePasswordLength(password)).toEqual(true);
    });
  })

});
