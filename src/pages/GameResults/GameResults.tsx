/* eslint-disable react-redux/useSelector-prefer-selectors */
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import XLSX from 'xlsx';

import Button from '@/components/Button/Button';
import CardResult from '@/components/Card/CardResult';
import GameResult from '@/images/gameResult.svg';
import gameApi from '@/services/gameApi';
import roomApi from '@/services/roomApi';
import { RootState } from '@/store';

import s from './GameResults.scss';
import IssueCard from '@/components/IssueCard/IssueCard';
import Result from '@/components/Result/Result';

function GameResults() {
  const roomData = useSelector(({ room }: RootState) => room.room);

  const isGameEnded = useSelector(({ game }: RootState) => game?.game?.isEnded);

  useEffect(() => {
    if (!Object.keys(roomData).length) {
      roomApi.restoreDataFromServer();
    }
  }, [roomData]);

  // https://stackoverflow.com/questions/66918023/how-to-convert-and-download-csv-to-xlsx-on-front-end-ts-react
  const saveFile = (fileName: string) => {
    const data = gameApi.prepareDataToSave();
    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'game results');
    XLSX.writeFile(wb, fileName);
  };

  const handleSaveAsCSV = () => {
    saveFile(`Game results.csv`);
  };

  const handleSaveAsXLSX = () => {
    saveFile(`Game results.xlsx`);
  };

  const Results = () => (
    <div className={s.gameResult}>
      <div className={s.title}>
        <GameResult />
      </div>
      <div className={s.buttons}>
        <Button handleClick={handleSaveAsCSV}>Download as .csv</Button>
        <Button handleClick={handleSaveAsXLSX}>Download as .xlsx</Button>
      </div>

      <Result />
      <div className={s.buttons}>
        <Button handleClick={handleSaveAsCSV}>Download as .csv</Button>
        <Button handleClick={handleSaveAsXLSX}>Download as .xlsx</Button>
      </div>
    </div>
  );

  const Error = () => <div className=""> GAME NOT ENDED YET!</div>;

  return (
    <div className={s.gameResults}>{isGameEnded ? <Results /> : <Error />}</div>
  );
}

export default GameResults;
