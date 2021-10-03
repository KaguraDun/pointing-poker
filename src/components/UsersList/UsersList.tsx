import React from 'react';
import { useSelector } from 'react-redux';

import { RootState } from '@/store';

import MemberCard from '../MemberCard/MemberCard';
import s from './UsersList.scss';

/* eslint-disable react-redux/useSelector-prefer-selectors */

const UsersList = () => {
  const users = useSelector(({ room }: RootState) => room.room.users);
  if (users) {
    const usersList = Object.values(users).map((values) => (
      <MemberCard
        key={values.ID}
        image={values.image}
        name={values.name}
        position={values.position}
        role={values.role}
        surname={values.surname}
      />
    ));
    return <ul className={s.userslist}>{usersList}</ul>;
  }
  return <p>No users</p>;
};

export default UsersList;
