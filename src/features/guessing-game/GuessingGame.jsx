import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  initializeLogos, selectGameFinished
} from './GuessingGameSlice';
import styles from './GuessingGame.module.css';
import { GuessingGameLogo } from './GuessingGameLogo';
import { GuessingGameOptions } from './GuessingGameOptions';
import { GuessingGameResults } from './GuessingGameResults';

export function GuessingGame() {
  const dispatch = useDispatch();
  const isGameFinished = useSelector(selectGameFinished);

  useEffect(() => {
    dispatch(initializeLogos())
  }, []);

  return (
    <div>
      {!isGameFinished && <h2>Guess What?</h2>}
      {!isGameFinished && <GuessingGameLogo />}
      {!isGameFinished && <GuessingGameOptions />}
      {isGameFinished && <GuessingGameResults />}
    </div>
  );
}
