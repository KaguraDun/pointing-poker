import React from 'react';

import Crown from '@/icons/crown.svg';
import RemoveIcon from '@/icons/remove.svg';
import { Member, UserRoles } from '@/models/member';

import s from './memberCard.scss';

const MemberCard = ({ image, name, surname, position, ID, role }: Member) => (
  <li key={ID} className={s.memberCard}>
    {role === UserRoles.dealer ? <Crown className={s.dealer} /> : null}

    <img alt="" className={s.image} src={image.image} />
    <div>
      <h4 className={s.title}>
        {name}
        {surname}
      </h4>
      <p className={s.position}>{position}</p>
    </div>
    <RemoveIcon className={s.remove} />
  </li>
);

export default MemberCard;
