
const m_passport = require('./m_passport');
const mo_bcrypt = require('..//modules/mo_bcrypt');

describe('[M_PASSPORT] ', () => {

    describe('Function comparePassword', () => {
      

        describe('Case 0: at least one Null argument', () => {
      
            const password = null;
            const hashpassword = 3;
    
            it('should throw an error', async () => {
                expect(m_passport.comparePassword(password, hashpassword))
                    .rejects
                    .toEqual(new Error('Illegal arguments: object, number'));
            
            });
        });

        describe('Case 1: password = hashpassword', () => {
      
            const password = 'aze';
            const hashpassword = password;
    
            it('should throw invalid credentials', () => {
    
                expect(m_passport.comparePassword(password, hashpassword))
                    .rejects
                    .toThrow('Invalid Credentials');
        
            });
        });

        describe('Case 1: password = hashpassword', async () => {
      
            const password = 'aze';
            const hashpassword = await mo_bcrypt.cryptPassword(password);
    
            it('should call be true', () => {
    
                expect(m_passport.comparePassword(password, hashpassword))
                    .resolves
                    .toEqual(true);
          
            });
        });
  
        describe('Case 2: Not valid password', async () => {
      
            const password = 'aze';
            const hashpassword = await mo_bcrypt.cryptPassword('azfazfaz');
    
            it('should call be true', () => {
    
                expect(m_passport.comparePassword(password, hashpassword))
                    .resolves
                    .toEqual(new Error('Invalid Credentials'));
          
            });
        });

        describe('Case 3: password equal but different type', async () => {
      
            const password = '1';
            const hashpassword = 1;
    
            it('should throw an error', async () => {
                expect(m_passport.comparePassword(password, hashpassword))
                    .rejects
                    .toEqual(new Error('Illegal arguments: string, number'));
            
            });
        });


    });
});
