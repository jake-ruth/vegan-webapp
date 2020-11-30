import React from 'react';
import axios from 'axios';
import { Controller, useForm } from 'react-hook-form';
import { useHistory, Link } from 'react-router-dom';
import { AuthService } from '../../utils/AuthService';
import { Button, TextField } from '@material-ui/core';

export const RegisterPage = () => {
  interface FormInput {
    email: string;
    password: string;
    passwordConfirm: string;
    firstName: string;
    lastName: string;
  }

  const { register, errors, control, handleSubmit } = useForm<FormInput>();
  const history = useHistory();

  const onSubmit = async (data: FormInput) => {
    const newUser: any = {};
    newUser.email = data.email;
    newUser.password = data.password;
    newUser.firstName = data.firstName;
    newUser.lastName = data.lastName;
    newUser.bio = '';

    try {
      const res = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/register`, newUser);
      AuthService.setAccessToken(res.data.accessToken);
      AuthService.setRefreshToken(res.data.refreshToken);
      history.replace('/');
    } catch (err) {
      alert(JSON.stringify(err));
    }
  };

  return (
    <div className='register'>
      <img src={`${process.env.PUBLIC_URL}/veggies.jpg`} className='register__img' />
      <form onSubmit={handleSubmit(onSubmit)} className='register__form container'>
        <h2>Register Account</h2>

        <Controller
          as={TextField}
          control={control}
          rules={{ required: 'First Name Required' }}
          type='text'
          id='firstName'
          name='firstName'
          label='firstName'
          fullWidth
        />
        <div className='error'>{errors.firstName && errors.firstName.message}</div>

        <Controller
          as={TextField}
          control={control}
          rules={{ required: 'Last Name Required' }}
          type='text'
          id='lastName'
          name='lastName'
          label='lastName'
          fullWidth
        />
        <div className='error'>{errors.lastName && errors.lastName.message}</div>

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

        <Controller
          as={TextField}
          control={control}
          rules={{ required: 'Password Confirmation Required' }}
          type='password'
          id='passwordConfirm'
          name='passwordConfirm'
          label='passwordConfirm'
          fullWidth
        />
        <div className='error'>{errors.passwordConfirm && errors.passwordConfirm.message}</div>

        <Button variant='contained' style={{ borderRadius: 0 }} color='primary' type='submit'>
          Submit
        </Button>
        <div className='sign-up-link'>
          Already have an account? Sign in{' '}
          <Link to='/loginPage' style={{ color: 'purple' }}>
            here
          </Link>
        </div>
      </form>
    </div>
  );
};
