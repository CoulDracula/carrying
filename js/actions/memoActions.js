import * as types from "../constants/actionTypes";
import  api from './api';
import {checkHttpStatus, parseJSON} from "../businessLogic/utils";
import {ajaxCallError} from "./ajaxStatusActions";


export const loadPublicMemosSuccess = (publicMemos) => {
  return { type: types.LOAD_PUBLIC_MEMOS_SUCCESS, publicMemos }
};

export const loadPublicMemoSuccess = (publicMemo) => {
  return { type: types.LOAD_PUBLIC_MEMO_SUCCESS, publicMemo }
};
export const updatePublicMemoSuccess = (publicMemo) => {
  return { type: types.UPDATE_PUBLIC_MEMO_SUCCESS, publicMemo }
}

export const loadPublicMemos = () => {
  console.log('load public');
  return dispatch => {
    return api.get(`memos/public`).then(
      json => {
        dispatch(loadPublicMemosSuccess(json));
      }
    );
  }
};

export const loadPublicMemo = (memoId) => {
  return dispatch => {
    return api.get(`memos/public/${memoId}/`).then(
      json => {
        dispatch(loadPublicMemoSuccess(json));
      }
    );
  }
};

export const updatePrivateMemo = (userId, memoId, memo) => {
  return dispatch => {
    if (memoId) {
      return api.patch(`memos/private/${userId}/${memoId}/`, memo).then(
        json => {
          // dispatch(loadMemoSuccess(json));
          // 路由跳转
        }
      );
    }
    else {
      return api.post(`memos/private/${userId}/`, memo).then(
        json => {
          // dispatch(loadMemoSuccess(json));
          //路由跳转
        }
      );
    }

  }
};

export const updatePublicMemo = (memo, memoId) => {
  let formData = {};
  formData.title=memo.title;
  formData.content=memo.content;
  formData.grade=memo.grade;
  formData.date=memo.date;
  formData.author=memo.author;
  console.log(formData);

  return dispatch => {
    if (memoId) {
      return api.patch(`memos/public/${memoId}/`, memo).then(
        json => {
          dispatch(updatePublicMemoSuccess(json));
        }
      );
    }
    else {
      const url = `http://192.168.0.118:8000/api/memos/public/`;
      return fetch(url, {
        method: "POST",
        credentials: 'include',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      })
        .then(checkHttpStatus)
        .then(parseJSON)
        .then((json) => {
        console.log(json);
          dispatch(updatePublicMemoSuccess(json));
        })
        .catch(error => {
          // dispatch(ajaxCallError());
          throw(error);
        });

      // return api.post(`memos/public`, formData).then(
      //   json => {
      //     console.log(json);
      //     // dispatch(updatePublicMemoSuccess(memo));
      //     //路由跳转
      //   }
      // );
    }
  }
};

export const deletePrivateMemo = (userId, memoId) => {
  return dispatch => {
    return api.delete(`memos/private/${userId}/${memoId}/`).then(
      json => {
        // dispatch(loadMemos());
        //路由跳转
      }
    );
  }
};
export const deletePublicMemo = (memoId) => {
  return dispatch => {
    return api.delete(`memos/private/${memoId}/`).then(
      json => {
        // dispatch(loadMemos());
        //路由跳转
      }
    );
  }
};