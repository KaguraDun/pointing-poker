import React from 'react';

import s from './Header.scss';
import Logo from '@/images/back.svg';

const Header = () => (
  <header className={s.header}>
    <div className={s.container}>
      <div className={s.logo}>
        <Logo />
      </div>
      <div className={s.settings}>
        <span></span>
        <span></span>
        <span></span>
      </div>
    </div>
  </header>
);

export default Header;
