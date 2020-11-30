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
      console.log(error.response.status);
      if (error.response.status === 401) {
        //Try to generate new accessToken from refreshToken, if fails redirect to login
        Axios.post(`${process.env.REACT_APP_BACKEND_URL}/token`, { refreshToken: AuthService.getRefreshToken() })
          .then((res: any) => {
            AuthService.setAccessToken(res.data.accessToken);
          })
          .then(() => window.location.reload())
          .catch((err) => {
            console.log('HERE', err);
            // window.location.href = '/loginPage';
          });
      }
    }
    return error;
  }
);

export default axios;
