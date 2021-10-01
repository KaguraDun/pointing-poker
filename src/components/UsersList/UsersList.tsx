import React from 'react';
import { useSelector } from 'react-redux';

import { UserRoles } from '@/models/member';
import { RootState } from '@/store';

import MemberCard from '../MemberCard/MemberCard';
import s from './UsersList.scss';

/* eslint-disable react-redux/useSelector-prefer-selectors */

const UsersList = () => {
  const users = useSelector(({ room }: RootState) => room.room.users);
  if (users) {
    const usersList = Object.values(users).map((values) => (
      <MemberCard
        image={values.image}
        name={values.name}
        position={values.position}
        role={UserRoles.dealer}
        surname={values.surname}
        key={values.ID}
      />
    ));
    return <div className={s.userslist}>{usersList}</div>;
  }
  return 'Error';
};

export default UsersList;
