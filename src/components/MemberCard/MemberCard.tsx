import s from 'memberCard.scss';
import React from 'react';

import { Member } from '@/models/interfaces';

const MemberCard = ({ image, name, surname, position }: Member) => (
  <div className={s.memberCard}>
    <img alt="avatar" className={s.image} src={image} />
    <h4 className={s.title}>
      {name}
      {surname}
    </h4>
    <p className={s.position}>{position}</p>
    <div className={s.remove} />
  </div>
);

export default MemberCard;
