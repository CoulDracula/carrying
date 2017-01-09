import jwtDecode from 'jwt-decode';

import {SERVER_URL} from '../constants/config';
import {checkHttpStatus, parseJSON} from '../businessLogic/utils';
import {beginAjaxCall, ajaxCallError} from './ajaxStatusActions';

import * as types  from '../constants/actionTypes';
import {saveAuthToken, getAuthToken} from '../asyncStorage/authStorage';
import * as strings from '../constants/strings';

export const fetchPersonInfoSuccess = (person) => {
  return { type: types.LOAD_PERSON_INFO, payload: { person } };
};

export function authLoginUserSuccess (token) {
   // saveAuthToken(token).then(
   //  () => {
   //    getAuthToken();
   //  });
  return {
    type: types.AUTH_LOGIN_USER_SUCCESS, payload: { token }
  };
}

export function authLoginUserFailure (error) {
  // add user info to asyncStorage
  return {
    type: types.AUTH_LOGIN_USER_FAILURE,
    payload: {
      status: error.response.status,
      statusText: error.response.statusText
    }
  };
}

export function authLoginUserRequest () {
  return {
    type: types.AUTH_LOGIN_USER_REQUEST
  };
}

export function authLogoutSuccess () {
  // delete user info from asyncStorage
  return { type: types.AUTH_LOGOUT_USER };
}

export function authLogout () {
  return (dispatch) => {
    dispatch(authLogoutSuccess());
    return Promise.resolve(); // TOOD: we need promise here because of tests, find a better way
  };
}

export const fetchPersonInfo = (username, token) => {
  console.log('get persons message');
  return dispatch => {
    dispatch(beginAjaxCall());
    return fetch(`http://10.0.105.68:8000/api/v1/persons/${username}/`, {
      method: 'GET',
      // credentials: 'include',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        Authorization: `JWT ${token}`
      }
    })
      .then(checkHttpStatus)
      .then(parseJSON)
      .then(response => {
        console.log('user information');
        console.log(response);
        dispatch(fetchPersonInfoSuccess(response));
      })
      .catch(error => {
        dispatch(ajaxCallError());
        throw(error);
      });
  };
};

export function authLoginUser (username, password) {
  return (dispatch) => {
    dispatch(authLoginUserRequest());
    return fetch('http://10.0.105.68:8000/api/v1/accounts/login/', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username, password })
    })
      .then(checkHttpStatus)
      .then(parseJSON)
      .then(response => {
        try {
          console.log(jwtDecode(response.token));
          dispatch(authLoginUserSuccess(response.token));
          dispatch(fetchPersonInfo(username, response.token));
        } catch (e) {
          console.log(e);
          dispatch(authLoginUserFailure({
            response: {
              status: 403,
              statusText: 'Invalid token'
            }
          }));
          return strings.WRONG_USERNAME_PASSWORD_MESSAGE;
        }
      })
      .catch(error => {
        console.log('error');
        // dispatch(authLoginUserFailure(error));
        return strings.WRONG_USERNAME_PASSWORD_MESSAGE;
      });
  };
}
