import React from 'react';

import Github from '@/icons/github.svg';
import LogoRss from '@/icons/rsschool.svg';
import Youtube from '@/icons/youtube.svg';

import s from './Footer.scss';

const Footer = () => (
  <footer className={s.footer}>
    <div className={s.container}>
      <div className={s.leftWrapper}>
        <div className={s.youtube}>
          <Youtube />
        </div>
      </div>
      <div className={s.wrapper}>
        <a
          className={s.logoRss}
          href="https://rs.school"
          rel="noreferrer"
          target="_blank"
        >
          <LogoRss />
        </a>
        <div className={s.divider} />
        <div className={s.year}>2021</div>
      </div>
      <div className={s.rightWrapper}>
        <a
          className={s.github}
          href="https://github.com/KaguraDun"
          rel="noreferrer"
          target="_blank"
        >
          <Github />
          <span>KaguraDun</span>
        </a>
        <a
          className={s.github}
          href="https://github.com/angietune"
          rel="noreferrer"
          target="_blank"
        >
          <Github />
          <span>angietune</span>
        </a>
      </div>
    </div>
  </footer>
);

export default Footer;
