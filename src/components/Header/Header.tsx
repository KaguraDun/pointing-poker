import React from 'react';

import Logo from '@/images/back.svg';

import s from './Header.scss';

const Header = () => (
  <header className={s.header}>
    <div className={s.container}>
      <a href="/" className={s.logo}>
        <Logo />
      </a>
      <div className={s.settings}>
        <span />
        <span />
        <span />
      </div>
    </div>
  </header>
);

export default Header;
