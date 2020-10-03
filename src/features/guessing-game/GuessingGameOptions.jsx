import { Button } from '@material-ui/core';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { answer, selectOptions } from './GuessingGameSlice';
import styles from './GuessingGame.module.css';

export const GuessingGameOptions = () => {
    const options = useSelector(selectOptions);
    const dispatch = useDispatch();
    return (<div className={styles.optionsContainer}>
        {options.length && <div className={styles.optionsFlexContainer}>
        {options.map(o => <Button key={o.id} className={styles.button} variant="contained" onClick={() => dispatch(answer(o.id))} color="primary">{o.name}</Button>)}
    </div>}
    </div>)
}