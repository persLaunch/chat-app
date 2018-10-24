
const s_auth = require('./s_auth');


const loginTokenFunction = jest.fn();

beforeEach(() => {
    
    loginTokenFunction.mockClear();
});

afterEach(() => {
   
    // The second arg of the first call to the function was 'session' turn to false
    expect(loginTokenFunction.mock.calls[0][1]).toEqual({ session: false });
    expect(loginTokenFunction).toHaveBeenCalledTimes(1);
});

describe('[S_AUTH] ', () => {

    describe('Function generateTokenAuth', () => {
      
        describe('Case 1: Valid email && password', () => {

            const email = 'personal.launch2@gmail.com';
            const password = 'pass';

            it('should call loginTokenFunction once', () => {

                s_auth.generateTokenAuth(loginTokenFunction, email, password);
                
            });

        });

           
        describe('Case 2: At least one null param', () => {

            const email = null;
            const password = 'pass';

            it('should call throw an error', () => {

                expect(s_auth.generateTokenAuth(loginTokenFunction, email, password))
                    .rejects
                    .toThrow('data and hash must be strings');
            });
        });

         
        describe('Case 3: email non valid', () => {

            const email = 'lmazamlfjazazjazjazlfjazlfjazfj';
            const password = 'pass';

            it('should call throw an error', () => {

                expect(s_auth.generateTokenAuth(loginTokenFunction, email, password))
                    .rejects
                    .toThrow('Invalid Credentials');

            });
        });
    });

  
});
