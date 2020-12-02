import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Button, TextField } from '@material-ui/core';
import { AuthService } from '../../utils/AuthService';
import { Link, useHistory } from 'react-router-dom';
import { UserContext } from '../../context';
import { AuthController } from '../../controllers/AuthController';

export const LoginPage = () => {
  interface FormInput {
    email: string;
    password: string;
  }

  const { errors, control, handleSubmit } = useForm<FormInput>();
  const history = useHistory();
  const { setUser } = React.useContext(UserContext);

  const onSubmit = async (data: FormInput) => {
    try {
      const { email, password } = data;
      const res = await AuthController.login(email, password);

      setUser(res.data.user);
      AuthService.setUserToStorage(res.data.user);
      AuthService.setAccessToken(res.data.accessToken);
      AuthService.setRefreshToken(res.data.refreshToken);
      history.replace('/');
    } catch (err) {
      alert(JSON.stringify(err));
    }
  };

  return (
    <div className='login'>
      <img src={`${process.env.PUBLIC_URL}/veggies.jpg`} className='login__img' />
      <form onSubmit={handleSubmit(onSubmit)} className='login__form container'>
        <h2>Log into Plant Based Plate</h2>

        <Controller
          as={TextField}
          control={control}
          rules={{ required: 'Email Required' }}
          type='text'
          id='email'
          name='email'
          label='Email'
          fullWidth
        />
        <div className='error'>{errors.email && errors.email.message}</div>

        <Controller
          as={TextField}
          control={control}
          rules={{ required: 'Password Required' }}
          type='password'
          id='password'
          name='password'
          label='password'
          fullWidth
        />
        <div className='error'>{errors.password && errors.password.message}</div>

        <Button variant='contained' style={{ borderRadius: 0 }} color='primary' type='submit'>
          Submit
        </Button>
        <div className='sign-up-link'>
          Don't have an account yet? Sign up{' '}
          <Link to='/register' style={{ color: 'purple' }}>
            here
          </Link>
        </div>
      </form>
    </div>
  );
};
