import axios from '../utils/axios';

export class ApplicationUserController {
  static getApplicationUser = async (uuid: string) => {
    try {
      const res = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/getApplicationUser/${uuid}`);
      return res.data;
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
