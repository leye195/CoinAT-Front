import { all, takeLatest, fork, put, call } from "redux-saga/effects";
import { getCandles } from 'apis/chart';
import { GET_CHART_DATA_FAILURE, GET_CHART_DATA_REQUEST, GET_CHART_DATA_SUCCESS } from "reducers/trade";

function* loadCandles(action) {
  try {
    const result = yield call(getCandles,action.payload);
    yield put({
      type: GET_CHART_DATA_SUCCESS,
      payload: result.data,
    });
  } catch (e) {
    yield put({
      type: GET_CHART_DATA_FAILURE,
      error: e,
    });
  }
}
function* watchLoadCandle() {
  yield takeLatest(GET_CHART_DATA_REQUEST,loadCandles);
}

export default function* coinSaga() {
  yield all([
    fork(watchLoadCandle),
  ]);
}
