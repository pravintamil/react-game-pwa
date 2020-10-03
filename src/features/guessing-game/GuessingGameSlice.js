import { createSlice } from '@reduxjs/toolkit';
import api from '../../app/api';
import playSound from '../../app/sound';

const restartGameFn = state => {
  state.gameFinished = false
  state.startTime = Date.now()
  state.endTime = 0
  state.logos = api.generateIDs(api.shuffle(JSON.parse(JSON.stringify(state.tempLogos))));
  state.amount = state.logos.length;
  state.answerCount = 0;
  state.currentLogo = state.logos[0];
  state.previousLogo = {};
  state.options = api.getAnswerOptions(state.logos, state.amount, state.currentLogo.id);
}

export const guessingGameSlice = createSlice({
  name: 'guessingGame',
  initialState: {
    value: 0,
    logos: [],
    tempLogos: [],
    answerCount: 0,
    amount: 0,
    currentLogo: {},
    previousLogo: {},
    options: [],
    gameFinished: false,
    startTime: Date.now(),
    endTime: 0,
    highScores: [],
  },
  reducers: {
    restartGame: restartGameFn,
    answer: (state, action) => {
      if(action.payload === state.currentLogo.id){
        state.answerCount += 1;
        if(state.amount !== state.answerCount){
          state.previousLogo = state.currentLogo;
          state.currentLogo = state.logos[state.answerCount];
          state.options = api.getAnswerOptions(state.logos, state.amount, state.currentLogo.id, state.previousLogo.id);
          playSound('correct');
          return state;
        }
        playSound('game-end');
      }else{
        playSound('wrong');
      }
      state.gameFinished = true
      state.endTime = Date.now()
    },
    setTempLogos: (state, action) => {
      state.tempLogos = action.payload || [];
      restartGameFn(state);
    }
  },
});

export const { restartGame, answer } = guessingGameSlice.actions;

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched
export const initializeLogos = () => dispatch => {
    api.getJSON('/logos.json', (error, tempLogos) => {
      if (typeof tempLogos === 'string') { // IE11 fix
        tempLogos = JSON.parse(tempLogos)
      }

      if (error) {
        // Fetch from localStorage
        tempLogos = JSON.parse(window.localStorage.getItem('logos'))
      } else {
        // Update localStorage
        // window.jsTools = JSON.parse(JSON.stringify(tempLogos)) try to get rid of this
        window.localStorage.setItem('logos', JSON.stringify(tempLogos))
      }
      tempLogos.forEach(logo => {
        logo.url = "/logos/" + logo.name.toLowerCase() + ".png";
        const imageEl = new Image();
        imageEl.onload = function(){
          imageEl.remove();
        }
        imageEl.src = logo.url;
      });
      dispatch(guessingGameSlice.actions.setTempLogos(tempLogos));
    });
};

export const selectCurrentLogo = state => state.guessingGame.currentLogo;
export const selectOptions = state => state.guessingGame.options;
export const selectAnswerCount = state => state.guessingGame.answerCount;
export const selectGuessCount = state => state.guessingGame.amount;
export const selectGameFinished = state => state.guessingGame.gameFinished;

export default guessingGameSlice.reducer;
