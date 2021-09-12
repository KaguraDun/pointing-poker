import React, { useState } from 'react';

import LoginForm from '@/components/LoginForm/LoginForm';

import Modal from '../../components/Modal/Modal';

const Home = () => {
  const [showModal, setShowModal] = useState(false);
  const close = () => {
    setShowModal(false);
  };
  return (
    <div>
      Home
      <button onClick={() => setShowModal(true)} type="button">
        show
      </button>
      <Modal handleCloseModal={() => setShowModal(false)} showModal={showModal}>
        <LoginForm handleCloseModal={close} />
      </Modal>
    </div>
  );
};
export default Home;
