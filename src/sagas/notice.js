import { all, takeLatest, fork, put, call } from "redux-saga/effects";
import axios from "axios";
import { GET_NOTICE_REQUEST, GET_NOTICE_SUCCESS, GET_NOTICE_FAILURE } from "../reducers/notice";

const BASE_URL =  process.env.NODE_ENV !=='production'?'http://localhost:4500/':"https://secure-waters-04189.herokuapp.com/"; //process.env.REACT_APP_HERO;

function loadNoticesAPI({page=1,type="notice"}) {
  return type==="notice"?axios.get(`${BASE_URL}notice/upbit`,{
      params:{
        page
      }
  }): axios.get(`https://project-team.upbit.com/api/v1/disclosure?region=kr&per_page=${12*page}`);
}
function* loadNotices(action) {
  try {
    const {type,page} = action.payload;
    const {data} = yield call(loadNoticesAPI,action.payload);
    const notices = type==="notice"? data.notices.map((notice)=>notice):data.data.posts.map((post)=>({title:post.text,updatedAt:post.start_date}));  
    type==="notice"?    
      yield put({
        type: GET_NOTICE_SUCCESS,
        payload: {notices,more:page<data.totalPage?true:false, page, type},
      }) : 
      yield put({
        type: GET_NOTICE_SUCCESS,
        payload: {notices,more: data.data.more, page, type}
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
