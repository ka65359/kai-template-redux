import { createReducer } from "redux-act";
import {
  clearGameHistory,
  setGameHistory,
  ClearTurnNumber,
  setTurnNumber,
  clearCurrentPlayer,
  setCurrentPlayer
} from "store/actions";
import PLAYER_1 from "../../../../components/TicTacToe";
const initialState = {
  currentPlayer: PLAYER_1 || "X",
  history: [{ squares: [] }],
  turnNumber: 0
};

export default createReducer(
  {
    [clearCurrentPlayer]: (state) => {
      let rslt = Object.assign({}, state, {
        currentPlayer: initialState.currentPlayer
      });
      return rslt;
    },
    [setCurrentPlayer]: (state, payload) => {
      let rslt = Object.assign({}, state, {
        currentPlayer: payload
      });
      return rslt;
    },
    [clearGameHistory]: (state) => {
      let rslt = Object.assign({}, state, {
        history: initialState.history
      });
      return rslt;
    },
    [setGameHistory]: (state, payload) => {
      let rslt = Object.assign({}, state, {
        history: payload
      });
      return rslt;
    },
    [ClearTurnNumber]: (state) => {
      let rslt = Object.assign({}, state, {
        turnNumber: initialState.turnNumber
      });
      return rslt;
    },
    [setTurnNumber]: (state, payload) => {
      let rslt = Object.assign({}, state, {
        turnNumber: payload
      });
      return rslt;
    }
  },
  initialState
);
