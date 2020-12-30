import React from 'react';
import { Footer } from '../../components/Footer';
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
