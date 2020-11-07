import axios from 'axios';

export class ApplicationUserController {
  static async getApplicationUser(id: number) {
    try {
      const res = await axios.get('https://vegan-webapp.herokuapp.com/_healthcheck');
      return res;
    } catch (err) {
      throw new Error(err);
    }
  }
}
