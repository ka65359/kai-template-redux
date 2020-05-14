import { createReducer } from "redux-act";
import { clearAStateProp, setAStateProp } from "store/actions";

const initialState = {
  aStateProp: ""
};

export default createReducer(
  {
    [clearAStateProp]: (state) => {
      let rslt = Object.assign({}, state, {
        aStateProp: initialState.aStateProp
      });
      return rslt;
    },
    [setAStateProp]: (state, payload) => {
      let rslt = Object.assign({}, state, {
        aStateProp: payload
      });
      return rslt;
    }
  },
  initialState
);
