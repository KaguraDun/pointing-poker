import React from 'react';
import { useSelector } from 'react-redux';

import { RootState } from '@/store';

import MemberCard from '../MemberCard/MemberCard';
import s from './UsersList.scss';

/* eslint-disable react-redux/useSelector-prefer-selectors */

const UsersList = () => {
  const users = useSelector(({ room }: RootState) => room.room.users);
  const owner = useSelector(({ room }: RootState) => room.room.owner);
  const currentUser = useSelector(({ room }: RootState) => room.userID);
  const isOwner = owner === currentUser;

  if (users) {
    const usersList = Object.values(users).map((values) => (
      <li key={values.ID}>
        <MemberCard
          id={values.ID}
          image={values.image}
          name={values.name}
          position={values.position}
          role={values.role}
          showControls={isOwner}
          surname={values.surname}
        />
      </li>
    ));
    return <ul className={s.usersList}>{usersList}</ul>;
  }
  return <p>No users</p>;
};

export default UsersList;
