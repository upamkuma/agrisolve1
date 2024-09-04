import React from 'react';
import Logo from './Logo';
import Navigation from './Navigation';
import Button from '../../Buttons/Button';

const Header = () => {
  return (
    <header className="flex justify-between items-center p-4">
      <Logo />
      <Navigation />
      <Button color="yellow" to="/SignIn">Sign in</Button>
    </header>
  );
};

export default Header;