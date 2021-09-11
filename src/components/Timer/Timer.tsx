import React, { useEffect, useState } from 'react';

import Button from '@/components/Button/Button';

import s from './Timer.scss';

interface Props {
  durationInSeconds: number;
  handleTimerEnd: () => void;
  showControls: boolean;
}

const formatDigit = (digit: number) =>
  digit < 10 && digit >= 0 ? `0${digit}` : digit;

const formatTime = (seconds: number) => {
  const minutes = Math.floor(seconds / 60);
  const restSeconds = seconds % 60;

  return `${formatDigit(minutes)} : ${formatDigit(restSeconds)}`;
};

const Timer = ({ durationInSeconds, handleTimerEnd, showControls }: Props) => {
  const [start, setStart] = useState(false);
  const [time, setTime] = useState(durationInSeconds);

  useEffect(() => {
    setTime(durationInSeconds);
  }, [durationInSeconds]);

  useEffect(() => {
    if (!start) return null;

    const countDown = () => {
      if (time > 0) {
        setTime((seconds) => seconds - 1);
      } else {
        handleTimerEnd();
      }
    };

    const timer = setTimeout(countDown, 1000);

    return () => {
      clearTimeout(timer);
    };
  }, [time, start, handleTimerEnd]);

  const Controls = () => (
    <div>
      {!start ? (
        <Button handleClick={() => setStart(true)}>Start</Button>
      ) : (
        <Button
          handleClick={() => {
            setStart(false);
            setTime(durationInSeconds);
          }}
        >
          Reset
        </Button>
      )}
    </div>
  );

  return (
    <div className={s.timer}>
      <div className={s.digits}>{formatTime(time)}</div>

      {showControls ? <Controls /> : null}
    </div>
  );
};

export default Timer;
