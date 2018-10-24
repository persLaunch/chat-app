
const s_user = require('./s_user');

beforeEach(() => {
    
});

afterEach(() => {
   
});

describe('[S_USER] ', () => {

    describe('Function createUser', () => {
      
        describe('Case 1: Valid user', () => {

            const email = 'personal.launch2@gmail.com';
            const firstName = 'toto';
            const lastName = 'titi';
            const username = 'Zidane';
         
            it('should call  once', () => {

                s_user.createUser({ email, firstName, lastName, username });
                
            });

        });

    });

  
});
