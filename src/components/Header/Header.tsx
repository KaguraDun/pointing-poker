import React from 'react';

import Logo from '@/images/back.svg';

import s from './Header.scss';

const Header = () => (
  <header className={s.header}>
    <div className={s.container}>
      <div className={s.logo}>
        <Logo />
      </div>
      <div className={s.settings}>
        <span />
        <span />
        <span />
      </div>
    </div>
  </header>
);

export default Header;
