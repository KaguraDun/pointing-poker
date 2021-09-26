import React from 'react';

import Github from '@/icons/github.svg';
import LogoRss from '@/icons/rsschool.svg';
import Youtube from '@/icons/youtube.svg';

import s from './Footer.scss';

const Footer = () => (
  <div className={s.footer}>
    <div className={s.youtube}>
      <Youtube />
    </div>
    <div className={s.wrapper}>
      <a className={s.logoRss} href="https://rs.school">
        <LogoRss />
      </a>
      <div className={s.divider} />
      <div className={s.year}>2021</div>
    </div>
    <div className={s.gitWrapper}>
      <a className={s.github} href="https://github.com/KaguraDun">
        <Github />
        <span>KaguraDun</span>
      </a>
      <a className={s.github} href="https://github.com/angietune">
        <Github />
        <span>angietune</span>
      </a>
      <a className={s.github} href="https://github.com/KaguraDun">
        <Github />
        <span>KaguraDun</span>
      </a>
    </div>
  </div>
);

export default Footer;
