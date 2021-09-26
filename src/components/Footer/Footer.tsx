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
      <div className={s.logoRss}>
        <LogoRss />
      </div>
      <div className={s.divider} />
      <div className={s.year}>2021</div>
    </div>
    <div className={s.gitWrapper}>
      <div className={s.github}>
        <Github />
        <span>KaguraDan</span>
      </div>
      <div className={s.github}>
        <Github />
        <span>KaguraDan</span>
      </div>
      <div className={s.github}>
        <Github />
        <span>KaguraDan</span>
      </div>
    </div>
  </div>
);

export default Footer;
