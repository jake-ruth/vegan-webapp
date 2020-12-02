import axios from 'axios';

export class AuthController {
  static login = async (email: string, password: string) => {
    return await axios.post(`${process.env.REACT_APP_BACKEND_URL}/login`, { email, password });
  };
}
