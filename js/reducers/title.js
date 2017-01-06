import type {Action} from '../actions/types';
import * as types from '../constants/actionTypes';

const initialState = '';

export default function (state: State = initialState, action: Action): State {
  // switch (action.type) {
  //   case types.SET_TITLE:
  //     return action.title ;
  //   default:
  //     return state;
  // }

  if (action.type === types.SET_TITLE) {
    return  action.title;
  }
  return state;
}
