import React, { useState } from 'react';

import { Issue, issueList, IssuePriorities } from '@/models/issue';

import Button from '../Button/Button';
import Dropdown from '../Dropdown/Dropdowns';
import s from './EditIssueForm.scss';

interface CreateIssueFormProps {
  saveData: (data: Issue) => void;
  handleCloseModal: () => void;
  issue: {
    ID: string;
    title: string;
    link: string;
    priority: IssuePriorities;
  };
}

const EditIssueForm = ({
  issue,
  handleCloseModal,
  saveData,
}: CreateIssueFormProps) => {
  const issueData: Issue = {
    ID: issue?.ID,
    title: issue?.title,
    link: issue?.link,
    priority: issue?.priority,
  };
  type ErrorType = Record<string, boolean>;

  const [formData, setFormData] = useState(issueData);
  const [errorList, setErrorList] = useState({} as ErrorType);

  const errorValidation = {
    title: () => formData.title.length > 0,
  };

  const validate = () => {
    const tempData = {} as ErrorType;

    if (!errorValidation.title()) {
      tempData.title = true;
    }

    setErrorList(tempData);
  };

  const inputHandler = (fieldName: string) => (e: React.ChangeEvent) => {
    const target = e.target as HTMLInputElement | HTMLSelectElement;

    setFormData({
      ...formData,
      [fieldName]: target.value,
    });
  };

  const submitForm = () => {
    validate();
    const isNoErrors = Object.keys(errorList).length === 0;

    if (isNoErrors) {
      handleCloseModal();
      saveData(formData);
    }
  };

  interface ErrorProps {
    text: string;
  }

  const Error = ({ text }: ErrorProps) => <div className={s.error}>{text}</div>;

  const getIssueValues = () => {
    if (!issueList) return [];
    return Object.entries(issueList).map(([key, value]) => ({
      value: key,
      name: value.name,
    }));
  };
  return (
    <div className={s.formWrapper}>
      <div className={s.formTitle}>Edit Issue</div>
      <form className={s.form}>
        {errorList.title ? <Error text="Enter issue title" /> : null}
        <input
          className={s.formInput}
          onChange={inputHandler('title')}
          placeholder="Issue title"
          required
          type="text"
          value={formData.title}
        />
        <input
          className={s.formInput}
          onChange={inputHandler('link')}
          placeholder="Issue link"
          type="text"
          value={formData.link}
        />
        <Dropdown
          defaultValue={formData.priority}
          handleOnChange={inputHandler('priority')}
          label="Priority"
          options={getIssueValues()}
        />
        <div className={s.submitButtons}>
          <Button handleClick={() => submitForm()}>Edit</Button>
          <Button handleClick={() => handleCloseModal()} variant="additional">
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
};

export default EditIssueForm;
