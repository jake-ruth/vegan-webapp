import Axios from 'axios';
import { AuthService } from './AuthService';

const axios = Axios.create({
  baseURL: process.env.REACT_APP_BACKEND_URL,
  headers: {
    Authorization: `Bearer ${AuthService.getAccessToken()}`
  }
});
axios.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response) {
      if (error.response.status === 401) {
        //Try to generate new accessToken from refreshToken, if fails redirect to login
        axios
          .post(`${process.env.REACT_APP_BACKEND_URL}/token`, { token: AuthService.getRefreshToken() })
          .then((res: any) => {
            console.log('RES: ', res);
            AuthService.setAccessToken(res.data.accessToken);
            //window.location.reload();
          })
          .then(() => window.location.reload())
          .catch((err) => {
            console.log('HERE', err);
            //window.location.href = '/login';
          });
      }
    }
    return error;
  }
);

export default axios;
