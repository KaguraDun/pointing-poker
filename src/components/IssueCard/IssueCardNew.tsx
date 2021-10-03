import React, { useState } from 'react';

import Plus from '@/icons/plus.svg';

import CreateIssueForm from '../CreateIssueForm/CreateIssueForm';
import s from './IssueCard.scss';
import Modal from '../Modal/Modal';
import { Issue } from '@/models/issue';

const IssueCardNew = () => {
  const [showModalCreateIssue, setShowModalCreateIssue] = useState(false);
  const handleClick = () => {
    setShowModalCreateIssue(true);
  };
  const closeModal = () => {
    setShowModalCreateIssue(false);
  };
  const saveData = () => {
    setShowModalCreateIssue(false);
  };

  return (
    <div className={s.issueCard} onClick={handleClick}>
      <div className={s.wrapperNew}>
        <h4 className={s.titleNew}>Create new issue</h4>
        <Plus />
      </div>
      <Modal handleCloseModal={closeModal} showModal={showModalCreateIssue}>
        <CreateIssueForm handleCloseModal={closeModal} saveData={saveData} />
      </Modal>
    </div>
  );
};

export default IssueCardNew;
