import React from 'react';
import { useSelector } from 'react-redux';
import { selectCurrentLogo } from './GuessingGameSlice';

export const GuessingGameLogo = () => {
    const currentLogo = useSelector(selectCurrentLogo);
    return (<div className="">{currentLogo.name && <img src={"logos/" + currentLogo.name.toLowerCase() + ".png"} alt="Guess this logo" style={{width: '100px', height:'100px'}} />}</div>)
}