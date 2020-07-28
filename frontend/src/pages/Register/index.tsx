import React from 'react';

export const RegisterPage = () => {
  const [email, setEmail] = React.useState<string>('');
  const [password, setPassword] = React.useState<string>('');
  const [passwordConfirm, setPasswordConfirm] = React.useState<string>('');
  const [firstName, setFirstName] = React.useState<string>('');
  const [lastName, setLastName] = React.useState<string>('');

  const registerUser = () => {
    //auth logic here
  };

  return (
    <div className='login'>
      <img src={`${process.env.PUBLIC_URL}/veggies.jpg`} className='login__img' />
      <form onSubmit={() => registerUser()} className='login__form'>
        <h2>Register Account</h2>

        <label>First Name</label>
        <input type='text' placeholder='Enter first name...' onChange={(e) => setFirstName(e.target.value)} />

        <label>Last Name</label>
        <input type='text' placeholder='Enter last name...' onChange={(e) => setLastName(e.target.value)} />

        <label>Email</label>
        <input type='text' placeholder='Enter email...' onChange={(e) => setEmail(e.target.value)} />

        <label>Password</label>
        <input type='password' placeholder='Enter password...' onChange={(e) => setPassword(e.target.value)} />

        <label>Confirm Password</label>
        <input type='password' placeholder='Enter password...' onChange={(e) => setPassword(e.target.value)} />

        <input type='submit' value='Submit' />
        <div className='sign-up-link'>
          Already have an account? Sign in <a href='/login'>here</a>
        </div>
      </form>
    </div>
  );
};
