import React from 'react';

import { Member } from '@/models/interfaces';

import s from './memberCard.scss';

const MemberCard = ({ image, name, surname, position }: Member) => (
  <div className={s.memberCard}>
    <img alt="avatar" className={s.image} src={image} />
    <div>
      <h4 className={s.title}>
        {name}
        {surname}
      </h4>
      <p className={s.position}>{position}</p>
    </div>
    <div className={s.remove} />
  </div>
);

export default MemberCard;
