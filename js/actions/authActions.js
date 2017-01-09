import jwtDecode from 'jwt-decode';
import api from './api';
import {SERVER_URL} from '../constants/config';
import {checkHttpStatus, parseJSON} from '../businessLogic/utils';
import {beginAjaxCall, ajaxCallError} from './ajaxStatusActions';

import * as types  from '../constants/actionTypes';
import * as token from '../asyncStorage/authStorage';
import * as strings from '../constants/strings';

export const fetchPersonInfoSuccess = (person) => {
  return { type: types.LOAD_PERSON_INFO, payload: { person } };
};

export function authLoginUserSuccess (token) {
  return { type: types.AUTH_LOGIN_USER_SUCCESS, payload: { token } };
}

export function authLoginUserRequest () {
  return { type: types.AUTH_LOGIN_USER_REQUEST };
}

export function authLogoutSuccess () {
  return { type: types.AUTH_LOGOUT_USER };
}

export function authLoginUserFailure (error) {
  // add user info to asyncStorage
  return {
    type: types.AUTH_LOGIN_USER_FAILURE, payload: {
      status: error.response.status,
      statusText: error.response.statusText
    }
  };
}

export function authLogout () {
  return (dispatch) => {
    dispatch(authLogoutSuccess());
    token.deleteAuthToken();
  };
}

export const fetchPersonInfo = (username, token) => {
  console.log('get persons message');
  return dispatch => {
    return api.get().then(
      json => {
        console.log('user information');
        console.log(json);
        dispatch(fetchPersonInfoSuccess(json));
      }
    )
  };
};

export function authLoginUser (username, password) {
  return (dispatch) => {
    return api.post('auth', { username, password }).then(
      json => {
        token.saveAuthToken(json.token);
        dispatch(authLoginUserSuccess(json.token));
        // dispatch(fetchPersonInfo(json.token));
      }
    );
  };
}
