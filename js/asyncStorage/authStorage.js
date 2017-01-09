import {AsyncStorage} from 'react-native';
import jwtDecode from 'jwt-decode';

const key='token';
export const saveAuthToken = (token) => {
  console.log(token);

  const key='token';
   AsyncStorage.setItem(key, token,  (error) =>{
    if (error) {
      console.log('存储失败');
    } else {
      console.log('succ');
    }
  });
};

export const getAuthToken = () => {
  // return AsyncStorage.getItem(key,(errs,result)=>{
  //   if (!errs) {
  //     console.log('result = '+result);
  //     return result;
  //   }
  // });
  return new Promise((resolve,reject)=>{
    AsyncStorage.getItem(key,(error,result)=>{
      if (!error) {
        try {
          resolve(JSON.parse(result));
        } catch (e) {
          reject(error);
        }
      }else {
        reject(error);
      }
    });
  });
};

export const deleteAuthToken=()=>{
  AsyncStorage.removeItem(key,(err)=>{
    console.log('删除成功;');
    if (err) {
      console.log(err);
    }
  });
};