import React from 'react';
import { ApplicationUser } from '../models/ApplicationUser';
import { AuthService } from '../utils/AuthService';

type UserContextProps = {
  user: ApplicationUser;
  setUser: any;
};

export const UserContext = React.createContext<UserContextProps>({
  user: AuthService.getUserFromStorage(),
  setUser: null
});
