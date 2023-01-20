import { all, takeLatest, fork, put, call } from "redux-saga/effects";
import { herokuApi } from "apis";
import {
  SEND_MESSAGE_REQUEST,
  SEND_MESSAGE_FAILURE,
  SEND_MESSAGE_SUCCESS,
  CANCEL_MESSAGE_SUCCESS,
  CANCEL_MESSAGE_FAILURE,
  CANCEL_MESSAGE_REQUEST,
} from "../reducers/bot";

function sendMessageAPI(data) {
  return herokuApi.post("bot/start", data);
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

function cancelMessageAPI(data) {
  return herokuApi.post("bot/cancel", data);
}
function* cancelMessage(action) {
  try {
    yield call(cancelMessageAPI, action.payload);
    yield put({
      type: CANCEL_MESSAGE_SUCCESS,
    });
  } catch (e) {
    yield put({
      type: CANCEL_MESSAGE_FAILURE,
      error: e,
    });
  }
}
function* watchCancelMessage() {
  yield takeLatest(CANCEL_MESSAGE_REQUEST, cancelMessage);
}

export default function* botSaga() {
  yield all([fork(watchSendMessage), fork(watchCancelMessage)]);
}
