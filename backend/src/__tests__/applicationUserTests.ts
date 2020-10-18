// import { ApplicationUser } from "../entities/ApplicationUser";
const axios = require('axios');

describe('User Tests', () => {
    it('should create user record in the db', async () => {
      let user = {
        email: 'TestEmail@email.com',
        password: 'test',
        firstName: 'Test',
        lastName: 'TestLastName',
        bio: 'Test Bio'
      };


      let result = await axios.post('http://localhost:4000/register', user);
  
      expect(result);
    });
  });