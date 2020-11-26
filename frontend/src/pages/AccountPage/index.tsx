import { Button } from '@material-ui/core';
import React from 'react';
import { useHistory } from 'react-router-dom';
import { Navbar } from '../../components/Navbar';
import { ApplicationUserController } from '../../controllers/ApplicationUserController';

export const AccountPage = () => {
  const history = useHistory();
  const logout = async () => {
    await ApplicationUserController.logoutUser();
    localStorage.clear();
    history.replace('/loginPage');
  };

  return (
    <div>
      <Navbar />
      <div>
        <Button onClick={() => logout()}>Logout</Button>
      </div>
    </div>
  );
};
