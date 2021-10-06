import React, { useState } from 'react';
import Logo from '@/images/back.svg';

import s from './Header.scss';
import Modal from '../Modal/Modal';
import Button from '../Button/Button';
import { useHistory } from 'react-router-dom';

const Header = () => {
  const [showModalAlert, setShowModalAlert] = useState(false);
  const history = useHistory();

  const handleClick = () => {
    setShowModalAlert(true);
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
        <div className={s.settings}>
          <span />
          <span />
          <span />
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
