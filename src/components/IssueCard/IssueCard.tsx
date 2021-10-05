import React, { useState } from 'react';

import DeleteIcon from '@/icons/delete.svg';
import EditIssue from '@/icons/edit.svg';
import { Issue } from '@/models/issue';

import gameApi from '../../services/gameApi';
import EditIssueForm from '../EditIssueForm/EdirIssueForm';
import Modal from '../Modal/Modal';
import s from './IssueCard.scss';

const IssueCard = ({ link, title, priority, ID }: Issue) => {
  const [showModalEditIssue, setShowModalEditIssue] = useState(false);
  const handleClick = () => {
    setShowModalEditIssue(true);
  };
  const handleCloseModal = () => {
    setShowModalEditIssue(false);
  };
  const handleDeleteIssue = () => {
    gameApi.deleteIssue(ID);
  };
  const editIssue = (issueData: Issue) => {
    setShowModalEditIssue(false);
    gameApi.editIssue(ID, issueData);
  };
  return (
    <div key={ID} className={s.issueCard}>
      <div className={s.wrapper}>
        <a className={s.link} href={link} rel="noreferrer" target="_blank">
          {link}
        </a>
        <h4 className={s.title}>{title}</h4>
        <em className={s.subtitle}>{priority}</em>
      </div>
      <button className={s.iconBtn} onClick={handleClick} type="button">
        <EditIssue className={s.edit} />
      </button>
      <button className={s.iconBtn} onClick={handleDeleteIssue} type="button">
        <DeleteIcon className={s.remove} />
      </button>
      <Modal handleCloseModal={handleCloseModal} showModal={showModalEditIssue}>
        <EditIssueForm
          handleCloseModal={handleCloseModal}
          Issue={{ title, link, priority, ID }}
          saveData={(issueData) => editIssue(issueData)}
        />
      </Modal>
    </div>
  );
};

export default IssueCard;
