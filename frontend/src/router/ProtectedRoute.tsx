// This is used to determine if a user is authenticated and
// if they are allowed to visit the page they navigated to.

// If they are: they proceed to the page
// If not: they are redirected to the login page.

import React from 'react';
import { AuthService } from '../utils/AuthService';
import { Redirect, Route, RouteProps, RouteComponentProps } from 'react-router-dom';

export const PrivateRoute = ({ component, ...rest }: RouteProps) => {
  if (!component) {
    throw Error('component is undefined');
  }

  const Component = component; // JSX Elements have to be uppercase.
  const render = (props: RouteComponentProps<any>): React.ReactNode => {
    if (AuthService.isLoggedIn()) {
      return <Component {...props} />;
    }
    return <Redirect to={{ pathname: '/' }} />;
  };

  return <Route {...rest} render={render} />;
};
