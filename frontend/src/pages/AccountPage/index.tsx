import { Button } from '@material-ui/core';
import React from 'react';
import { Navbar } from '../../components/Navbar';
import { AuthService } from '../../utils/AuthService';
import axios from '../../utils/axios';

export const AccountPage = () => {
  const logout = async () => {
    return axios
      .delete(`${process.env.REACT_APP_BACKEND_URL}/logout`)
      .then(() => {
        localStorage.clear();
      })
      .catch(() => {
        localStorage.clear();
      });
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
