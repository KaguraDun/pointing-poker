/* eslint-disable react-redux/useSelector-prefer-selectors */
import { Parser } from 'json2csv';
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';

import Button from '@/components/Button/Button';
import gameApi from '@/services/gameApi';
import roomApi from '@/services/roomApi';
import { RootState } from '@/store';

import s from './GameResults.scss';

function GameResults() {
  const roomData = useSelector(({ room }: RootState) => room.room);
  const roundHistory = useSelector(
    ({ game }: RootState) => game?.game?.roundHistory
  );
  const isGameEnded = useSelector(({ game }: RootState) => game?.game?.isEnded);

  useEffect(() => {
    if (!Object.keys(roomData).length) {
      roomApi.restoreDataFromServer();
    }
  }, [roomData]);

  const prepareDataToSave = () => {
    if (roundHistory) {
      const users = Object.values(roomData.users).map(
        (user) => `${user.name} ${user.surname}`
      );

      const data = Object.entries(roundHistory).map(([key, values]) => {
        const { title } = roomData.issues[key];
        const score = roundHistory[key].averageScore;
        const userScores = {};
        Object.values(values.roundData).forEach((user, index) => {
          userScores[users[index]] = user.score;
        });
        console.log(userScores);
        return { title, average: score, ...userScores };
      });

      const fields = ['title', 'average', ...users];

      const json2csvParser = new Parser({ fields });
      const csv = json2csvParser.parse(data);

      return csv;
    }
    return [];
  };

  const handleSaveAsCSV = () => {
    const data = prepareDataToSave();
    const blob = new Blob([data], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `Game result.csv`);

    // Append to html link element page
    document.body.appendChild(link);

    // Start download
    link.click();

    // Clean up and remove the link
    link.parentNode.removeChild(link);
    // gameApi.saveGameResultAsCSV();
    // console.log('result', roundHistory);
  };

  const Results = () => (
    <div className="">
      GAME RESULTS
      <Button handleClick={handleSaveAsCSV}>Download as .csv</Button>
      <Button handleClick={handleSaveAsCSV}>Download as .xlsx</Button>
    </div>
  );

  const Error = () => <div className=""> GAME NOT ENDED YET!</div>;

  return (
    <div className={s.gameResults}>{isGameEnded ? <Results /> : <Error />}</div>
  );
}

export default GameResults;
