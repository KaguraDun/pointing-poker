import React from 'react';

import style from './Dropdown.scss';

interface DropdownProps {
  options: any;
  label: string;
  handleOnChange: (e: React.ChangeEvent) => void;
  defaultValue?: any;
}

interface Option {
  value: string;
  name: string;
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
      {options.map((option: Option) => (
        <option key={`${label}-${option.value}`} value={String(option.value)}>
          {option.name}
        </option>
      ))}
    </select>
  </label>
);

export default Dropdown;
