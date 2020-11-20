import { ApplicationUser } from '../models/ApplicationUser';

export class AuthService {
  static accessToken: string = 'veganWebappAccessToken';
  private static refreshToken: string = 'veganWebappRefreshToken';
  private static applicationUser: string = 'veganWebappApplicationUser';

  static isLoggedIn = () => {
    if (localStorage.getItem(AuthService.accessToken)) return true;
    return false;
  };

  static setAccessToken = (token: string) => {
    return localStorage.setItem(AuthService.accessToken, token);
  };

  static getAccessToken = () => {
    return localStorage.getItem(AuthService.accessToken);
  };

  static setRefreshToken = (refreshToken: string) => {
    return localStorage.setItem(AuthService.refreshToken, refreshToken);
  };

  static getRefreshToken = () => {
    return localStorage.getItem(AuthService.refreshToken);
  };

  static setUserToStorage = (user: ApplicationUser) => {
    return localStorage.setItem(AuthService.applicationUser, JSON.stringify(user));
  };

  static getUserFromStorage = (): ApplicationUser => {
    const userString = localStorage.getItem(AuthService.applicationUser);
    return JSON.parse(userString!);
  };
}
