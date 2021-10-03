import React, { useState } from 'react';

import Plus from '@/icons/plus.svg';

import CreateIssueForm from '../CreateIssueForm/CreateIssueForm';
import Modal from '../Modal/Modal';
import s from './IssueCard.scss';
import gameApi from '../../services/gameApi';
import { Issue } from '@/models/issue';

const IssueCardNew = () => {
  const [showModalCreateIssue, setShowModalCreateIssue] = useState(false);
  const handleClick = () => {
    setShowModalCreateIssue(true);
  };
  const handleCloseModal = () => {
    setShowModalCreateIssue(false);
  };
  const createIssue = (issueData: Issue) => {
    setShowModalCreateIssue(false);
    gameApi.createIssue(issueData);
  };

  return (
    <div className={s.issueCard}>
      <div className={s.wrapperNew}>
        <h4 className={s.titleNew}>Create new issue</h4>
        <Plus className={s.plus} onClick={handleClick} />
      </div>
      <Modal
        showModal={showModalCreateIssue}
        handleCloseModal={handleCloseModal}
      >
        <CreateIssueForm
          handleCloseModal={handleCloseModal}
          saveData={(issueData) => createIssue(issueData)}
        />
      </Modal>
    </div>
  );
};

export default IssueCardNew;
