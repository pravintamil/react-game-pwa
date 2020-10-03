import { configureStore } from '@reduxjs/toolkit';
import GuessingGameReducer from '../features/guessing-game/GuessingGameSlice';

export default configureStore({
  reducer: {
    guessingGame: GuessingGameReducer,
  },
});
