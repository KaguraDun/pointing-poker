import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

import Button from '@/components/Button/Button';
import LoginForm from '@/components/LoginForm/LoginForm';
import Modal from '@/components/Modal/Modal';
import { Member } from '@/models/member';
import roomApi from '@/services/roomApi';

const Home = () => {
  const [showModal, setShowModal] = useState(false);
  const history = useHistory();

  const closeModal = () => {
    setShowModal(false);
  };

  const createRoom = (dealerData: Member) => {
    roomApi.createRoom(dealerData);
    history.push('/lobby');
  };

  return (
    <div>
      <Button handleClick={() => setShowModal(true)}>Create room</Button>
      <Modal handleCloseModal={closeModal} showModal={showModal}>
        <LoginForm
          handleCloseModal={closeModal}
          saveData={(dealerData) => createRoom(dealerData)}
          userRole="dealer"
        />
      </Modal>
    </div>
  );
};
export default Home;
