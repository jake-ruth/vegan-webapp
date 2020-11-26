import axios from 'axios';

export class ApplicationUserController {
  static getApplicationUser = async (id: number) => {
    try {
      const res = await axios.get('https://vegan-webapp.herokuapp.com/_healthcheck');
      return res;
    } catch (err) {
      throw new Error(err);
    }
  };

  static logoutUser = async () => {
    return axios.delete(`${process.env.REACT_APP_BACKEND_URL}/logout`).catch(() => {
      localStorage.clear();
    });
  };
}
