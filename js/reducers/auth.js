import jwtDecode from 'jwt-decode';

import type {Action} from '../actions/types';
import {createReducer} from '../businessLogic/utils';
import * as types from '../constants/actionTypes';

export type State = {
}

const initialState = {
  token: null,
  username: "",
  person: {},
  isAuthenticated: false,
  isAuthenticating: false,
  statusText: null
};

export default function (state: State = initialState, action: Action): State {
  switch (action.type) {

    case types.LOAD_PERSON_INFO:
      return Object.assign({}, state, {
        person: action.payload.person
      });
    case types.AUTH_LOGOUT_USER:
      return Object.assign({}, state, {
      isAuthenticated: false,
      token: null,
      username: null,
      statusText: 'You have been successfully logged out.'
    });
    case types.AUTH_LOGIN_USER_SUCCESS:
      return Object.assign({}, state, {
        isAuthenticating: false,
        isAuthenticated: true,
        token: action.payload.token,
        username: jwtDecode(action.payload.token).username,
        statusText: 'You have been successfully logged in.'
      });
    case types.AUTH_LOGIN_USER_REQUEST:
      return Object.assign({}, state, {
        isAuthenticating: true,
        statusText: null
      });

    case types.AUTH_LOGIN_USER_FAILURE:
      return Object.assign({}, state, {
        isAuthenticating: false,
        isAuthenticated: false,
        token: null,
        username: null,
        statusText: `Authentication Error: ${action.payload.status} ${action.payload.statusText}`
      });

    default:
      return state;
  }
}
