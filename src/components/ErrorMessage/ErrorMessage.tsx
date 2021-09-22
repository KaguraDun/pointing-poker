import React from 'react';

import s from './ErrorMessage.scss';

interface ErrorMessageProps {
  text: string;
}

const ErrorMessage = ({ text }: ErrorMessageProps) => (
  <div className={s.text}>{text}</div>
);

export default ErrorMessage;
