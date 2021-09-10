import React from 'react';

import s from './ToggleSwitch.scss';

interface Props {
  id: string;
  name: string;
}

const ToggleSwitch = ({ id, name }: Props) => (
  <div className={s.switch}>
    <input
      className={s.switchCheckbox}
      id={id}
      name={name}
      onChange={(e) => e.target.checked}
      type="checkbox"
    />

    <label className={s.switchLabel} htmlFor={id}>
      <span className={s.switchInner} />
      <span className={s.switchSwitch} />
    </label>
  </div>
);

export default ToggleSwitch;
