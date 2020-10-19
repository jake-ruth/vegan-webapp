// import { ApplicationUser } from "../entities/ApplicationUser";

const axios = require('axios');

let user = {
  email: 'TestEmail@email.com',
  password: 'test',
  firstName: 'Test',
  lastName: 'TestLastName',
  bio: 'Test Bio'
};

let devUrl = 'http://localhost:4000';

describe('User Tests', () => {
    let userId = 0;

    it('should create user record in the db', async () => {
      let result = await axios.post(`${devUrl}/register`, user);

      console.log("RES: ", result);
  
      expect(result);
    });


    it('should log in the user', async () => {
      let result = await axios.post(`${devUrl}/login`, {email: user.email, password: user.password});

      expect(result);
    });

    it('should delete test user from database', async () => {

     let result = axios.post(`${devUrl}/deleteApplicationUser`, {id: 2}, {
      headers: {
        'authorization' : 'bearer 1234'
        }
     });

     expect(result);
    })
  });