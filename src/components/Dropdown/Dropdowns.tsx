import React from 'react';

import style from './Dropdown.scss';

interface DropdownProps {
  options: any;
  label: string;
  handleOnChange: (e: React.ChangeEvent) => void;
  defaultValue?: any;
}

const Dropdown = ({
  options,
  label,
  handleOnChange,
  defaultValue,
}: DropdownProps) => (
  <label className={style.label}>
    {label}
    <select
      className={style.dropdown}
      name={label}
      onChange={handleOnChange}
      value={defaultValue}
    >
      {Object.values(options).map((option) => (
        <option key={`${label}-${option}`} value={String(option)}>
          {option}
        </option>
      ))}
    </select>
  </label>
);

export default Dropdown;
