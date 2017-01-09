import {AsyncStorage} from 'react-native';
import jwtDecode from 'jwt-decode';


export const saveAuthToken = (token) => {
  console.log('will save');
  const key='token';
  AsyncStorage.setItem(key, token, function (error) {
    if (error) {
      console.log('存储失败');
    } else {
      console.log('succ');
      getAuthToken();
    }
  });
};

export const getAuthToken = () => {
  const key='token';
  AsyncStorage.getItem(key,function(errs,result){
    //TODO:错误处理
    if (!errs) {
      console.log('result = '+result);
    }
  });
};
