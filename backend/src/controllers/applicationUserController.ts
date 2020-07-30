import { ApplicationUser } from '../entities/ApplicationUser';

export class ApplicationUserController {
  static readAllApplicationUsers = async () => {
    return await ApplicationUser.find();
  };

  static createApplicationUser = async (applicationUser: ApplicationUser) => {
    return await ApplicationUser.save(applicationUser);
  };
}
