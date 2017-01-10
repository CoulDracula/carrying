import {AsyncStorage} from 'react-native';
import jwtDecode from 'jwt-decode';

const key = 'token';
export const saveAuthToken = (token) => {
  const key = 'token';
  AsyncStorage.setItem(key, token, (error) => {
    if (error) {
      console.log('存储失败');
    } else {
      console.log('succ');
    }
  });
};

export const getAuthToken = () => {
  AsyncStorage.getItem(key, (errs, result) => {
    if (!errs) {
      return result;
    }
  });
};


export const deleteAuthToken = () => {
  AsyncStorage.removeItem(key, (err) => {
    console.log('删除成功;');
    if (err) {
      console.log(err);
    }
  });
};