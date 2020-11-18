// import { ApplicationUser } from "../entities/ApplicationUser";

let user = {
  email: 'jaketest123@email.com',
  password: 'test',
  firstName: 'Test',
  lastName: 'TestLastName',
  bio: 'Test Bio'
};

describe('User Tests', () => {
  const axios = require('axios');
  let devUrl = 'http://localhost:4000';

  it('should create user record in the db', async () => {
    let result = await axios.post(`${devUrl}/register`, user);
    expect(result);
  });

  it('should log in the user', async () => {
    let result = await axios.post(`${devUrl}/login`, { email: user.email, password: user.password });

    expect(result);
  });

  it('should delete test user from database', async () => {
    let result = axios.post(
      `${devUrl}/deleteApplicationUser`,
      { id: 2 },
      {
        headers: {
          authorization: 'bearer 1234'
        }
      }
    );

    expect(result);
  });
});
