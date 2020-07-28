import React from 'react';

export const LoginPage = () => {
  const [email, setEmail] = React.useState<string>('');
  const [password, setPassword] = React.useState<string>('');

  const loginUser = (e: any) => {
    e.preventDefault();

    // Logic to hit auth
    window.location.href = '/';
  };

  return (
    <div className='login'>
      <img src={`${process.env.PUBLIC_URL}/veggies.jpg`} className='login__img' />
      <form onSubmit={loginUser} className='login__form container'>
        <h2>Log into Plant Based Plate</h2>
        <div className='floating-label'>
          <label>Email</label>
          <input type='text' name='email' placeholder='Enter email...' onChange={(e) => setEmail(e.target.value)} />
        </div>

        <label>Password</label>
        <input type='text' name='password' placeholder='Enter password...' onChange={(e) => setPassword(e.target.value)} />

        <input type='submit' value='Submit' />
        <div className='sign-up-link'>
          Don't have an account yet? Sign up <a href='/register'>here</a>
        </div>
      </form>
    </div>
  );
};