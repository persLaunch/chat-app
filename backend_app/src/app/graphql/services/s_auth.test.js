
const s_auth = require('./s_auth');

test('Test function register', () => {

    const userId = '1';
    const email = 'toto@gmail.com';
    const password = 'pass';
    const req = ;

  expect(s_auth.register({ userId, email, password, req }) ).toBe(3);
});

