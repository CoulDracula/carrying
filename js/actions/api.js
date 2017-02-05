import {checkHttpStatus, parseJSON} from "../businessLogic/utils";
import {ajaxCallError} from "./ajaxStatusActions";
import {SERVER_URL, Authorization} from "../constants/config";
import {getAuthToken} from '../asyncStorage/authStorage';

class api {
  static  headers () {
    const token = getAuthToken();
    console.log('ttttt');
    console.log(token);
      return {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'x-access-token': 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ6aGFuZ3NhbiIsImV4cCI6MTQ4NjM1NzcwMzgwMH0.UG3_RscpfvefGP2mzLfup-dVRlvpqaVvskWLB5_kzBY'
      }
  }

  static  get (route) {
    return this.fetchFunc(route, null, 'GET');
  }

  static  post (route, params) {
    return this.fetchFunc(route, params, 'POST');
  }

  static  delete (route) {
    return this.fetchFunc(route, null, 'DELETE');
  }

  static  patch (route, params) {
    return this.fetchFunc(route, params, 'PATCH');
  }

  // static  put (route, parms) {
  //   return this.fetchFunc(route, parms, 'PUT');
  // }

  static fetchFunc (route, params, verb) {
    const url = `${SERVER_URL}/api/${route}`;
    let options = Object.assign({ method: verb }, params ? { body: JSON.stringify(params) } : null);
    options.headers= api.headers();
    return fetch(url, options)
      .then(checkHttpStatus)
      .then(parseJSON)
      .then((json) => {
        return json;
      })
      .catch(error => {
        // dispatch(ajaxCallError());
        throw(error);
      });
  }
}
export default  api;