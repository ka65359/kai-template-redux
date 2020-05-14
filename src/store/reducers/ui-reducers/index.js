import { combineReducers } from "redux";
import sample from "./sample-reducer";
import tictactoe from "./tictactoe-reducer";

export default combineReducers({
  sample,
  tictactoe
});
