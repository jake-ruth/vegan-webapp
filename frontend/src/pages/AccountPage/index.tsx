import React from 'react';
import { Navbar } from '../../components/Navbar';
import { AccountPageTabs } from './AccountPageTabs';

export const AccountPage = () => {
  return (
    <div>
      <Navbar />
      <AccountPageTabs />
    </div>
  );
};
