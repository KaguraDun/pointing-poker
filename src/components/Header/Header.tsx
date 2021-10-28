/* eslint-disable react-redux/useSelector-prefer-selectors */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import Logo from '@/images/back.svg';
import { UserRoles } from '@/models/member';
import roomApi from '@/services/roomApi';
import { RootState } from '@/store';

import Button from '../Button/Button';
import Modal from '../Modal/Modal';
import s from './Header.scss';

const Header = () => {
  const [showModalAlert, setShowModalAlert] = useState(false);
  const history = useHistory();
  const currentUserID = roomApi.getCurrentUserID();
  const users = useSelector(({ room }: RootState) => room?.room?.users);

  const handleClick = () => {
    if (window.location.pathname !== '/') {
      setShowModalAlert(true);
    }
  };
  const handleCloseModal = () => {
    setShowModalAlert(false);
  };
  const goHome = () => {
    setShowModalAlert(false);
    const isUserRoleDealer = users?.[currentUserID]?.role === UserRoles.dealer;
    if (isUserRoleDealer) {
      roomApi.close();
    } else {
      roomApi.removeUser(currentUserID);
    }
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
