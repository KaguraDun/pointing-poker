import React from 'react';

import RemoveIcon from '@/icons/remove.svg';
import { Member } from '@/models/member';

import s from './memberCard.scss';

const MemberCard = ({ image, name, surname, position, ID }: Member) => (
  <div className={s.memberCard} key={ID}>
    <img alt="avatar" className={s.image} src={image.image} />
    <div>
      <h4 className={s.title}>
        {name}
        {surname}
      </h4>
      <p className={s.position}>{position}</p>
    </div>
    <RemoveIcon className={s.remove} />
  </div>
);

export default MemberCard;
