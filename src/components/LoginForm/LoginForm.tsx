import React, { useEffect, useState } from 'react';

import Member from '@/models/member';

import Button from '../Button/Button';
import s from './LoginForm.scss';

const LoginForm = () => {
  const memberData: Member = {
    image: { image: '' },
    name: '',
    surname: '',
    position: '',
  };
  const [formData, setFormData] = useState(memberData);
  const [image, setImage] = useState({ image: '' });
  const [error, setError] = useState("Should't be empty");
  const [fieldDirty, setFieldDirty] = useState(false);
  const [formValid, setFormValid] = useState(false);

  useEffect(() => {
    if (error) {
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
    setImage({ image: URL.createObjectURL(img) });
    setFormData({
      ...formData,
      image: { image: e.target.value },
    });
  };

  const blurHandler = () => {
    setFieldDirty(true);
    if (formData.name) setFieldDirty(false);
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
            value={formData.image.image}
          />
          {image.image !== '' ? (
          <img alt="avatar" className={s.image} src={image.image || ''} />
        ) : null}
        <div className={s.submitButtons}>
          <Button handleClick={() => ()}>Submit</Button>
          <Button handleClick={() => handleCloseModal()} variant="additional">
            Cancel
          </Button>
        </div>
        </form>
        
      </div>
    );
};

export default LoginForm;
