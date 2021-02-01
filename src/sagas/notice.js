import { all, takeLatest, fork, put, call } from "redux-saga/effects";
import axios from "axios";
import { GET_NOTICE_REQUEST, GET_NOTICE_SUCCESS, GET_NOTICE_FAILURE } from "../reducers/notice";

const HEROKU_URL =  "https://secure-waters-04189.herokuapp.com/"; //process.env.REACT_APP_HERO;
function loadNoticesAPI({page=1}) {
  return axios.get(`${HEROKU_URL}notice/upbit`,{
      params:{
          page
      }
  });
}
function* loadNotices(action) {
  try {
    const result = yield call(loadNoticesAPI,action.payload);
    yield put({
      type: GET_NOTICE_SUCCESS,
      payload: result.data,
    });
  } catch (e) {
    yield put({
      type: GET_NOTICE_FAILURE,
      error: e,
    });
  }
}
function* watchLoadNotice() {
  yield takeLatest(GET_NOTICE_REQUEST, loadNotices);
}

export default function* coinSaga() {
  yield all([
    fork(watchLoadNotice),
  ]);
}
