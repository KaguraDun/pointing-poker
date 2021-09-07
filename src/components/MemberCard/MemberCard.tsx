import 'memberCard.scss';

import React from 'react';

import { Member } from '@/models/interfaces';

const MemberCard = ({ image, name, surname, position }: Member) => (
  <div className="member-card">
    <img alt="avatar" src={image} />
    <h4>
      {name}
      {surname}
    </h4>
    <p>{position}</p>
    <div className="member-card__remove" />
  </div>
);

export default MemberCard;
