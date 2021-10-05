import React from 'react';

import Crown from '@/icons/crown.svg';
import RemoveIcon from '@/icons/remove.svg';
import { ENDPOINT_SERVER } from '@/models/constants';
import { Member, UserRoles } from '@/models/member';

import s from './MemberCard.scss';

const MemberCard = ({ image, name, surname, position, role }: Member) => (
  <div className={s.memberCard}>
    {role === UserRoles.dealer ? <Crown className={s.dealer} /> : null}

    <img
      alt=""
      className={s.image}
      src={image ? ENDPOINT_SERVER + image : null}
    />
    <div className={s.infoWrapper}>
      <h4 className={s.title}>{`${name} ${surname}`}</h4>
      <p className={s.position}>{position}</p>
    </div>
    {role !== UserRoles.dealer ? <RemoveIcon className={s.remove} /> : null}
  </div>
);

export default MemberCard;
