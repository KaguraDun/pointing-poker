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

interface Props {
  handleClick?: () => void;
  variant?: 'primary' | 'additional';
  size?: 'small' | 'medium' | 'big';
  linkTo?: string;
  children: React.ReactNode;
}

function Button({
  variant = ButtonStyles.primary,
  size = ButtonSizes.medium,
  handleClick,
  linkTo = null,
  children,
}: Props) {
  const styles = [s.button, s[variant], s[size]].join(' ');

  if (linkTo) {
    return (
      <Link className={styles} to={linkTo}>
        {children}
      </Link>
    );
  }

  return (
    <button className={styles} onClick={() => handleClick()} type="button">
      {children}
    </button>
  );
}

export default Button;
