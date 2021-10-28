import React from 'react';

import Crown from '@/icons/crown.svg';
import RemoveIcon from '@/icons/remove.svg';
import { UserRoles } from '@/models/member';
import roomApi from '@/services/roomApi';

import s from './MemberCard.scss';

interface Props {
  id: string;
  image: string;
  name: string;
  surname: string;
  position: string;
  role: string;
  showControls: boolean;
}

const MemberCard = ({
  id,
  image,
  name,
  surname,
  position,
  role,
  showControls,
}: Props) => {
  const handleRemoveUser = () => {
    roomApi.removeUser(id);
  };

  return (
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
        <button
          className={s.buttonRemoveUser}
          onClick={handleRemoveUser}
          type="button"
        >
          <RemoveIcon className={s.remove} />
        </button>
      ) : null}
    </div>
  );
};

export default MemberCard;
