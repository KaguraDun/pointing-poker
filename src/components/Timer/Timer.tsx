/* eslint-disable react-redux/useSelector-prefer-selectors */
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';

import Button from '@/components/Button/Button';
import { RootState } from '@/store';

import gameApi from '../../services/gameApi';
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
  const isTimerStart = useSelector(
    ({ game }: RootState) => game.game.isTimerStart
  );
  const roundTime = useSelector(({ game }: RootState) => game.game.roundTime);

  useEffect(() => {
    if (!isTimerStart) return null;

    const countDown = () => {
      if (roundTime > 0) {
        gameApi.setRoundTime(roundTime - 1);
      } else {
        handleTimerEnd();
      }
    };

    const timer = setTimeout(countDown, 1000);

    return () => {
      clearTimeout(timer);
    };
  }, [roundTime, isTimerStart, handleTimerEnd]);

  const Controls = () => (
    <div>
      {!isTimerStart ? (
        <Button handleClick={() => gameApi.setTimerStart(true)}>Start</Button>
      ) : (
        <Button
          handleClick={() => {
            gameApi.setTimerStart(false);
            gameApi.setRoundTime(durationInSeconds);
          }}
        >
          Reset
        </Button>
      )}
    </div>
  );

  return (
    <div className={s.timer}>
      <div className={s.digits}>{formatTime(roundTime)}</div>

      {showControls ? <Controls /> : null}
    </div>
  );
};

export default Timer;
