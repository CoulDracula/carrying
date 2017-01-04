import {checkHttpStatus, parseJSON} from "../businessLogic/utils";
import {ajaxCallError} from "./ajaxStatusActions";
import {SERVER_URL} from "../constants/config";

class api {
    static  headers() {
        return {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    }

    static  get(route) {
        return this.fetchFunc(route, null, 'GET');
    }

    static  post(route, params) {
        return this.fetchFunc(route, params, 'POST');
    }

    static  delete(route) {
        return this.fetchFunc(route, null, 'DELETE');
    }

    static  patch(route, params) {
        return this.fetchFunc(route, params, 'PATCH');
    }

    static  put(route, parms) {
        return this.fetchFunc(route, parms, 'PUT');
    }

    static fetchFunc(route, params, verb) {
        const host = `${SERVER_URL}`;
        const url = `${host}/api/${route}`;
        let options = Object.assign({method: verb}, params ? {body: JSON.stringify(params)} : null);
        options.header = api.headers();
        return fetch(url, options)
            .then(checkHttpStatus)
            .then(parseJSON)
            .then((json) => {
                return json;
            })
            .catch(error => {
                dispatch(ajaxCallError());
                throw(error);
            });
    }
}
export default  api;