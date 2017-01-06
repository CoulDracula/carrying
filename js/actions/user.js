import * as types from "../constants/actionTypes";
import type {Action} from './types';

export function setUser (user: string): Action {
  return {
    type: types.SET_USER,
    payload: user,
  };
}
export const setTitle = (title: String) => {
  return { type: types.SET_TITLE, title }
};
