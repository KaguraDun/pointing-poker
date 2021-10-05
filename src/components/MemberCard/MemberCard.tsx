import React from 'react';

import Crown from '@/icons/crown.svg';
import RemoveIcon from '@/icons/remove.svg';
import { UserRoles } from '@/models/member';

import s from './MemberCard.scss';

interface Props {
  image: string;
  name: string;
  surname: string;
  position: string;
  role: string;
  showControls: boolean;
}

const MemberCard = ({
  image,
  name,
  surname,
  position,
  role,
  showControls,
}: Props) => (
  <div className={s.memberCard}>
    {role === UserRoles.dealer ? <Crown className={s.dealer} /> : null}

    <img
      alt=""
      className={s.image}
      src={image ? `data:image/png;base64, ${image}` : null}
    />
    <div className={s.infoWrapper}>
      <h4 className={s.title}>{`${name} ${surname}`}</h4>
      <p className={s.position}>{position}</p>
    </div>
    {role !== UserRoles.dealer && showControls ? (
      <RemoveIcon className={s.remove} />
    ) : null}
  </div>
);

export default MemberCard;
