import React, { useEffect, useState } from 'react';

import { Member, UserRoles } from '@/models/member';

import Button from '../Button/Button';
import s from './LoginForm.scss';

interface LoginFormProps {
  saveData: (data: Member) => void;
  handleCloseModal: () => void;
  userRole?: 'dealer';
}

const LoginForm = ({
  handleCloseModal,
  saveData,
  userRole,
}: LoginFormProps) => {
  const memberData: Member = {
    image: '',
    name: '',
    surname: '',
    position: '',
    role: UserRoles[userRole] || UserRoles.player,
  };
  const [formData, setFormData] = useState(memberData);
  const [error, setError] = useState('');
  const [fieldDirty, setFieldDirty] = useState(false);
  const [formValid, setFormValid] = useState(false);

  useEffect(() => {
    if (error === '') {
      setFormValid(false);
    } else {
      setFormValid(true);
    }
  }, [error]);

  const inputHandler =
    (fieldName: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
      setFormData({
        ...formData,
        [fieldName]: e.target.value,
      });
      if (!formData.name) setError("Name should't be empty");
    };

  const imageHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const img = e.target.files[0];
    const reader = new FileReader();
    reader.onload = function () {
      // eslint-disable-next-line react/no-this-in-sfc
      const base64 = this.result.replace(/.*base64,/, '');
      setFormData({
        ...formData,
        image: base64,
      });
    };
    reader.readAsDataURL(img);
  };

  const blurHandler = () => {
    setFieldDirty(true);
    if (formData.name) setFieldDirty(false);
  };

  const submitForm = () => {
    if (formValid) {
      handleCloseModal();
      saveData(formData);
    }
  };

  return (
    <div className={s.formWrapper}>
      <div className={s.formTitle}>Connect to lobby</div>
      <form className={s.form}>
        {fieldDirty && <div className={s.fieldName}>{error}</div>}
        <input
          className={s.formInput}
          onBlur={() => blurHandler()}
          onChange={inputHandler('name')}
          placeholder="Your first name"
          required
          type="text"
          value={formData.name}
        />
        <input
          className={s.formInput}
          onChange={inputHandler('surname')}
          placeholder="Your last name"
          type="text"
          value={formData.surname}
        />
        <input
          className={s.formInput}
          onChange={inputHandler('position')}
          placeholder="Your job position"
          type="text"
          value={formData.position}
        />
        <div className={s.formSubtitle}>Image:</div>
        <input
          accept="image/png, image/jpeg"
          className={[s.formInput, s.formInputImage].join('')}
          onChange={imageHandler}
          type="file"
        />
        {formData.image ? (
          <img
            alt="avatar"
            className={s.image}
            src={
              formData.image ? `data:image/png;base64, ${formData.image}` : null
            }
          />
        ) : null}
        <div className={s.submitButtons}>
          <Button handleClick={() => submitForm()}>Submit</Button>
          <Button handleClick={() => handleCloseModal()} variant="additional">
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
