import * as types from '../constants/actionTypes';
import Storage from 'react-native-storage';
import {AsyncStorage} from 'react-native';
import jwtDecode from 'jwt-decode';
// import storage from '../setup';

const storage = new Storage({
  size: 1000,
  storageBackend: AsyncStorage,
  defaultExpires: 1000 * 3600 * 24,
  enableCache: true,
});
// global.storage = storage;

export const saveAuthToken = (token) => {
  console.log('will save');
  storage.save({
    key: 'token',  // 注意:请不要在key中使用_下划线符号!
    rawData: {
      token: token
    },
    expires: null
  });
  console.log(' save succ');
};

export const getAuthToken = () => {
  storage.load({
    key: 'token',
    autoSync: true,
    syncInBackground: true
  })
         .then(ret => {
           console.log(ret.token);
           return ret.token;
         })
         .catch(err => {
           console.warn(err.message);
           switch (err.name) {
             case 'NotFoundError':
               // TODO;
               break;
             case 'ExpiredError':
               // TODO
               break;
           }
         })
};
