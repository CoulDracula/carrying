import type {Action} from '../actions/types';

import * as types from '../constants/actionTypes';
export type State = {
  drawerState: string,
  drawerDisabled: boolean
}

const initialState = {
  memo: null,
  publicMemos: [],
  privateMemos: []
};

export default function (state: State = initialState, action: Action): State {
  switch (action.type) {
    case types.LOAD_PUBLIC_MEMOS_SUCCESS:
      return Object.assign({}, state, { publicMemos: action.publicMemos.results });
    case types.LOAD_PUBLIC_MEMO_SUCCESS:
      return Object.assign({}, state, { publicMemo: action.publicMemo });
    case types.LOAD_PRIVATE_MEMOS_SUCCESS:
      return Object.assign({}, state, { privateMemo: action.privateMemos });
    case types.LOAD_PRIVATE_MEMO_SUCCESS:
      return Object.assign({}, state, { privateMemo: action.privateMemo });
    case types.UPDATE_PUBLIC_MEMO_SUCCESS:
      return Object.assign({}, state, {
        publicMemos: [
          ...state.publicMemos.filter(publicMemo => publicMemo._id !== action.publicMemo._id),
          action.publicMemo
        ]
      });
    default:
      return state;
  }
}


