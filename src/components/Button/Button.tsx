/* eslint-disable react/button-has-type */
import cn from 'classnames';
import React from 'react';
import { Link } from 'react-router-dom';

import s from './Button.scss';

enum ButtonStyles {
  primary = 'primary',
  additional = 'additional',
}

enum ButtonSizes {
  small = 'small',
  medium = 'medium',
  big = 'big',
}

enum ButtonTypes {
  button = 'button',
  submit = 'submit',
}

interface Props {
  handleClick?: () => void;
  variant?: 'primary' | 'additional';
  size?: 'small' | 'medium' | 'big';
  linkTo?: string;
  type?: 'button' | 'submit';
  children?: React.ReactNode;
}

function Button({
  variant = ButtonStyles.primary,
  size = ButtonSizes.medium,
  handleClick,
  linkTo = null,
  type = ButtonTypes.button,
  children = null,
}: Props) {
  const styles = cn(s.button, s[variant], s[size]);

  if (linkTo) {
    return (
      <Link className={styles} to={linkTo}>
        {children}
      </Link>
    );
  }

  return (
    <button className={styles} onClick={() => handleClick()} type={type}>
      {children}
    </button>
  );
}

export default Button;
