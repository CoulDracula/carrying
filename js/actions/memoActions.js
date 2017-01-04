import * as types from "../constants/actionTypes";
import  api from './api';

export const loadPublicMemosSuccess = (publicMemos) => {
  return {type: types.LOAD_PUBLIC_MEMOS_SUCCESS, publicMemos}
};

export const loadPublicMemoSuccess = (publicMemo) => {
  return {type: types.LOAD_PUBLIC_MEMO_SUCCESS, publicMemo}
};

export const loadPublicMemos = () => {
  console.log('load public');
  return dispatch=> {
    return api.get(`memos/public`).then(
      json=> {
        console.log(json);
        dispatch(loadPublicMemosSuccess(json));
      }
    );
  }
};

export const loadPublicMemo = (memoId) => {
  return dispatch=> {
    return api.get(`memos/public/${memoId}/`).then(
      json=> {
        dispatch(loadPublicMemoSuccess(json));
      }
    );
  }
};


export const editPrivateMemo = (userId, memoId, memo) => {
  return dispatch=> {
    if (memoId) {
      return api.patch(`memos/private/${userId}/${memoId}/`, memo).then(
        json=> {
          // dispatch(loadMemoSuccess(json));
          // 路由跳转
        }
      );
    }
    else {
      return api.post(`memos/private/${userId}/`, memo).then(
        json=> {
          // dispatch(loadMemoSuccess(json));
          //路由跳转
        }
      );
    }

  }
};
export const editPublicMemo = (memoId, memo) => {
  return dispatch=> {
    if (memoId) {
      return api.patch(`memos/public/${memoId}/`, memo).then(
        json=> {
          // dispatch(loadMemoSuccess(json));
          // 路由跳转
        }
      );
    }
    else {
      return api.post(`memos/public/`, memo).then(
        json=> {
          // dispatch(loadMemoSuccess(json));
          //路由跳转
        }
      );
    }

  }
};

export const deletePrivateMemo = (userId, memoId) => {
  return dispatch=> {
    return api.delete(`memos/private/${userId}/${memoId}/`).then(
      json=> {
        // dispatch(loadMemos());
        //路由跳转
      }
    );
  }
};
export const deletePublicMemo = (memoId) => {
  return dispatch=> {
    return api.delete(`memos/private/${memoId}/`).then(
      json=> {
        // dispatch(loadMemos());
        //路由跳转
      }
    );
  }
};