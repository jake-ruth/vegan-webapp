import { Button, Checkbox, FormControlLabel, TextField } from '@material-ui/core';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import { UserContext } from '../../../context';
import { ApplicationUserController } from '../../../controllers/ApplicationUserController';

export const SettingsTab = () => {
  const history = useHistory();
  const { user } = React.useContext(UserContext);
  const methods = useForm({ defaultValues: user });

  const updateProfile = (applicationUser: any) => {
    console.log('update');
    console.log(applicationUser);
  };

  const logout = async () => {
    await ApplicationUserController.logoutUser();
    localStorage.clear();
    history.replace('/loginPage');
  };

  return (
    <div className='account-page__settings'>
      <form onSubmit={methods.handleSubmit(updateProfile)}>
        <Controller
          as={TextField}
          control={methods.control}
          rules={{ required: 'first name required' }}
          type='text'
          id='firstName'
          name='firstName'
          label='First Name'
          fullWidth
        />
        <Controller
          as={TextField}
          control={methods.control}
          rules={{ required: 'last name required' }}
          type='text'
          id='lastName'
          name='lastName'
          label='Last Name'
          fullWidth
        />

        <div className='error'>{methods.errors.lastName && methods.errors.lastName.message}</div>

        <Controller
          as={TextField}
          control={methods.control}
          rules={{ required: 'email required' }}
          type='text'
          id='email'
          name='email'
          label='Email'
          fullWidth
        />
        {/* <Controller
          as={<FormControlLabel value='start' control={<Checkbox color='primary' />} label='Start' labelPlacement='start' />}
          name='receiveEmails'
          control={methods.control}
        /> */}
        <Button type='submit'>Save Profile</Button>
      </form>

      <Button variant='contained' color='secondary' style={{ borderRadius: 0 }} onClick={() => {}}>
        Change Password
      </Button>
      <Button variant='contained' color='secondary' style={{ borderRadius: 0 }} onClick={() => logout()}>
        Logout
      </Button>
    </div>
  );
};
