import * as types from "../constants/actionTypes";
import  api from './api';
import {checkHttpStatus, parseJSON} from "../businessLogic/utils";
import {ajaxCallError} from "./ajaxStatusActions";

export const loadPublicMemosSuccess = (publicMemos) => {
  return { type: types.LOAD_PUBLIC_MEMOS_SUCCESS, publicMemos }
};
export const loadPrivateMemosSuccess = (privateMemos) => {
  return { type: types.LOAD_PRIVATE_MEMOS_SUCCESS, privateMemos }
};
export const loadPublicMemoSuccess = (publicMemo) => {
  return { type: types.LOAD_PUBLIC_MEMO_SUCCESS, publicMemo }
};
export const updatePublicMemoSuccess = (publicMemo) => {
  return { type: types.UPDATE_PUBLIC_MEMO_SUCCESS, publicMemo }
};
export const deletePublicMemoSuccess = (_id) => {
  return { type: types.DELETE_PUBLIC_MEMO_SUCCESS, _id }
};

export const loadPublicMemos = () => {
  return dispatch => {
    return api.get(`memos/public`).then(
      json => {
        console.log(json);
        dispatch(loadPublicMemosSuccess(json));
      }
    );
  };
};

export const loadPrivateMemos = () => {
  return dispatch => {
    return api.get(`memos/private`).then(
      json => {
        dispatch(loadPrivateMemosSuccess(json));
      }
    );
  };
};

export const loadPublicMemo = (publicMemo) => {
  // return dispatch => {
  //       dispatch(loadPublicMemoSuccess(publicMemo));
  // }
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
  formData.title = memo.title;
  formData.content = memo.content;
  formData.grade = memo.grade;
  formData.date = memo.date;
  formData.author = memo.author;
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
      return api.post(`memos/public`, formData).then(
        json => {
          console.log(json);
          dispatch(updatePublicMemoSuccess(json));
        }
      );
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

export const deletePublicMemo = (_id) => {
  return dispatch => {
    return api.delete(`memos/public/${_id}/`).then(
      json => {
        dispatch(deletePublicMemoSuccess(_id));
      }
    );
  }
};