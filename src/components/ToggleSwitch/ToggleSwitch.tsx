import React, { ChangeEvent } from 'react';

import s from './ToggleSwitch.scss';

interface Props {
  name: string;
  isOn: boolean;
  handleToggle: (e: ChangeEvent) => void;
}

const ToggleSwitch = ({ name, isOn, handleToggle }: Props) => (
  <label className={s.label}>
    {name}
    <div className={s.switchLabel}>
      <input
        checked={isOn}
        className={s.switchCheckbox}
        onChange={handleToggle}
        type="checkbox"
      />
      <span className={s.switchInner} />
      <span className={s.switchSwitch} />
    </div>
  </label>
);

export default ToggleSwitch;
