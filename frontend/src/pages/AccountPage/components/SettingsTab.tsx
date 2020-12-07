import { Button } from '@material-ui/core';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import { ApplicationUserController } from '../../../controllers/ApplicationUserController';

export const SettingsTab = () => {
  const methods = useForm();
  const history = useHistory();

  const updateProfile = (applicationUser: any) => {
    console.log('update');
  };

  const logout = async () => {
    await ApplicationUserController.logoutUser();
    localStorage.clear();
    history.replace('/loginPage');
  };

  return (
    <div>
      <form onSubmit={methods.handleSubmit(updateProfile)}></form>

      <Button variant='contained' color='secondary' style={{ borderRadius: 0 }} onClick={() => logout()}>
        Logout
      </Button>
    </div>
  );
};
