/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

import Logo from '@/images/back.svg';

import Button from '../Button/Button';
import Modal from '../Modal/Modal';
import s from './Header.scss';

const Header = () => {
  const [showModalAlert, setShowModalAlert] = useState(false);
  const history = useHistory();

  const handleClick = () => {
    console.log(window.location.pathname);
    if (window.location.pathname !== '/') {
      setShowModalAlert(true);
    }
  };
  const handleCloseModal = () => {
    setShowModalAlert(false);
  };
  const goHome = () => {
    setShowModalAlert(false);
    history.push('/');
  };
  return (
    <header className={s.header}>
      <div className={s.container}>
        <div className={s.logo} onClick={handleClick}>
          <Logo />
        </div>
      </div>
      <Modal handleCloseModal={handleCloseModal} showModal={showModalAlert}>
        <div className={s.modalHome}>
          <h4>Are you sure? You will quit the Game!</h4>
          <div className={s.submitButtons}>
            <Button handleClick={() => goHome()}>OK</Button>
            <Button handleClick={() => handleCloseModal()} variant="additional">
              Cancel
            </Button>
          </div>
        </div>
      </Modal>
    </header>
  );
};

export default Header;
