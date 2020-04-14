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
import {
  UPBIT_BITCOIN_KRW_SUCCESS,
  UPBIT_BITCOIN_KRW_FAILURE,
  UPBIT_BITCOIN_KRW_REQUEST,
  CURRENCY_REQUEST,
  CURRENCY_FAILURE,
  CURRENCY_SUCCESS,
  BINANCE_BITCOIN_USDT_REQUEST,
  BINANCE_BITCOIN_USDT_FAILURE,
  BINANCE_BITCOIN_USDT_SUCCESS,
  UPBIT_BTC_NEWLISTING_REQUEST,
  UPBIT_BTC_NEWLISTING_SUCCESS,
  UPBIT_BTC_NEWLISTING_FAILURE,
  BINANCE_NEWLISTING_REQUEST,
  BINANCE_NEWLISTING_SUCCESS,
  BINANCE_NEWLISTING_FAILURE,
} from "../reducers/coin";
import axios from "axios";
function loadBitKrwAPI() {
  return axios.get("https://api.upbit.com/v1/ticker?markets=KRW-BTC");
}
function* loadBitKrw(action) {
  try {
    const result = yield call(loadBitKrwAPI, action.payload);
    yield put({
      type: UPBIT_BITCOIN_KRW_SUCCESS,
      payload: result.data,
    });
  } catch (e) {
    yield put({
      type: UPBIT_BITCOIN_KRW_FAILURE,
      error: e,
    });
  }
}
function* watchBitKrw() {
  yield takeLatest(UPBIT_BITCOIN_KRW_REQUEST, loadBitKrw);
}

function loadCurrencyAPI() {
  return axios.get("https://api.manana.kr/exchange/rate/KRW/USD.json");
}
function* loadCurrency() {
  try {
    const result = yield call(loadCurrencyAPI);
    yield put({
      type: CURRENCY_SUCCESS,
      payload: result.data,
    });
  } catch (e) {
    yield put({
      type: CURRENCY_FAILURE,
      error: e,
    });
  }
}
function* watchCurrency() {
  yield takeLatest(CURRENCY_REQUEST, loadCurrency);
}

function loadBitUsdtAPI() {
  return axios.get(
    "https://www.binance.us/api/v1/aggTrades?limit=1&symbol=BTCUSD"
  );
}
function* loadBitUsdt() {
  try {
    const result = yield call(loadBitUsdtAPI);
    yield put({
      type: BINANCE_BITCOIN_USDT_SUCCESS,
      payload: result.data,
    });
  } catch (e) {
    yield put({
      type: BINANCE_BITCOIN_USDT_FAILURE,
      error: e,
    });
  }
}
function* watchBitUsdt() {
  yield takeLatest(BINANCE_BITCOIN_USDT_REQUEST, loadBitUsdt);
}

function loadUpbitNewListingAPI() {
  return axios.get(
    "https://api-manager.upbit.com/api/v1/notices/search?search=%5B%EA%B1%B0%EB%9E%98%5D&page=1&per_page=20&before=&target=non_ios&thread_name=general"
  );
}
function* loadUpbitNewListing() {
  try {
    const result = yield call(loadUpbitNewListingAPI);
    yield put({
      type: UPBIT_BTC_NEWLISTING_SUCCESS,
      payload: result.data,
    });
  } catch (e) {
    yield put({
      type: UPBIT_BTC_NEWLISTING_FAILURE,
      error: e,
    });
  }
}
function* watchUpbitNewListing() {
  yield takeLatest(UPBIT_BTC_NEWLISTING_REQUEST, loadUpbitNewListing);
}

function loadBinanceNewListingAPI() {
  return axios.get("http://localhost:8989/coin/notice");
}
function* loadBinanceNewListing() {
  try {
    const result = yield call(loadBinanceNewListingAPI);
    yield put({
      type: BINANCE_NEWLISTING_SUCCESS,
      payload: result.data,
    });
  } catch (e) {
    yield put({
      type: UPBIT_BTC_NEWLISTING_FAILURE,
      error: e,
    });
  }
}
function* watchBinanceNewListing() {
  yield takeLatest(BINANCE_NEWLISTING_REQUEST, loadBinanceNewListing);
}

export default function* coinSaga() {
  yield all([
    fork(watchBitKrw),
    fork(watchCurrency),
    fork(watchBitUsdt),
    fork(watchUpbitNewListing),
    fork(watchBinanceNewListing),
  ]);
}
