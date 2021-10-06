import React from 'react';

import Github from '@/icons/github.svg';
import LogoRss from '@/icons/rsschool.svg';

import s from './Footer.scss';

const Footer = () => (
  <footer className={s.footer}>
    <div className={s.container}>
      <div className={s.leftWrapper}>
        <div className={s.year}>2021</div>
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
      </div>
      <div className={s.rightWrapper}>
        <a
          className={s.github}
          href="https://github.com/KaguraDun"
          rel="noreferrer"
          target="_blank"
        >
          <Github />
          <span>Vasily Kovnev</span>
        </a>
        <a
          className={s.github}
          href="https://github.com/angietune"
          rel="noreferrer"
          target="_blank"
        >
          <Github />
          <span>Natalia Lazareva</span>
        </a>
      </div>
    </div>
  </footer>
);

export default Footer;
