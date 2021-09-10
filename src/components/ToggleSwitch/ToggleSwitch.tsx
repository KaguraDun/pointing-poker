import React from 'react';

import s from './ToggleSwitch.scss';

interface Props {
  id: string;
  name: string;
  isOn: boolean;
  handleToggle: () => void;
}

const ToggleSwitch = ({ id, name, isOn, handleToggle }: Props) => (
  <div className={s.switch}>
    <input
      checked={isOn}
      className={s.switchCheckbox}
      id={id}
      name={name}
      onChange={handleToggle}
      type="checkbox"
    />

    <label className={s.switchLabel} htmlFor={id}>
      <span className={s.switchInner} />
      <span className={s.switchSwitch} />
    </label>
  </div>
);

export default ToggleSwitch;
