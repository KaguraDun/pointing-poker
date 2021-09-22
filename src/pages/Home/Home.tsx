/* eslint-disable react-redux/useSelector-prefer-selectors */
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import Button from '@/components/Button/Button';
import ErrorMessage from '@/components/ErrorMessage/ErrorMessage';
import LoginForm from '@/components/LoginForm/LoginForm';
import Modal from '@/components/Modal/Modal';
import { toggleModalConnectRoom } from '@/features/room';
import { Member } from '@/models/member';
import roomApi from '@/services/roomApi';
import { RootState } from '@/store';

import s from './Home.scss';

const Home = () => {
  const dispatch = useDispatch();
  const [roomURL, setRoomURL] = useState('');
  const [showModalCreateRoom, setShowModalCreateRoom] = useState(false);

  const showModalConnectRoom = useSelector(
    ({ room }: RootState) => room.showModalConnectRoom
  );
  const roomNotFound = useSelector(({ room }: RootState) => room.roomNotFound);
  const history = useHistory();

  const closeModal = () => {
    setShowModalCreateRoom(false);
    dispatch(toggleModalConnectRoom);
  };

  const createRoom = (dealerData: Member) => {
    roomApi.createRoom(dealerData);
    history.push('/settings');
  };

  const ConnectToRoom = (e: SubmitEvent) => {
    e.preventDefault();
    roomApi.connect(roomURL);
  };

  const AddUser = (userData: Member) => {
    roomApi.AddUser(userData);
    history.push('/lobby');
  };

  return (
    <div className={s.home}>
      <div className={s.createRoomWrapper}>
        <Button handleClick={() => setShowModalCreateRoom(true)}>
          Create room
        </Button>
        <Modal handleCloseModal={closeModal} showModal={showModalCreateRoom}>
          <LoginForm
            handleCloseModal={closeModal}
            saveData={(dealerData) => createRoom(dealerData)}
            userRole="dealer"
          />
        </Modal>
      </div>

      <div className={s.connectWrapper}>
        <form onSubmit={(e) => ConnectToRoom(e)}>
          {roomNotFound ? <ErrorMessage text="Room not found!" /> : null}
          <input onChange={(e) => setRoomURL(e.target.value)} type="text" />
          <Button type="submit">Connect to lobby</Button>
        </form>

        <Modal handleCloseModal={closeModal} showModal={showModalConnectRoom}>
          <LoginForm
            handleCloseModal={closeModal}
            saveData={(userData) => AddUser(userData)}
          />
        </Modal>
      </div>
    </div>
  );
};
export default Home;
