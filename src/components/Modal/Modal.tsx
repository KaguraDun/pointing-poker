/* key event inside use effect */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useEffect } from 'react';

import s from './Modal.scss';

interface Props {
  showModal: boolean;
  handleCloseModal: () => void;
  children: React.ReactNode;
}

const Modal = ({ showModal, handleCloseModal, children }: Props) => {
  useEffect(() => {
    const closeModal = (e: KeyboardEvent) => {
      if (e.key === 'Escape') handleCloseModal();
    };

    window.addEventListener('keydown', closeModal);
    return () => window.removeEventListener('keydown', closeModal);
  }, [handleCloseModal]);

  return showModal ? (
    <div className={s.modal}>
      <div className={s.overlay} onClick={() => handleCloseModal()} />
      <div className={s.container}>{children}</div>
    </div>
  ) : null;
};

export default Modal;
