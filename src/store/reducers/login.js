import {LOGIN} from '../type';
import {createReducer} from '../';

const initialState = {
  type: LOGIN.CLEAR,
};

const actionHandler = {
  [LOGIN.IN]: (state, aciton) => {
    return {};
  },
  [LOGIN.CLEAR]: (state, aciton) => {
    return {};
  },
};

export default createReducer(initialState, actionHandler);
