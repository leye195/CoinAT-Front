import { all, takeLatest, fork, put, call, throttle } from "redux-saga/effects";
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
  UPBIT_CHECK_COIN_REQUEST,
  UPBIT_CHECK_COIN_SUCCESS,
  UPBIT_CHECK_COIN_FAILURE,
  BINANCE_CHECK_COIN_REQUEST,
  BINANCE_CHECK_COIN_SUCCESS,
  BINANCE_CHECK_COIN_FAILURE,
  COIN_LIST_FAILURE,
  COIN_LIST_SUCCESS,
  COIN_LIST_REQUEST,
  UPBIT_BID_REQUEST,
  BINANCE_ASK_REQUEST,
  UPBIT_ASK_REQUEST,
  BINANCE_BID_REQUEST,
  UPBIT_BID_FAILURE,
  UPBIT_BID_SUCCESS,
  BINANCE_BID_FAILURE,
  BINANCE_BID_SUCCESS,
  UPBIT_ASK_SUCCESS,
  UPBIT_ASK_FAILURE,
  BINANCE_ASK_SUCCESS,
  BINANCE_ASK_FAILURE,
  BINANCE_SETTING,
  BINANCE_SETTING_SUCCESS,
  BINANCE_SETTING_FAILURE,
  UPBIT_SETTING,
  UPBIT_SETTING_SUCCESS,
  UPBIT_SETTING_FAILURE,
} from "../reducers/coin";
import axios from "axios";
import dotenv from "dotenv";
dotenv.config();
const API_URL = process.env.REACT_APP_API;
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
  return axios.get(
    "https://cors-anywhere.herokuapp.com/https://www.freeforexapi.com/api/live?pairs=USDKRW"
  );
  //return axios.get("https://api.exchangeratesapi.io/latest?base=USD");
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
  yield throttle(1000, CURRENCY_REQUEST, loadCurrency);
}

function loadBitUsdtAPI() {
  return axios.get(
    "https://www.binance.com/api/v1/aggTrades?limit=1&symbol=BTCUSDT"
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
  return axios.get(`${API_URL}coin/notice/upbit`);
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
  return axios.get(`${API_URL}coin/notice/binance`);
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
      type: BINANCE_NEWLISTING_FAILURE,
      error: e,
    });
  }
}
function* watchBinanceNewListing() {
  yield takeLatest(BINANCE_NEWLISTING_REQUEST, loadBinanceNewListing);
}

function upbitNewCoinAPI(data) {
  return axios.post(`${API_URL}coin/notice/upbit`, data);
}
function* upbitNewCoin(action) {
  try {
    const result = yield call(upbitNewCoinAPI, action.payload);
    yield put({
      type: UPBIT_CHECK_COIN_SUCCESS,
      payload: result.data,
    });
  } catch (e) {
    yield put({
      type: UPBIT_CHECK_COIN_FAILURE,
      error: e,
    });
  }
}
function* watchUpbitNewCoin() {
  yield takeLatest(UPBIT_CHECK_COIN_REQUEST, upbitNewCoin);
}

function binanceNewCoinAPI(data) {
  return axios.post(`${API_URL}coin/notice/binance`, data);
}
function* binanceNewCoin(action) {
  try {
    const result = yield call(binanceNewCoinAPI, action.payload);
    yield put({
      type: BINANCE_CHECK_COIN_SUCCESS,
      payload: result.data,
    });
  } catch (e) {
    yield put({
      type: BINANCE_CHECK_COIN_FAILURE,
      error: e,
    });
  }
}
function* watchBinanceNewCoin() {
  yield takeLatest(BINANCE_CHECK_COIN_REQUEST, binanceNewCoin);
}

function coinListAPI() {
  return axios.get(`${API_URL}coin`);
}
function* coinList() {
  try {
    const result = yield call(coinListAPI);
    yield put({
      type: COIN_LIST_SUCCESS,
      payload: result.data,
    });
  } catch (e) {
    yield put({
      type: COIN_LIST_FAILURE,
      error: e,
    });
  }
}
function* watchCoinList() {
  yield takeLatest(COIN_LIST_REQUEST, coinList);
}

function upbitBidAPI(data) {
  return axios.post(`${API_URL}trade/bid`, data);
}
function* upbitBid(action) {
  try {
    //console.log(action.payload);
    const result = yield call(upbitBidAPI, action.payload);
    yield put({
      type: UPBIT_BID_SUCCESS,
      payload: result.data,
    });
  } catch (e) {
    yield put({
      type: UPBIT_BID_FAILURE,
      error: e,
    });
  }
}
function* watchUpbitBid() {
  yield throttle(1000, UPBIT_BID_REQUEST, upbitBid);
}

function upbitAskAPI(data) {
  return axios.post(`${API_URL}trade/ask`, data);
}
function* upbitAsk(action) {
  try {
    const result = yield call(upbitAskAPI, action.payload);
    yield put({
      type: UPBIT_ASK_SUCCESS,
      payload: result.data,
    });
  } catch (e) {
    yield put({
      type: UPBIT_ASK_FAILURE,
      error: e,
    });
  }
}
function* watchUpbitAsk() {
  yield throttle(1000, UPBIT_ASK_REQUEST, upbitAsk);
}

function setBinanceKeyAPI(data) {
  return axios.post(`${API_URL}trade/binance_key`, {
    api: data.binanceApi,
    sec: data.binanceSec,
  });
}
function* setBinanceKey(action) {
  try {
    yield call(setBinanceKeyAPI, action.payload);
    yield put({
      type: BINANCE_SETTING_SUCCESS,
    });
  } catch (e) {
    yield put({
      type: BINANCE_SETTING_FAILURE,
      error: e,
    });
  }
}
function* watchSetBinanceKey() {
  yield takeLatest(BINANCE_SETTING, setBinanceKey);
}

function setUpbitKeyAPI(data) {
  return axios.post(`${API_URL}trade/upbit_key`, {
    api: data.upbitApi,
    sec: data.upbitSec,
  });
}
function* setUpbitKey(action) {
  try {
    yield call(setUpbitKeyAPI, action.payload);
    yield put({
      type: UPBIT_SETTING_SUCCESS,
    });
  } catch (e) {
    yield put({
      type: UPBIT_SETTING_FAILURE,
      error: e,
    });
  }
}
function* watchSetUpbitKey() {
  yield takeLatest(UPBIT_SETTING, setUpbitKey);
}

export default function* coinSaga() {
  yield all([
    fork(watchBitKrw),
    fork(watchCurrency),
    fork(watchBitUsdt),
    fork(watchUpbitNewListing),
    fork(watchBinanceNewListing),
    fork(watchUpbitNewCoin),
    fork(watchBinanceNewCoin),
    fork(watchCoinList),
    fork(watchUpbitBid),
    fork(watchUpbitAsk),
    fork(watchSetBinanceKey),
    fork(watchSetUpbitKey),
  ]);
}
