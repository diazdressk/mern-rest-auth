/* МОЙ ПЕРВЫЙ ТЕСТ В РЕАКТЕ!!!!!!!!! */
/* МОДУЛЬЫНЕ ТЕСТЫ */
/* npm test запускаю тесты */
import { validateEmail } from './email';

describe(/* название теста */ 'Email validation', () => {
  let email = '';

  test('an empty input should not be valid', () => {/* проверка на пустой емейл */
    expect(validateEmail(email)).toEqual(false);
  });

  test('its should have an @ symbol', () => {/* проверка на наличие @ */
    email = 'adi@gmail.com'
    expect(email.includes('@')).toEqual(true);
  });

  test('its should have an . symbol', () => {/* проверка на наличие точку */
    expect(email.includes('.')).toEqual(true);
  });

  test('a valid email should pass validation', () => {/* проверка на правильный емейл */
    expect(validateEmail(email)).toEqual(true);
  });

  test('an invalid email should not pass validation', () => {/* проверка на неправильный емейл */
    email = 'adi@gmail'
    expect(validateEmail(email)).toEqual(false);
  });
});
