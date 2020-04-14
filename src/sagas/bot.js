import {
  all,
  takeEvery,
  takeLatest,
  fork,
  put,
  call,
  delay,
  throttle,
} from "redux-saga/effects";
import axios from "axios";
import {
  SEND_MESSAGE_REQUEST,
  SEND_MESSAGE_FAILURE,
  SEND_MESSAGE_SUCCESS,
} from "../reducers/bot";

function sendMessageAPI(data) {
  return axios.post("http://localhost:8989/bot", data);
}
function* sendMessage(action) {
  try {
    const result = yield call(sendMessageAPI, action.payload);
    yield put({
      type: SEND_MESSAGE_SUCCESS,
      payload: result.data,
    });
  } catch (e) {
    yield put({
      type: SEND_MESSAGE_FAILURE,
      error: e,
    });
  }
}
function* watchSendMessage() {
  yield takeLatest(SEND_MESSAGE_REQUEST, sendMessage);
}
export default function* botSaga() {
  yield all([fork(watchSendMessage)]);
}
