import { ApplicationUser } from '../entities/ApplicationUser';

export class ApplicationUserController {
  static readAllApplicationUsers = async () => {
    return await ApplicationUser.findOne({ where: { id: 1 } });
  };
}
