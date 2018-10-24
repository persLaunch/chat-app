
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
            const password = '$2a$10$RyVZVJAkXNY4TmxAuHpvGuAIq3MAjozq0GF/cRI3XT9tc2Rf.9Tqe';
        
            const cred = { 
                id: 10,
                userId: 10,
                email,
                password,
                updatedAt: new Date(),
                createdAt: new Date(), 
            };

            it('should call loginTokenFunction once', () => {

                s_auth.generateTokenAuth(loginTokenFunction, cred);
                
            });

        });

           
        describe('Case 2: At least one null param', () => {

            const email = null;
            const password = '$2a$10$RyVZVJAkXNY4TmxAuHpvGuAIq3MAjozq0GF/cRI3XT9tc2Rf.9Tqe';

            const cred = { 
                id: 10,
                userId: 10,
                email,
                password,
                updatedAt: new Date(),
                createdAt: new Date(), 
            };

            it('should call throw an error', () => {

                expect(s_auth.generateTokenAuth(loginTokenFunction, cred))
                    .rejects
                    .toThrow('Illegal arguments: object, number');
            });
        });

         
        describe('Case 3: email non valid', () => {

            const email = 'lmazamlfjazazjazjazlfjazlfjazfj';
            const password = '$2a$10$RyVZVJAkXNY4TmxAuHpvGuAIq3MAjozq0GF/cRI3XT9tc2Rf.9Tqe';

            const cred = { 
                id: 10,
                userId: 10,
                email,
                password,
                updatedAt: new Date(),
                createdAt: new Date(), 
            };

            it('should call throw an error', () => {

                expect(s_auth.generateTokenAuth(loginTokenFunction, cred))
                    .rejects
                    .toThrow('Invalid Credentials');

            });
        });
    });

  
});
