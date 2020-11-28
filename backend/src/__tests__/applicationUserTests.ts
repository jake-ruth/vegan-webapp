import { createConnection, getConnection } from 'typeorm';
import { ApplicationUserController } from '../controllers/ApplicationUserController';
import { ApplicationUser } from '../entities/ApplicationUser';

beforeAll(async () => {
  await createConnection();
});

afterAll(async () => {
  await getConnection().close();
});

let appUser = new ApplicationUser();
appUser.email = 'testemail@email.com';
appUser.password = 'test';
appUser.firstName = 'Test';
appUser.lastName = 'LastName';
appUser.bio = 'Test bio';

describe('User Tests', () => {
  it('should create user record in the db', async () => {
    try {
      const result = await ApplicationUserController.createApplicationUser(appUser);
      expect(result.email).toBe(appUser.email);
    } catch (err) {
      console.log('ERR: ', err);
    }
  });

  it('should log in the user', async () => {
    let result = await ApplicationUserController.login(appUser.email, 'test');
    expect(result.email).toBe(appUser.email);
  });

  //This is just to clean up, doesn't test a function that's used
  it('should delete test user from database', async () => {
    const user = await ApplicationUser.findOne({ where: { email: appUser.email } });
    let result = await ApplicationUser.delete(user!.id);

    expect(result);
  });
});
