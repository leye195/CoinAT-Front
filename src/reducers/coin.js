import { createAction, handleActions } from "redux-actions";
import produce from "immer";
import moment from "moment";

export const SETTING_BTC = "SETTING_BTC";
export const COIN_INFO_REQUEST = "COIN_INFO_REQUEST";

export const TICKERS_REQUEST = "TICKERS_REQUEST";
export const TICKERS_SUCCESS = "TICKERS_SUCCESS";
export const TICKERS_FAILUER = "TICKERS_FAILURE";

export const COIN_LIST_REQUEST = "COIN_LIST_REQUEST";
export const COIN_LIST_SUCCESS = "COIN_LIST_SUCCESS";
export const COIN_LIST_FAILURE = "COIN_LIST_FAILURE";

export const UPBIT_BITCOIN_KRW = "UPBIT_BITCOIN_KRW";
export const BITHUMB_BITCOIN_KRW = "BITHUMB_BITCOIN_KRW";
export const BINANCE_BITCOIN_USDT = "BINANCE_BITCOIN_USDT";

export const CURRENCY_REQUEST = "CURRENCY_REQUEST";
export const CURRENCY_SUCCESS = "CURRENCY_SUCCESS";
export const CURRENCY_FAILURE = "CURRENCY_FAILURE";

/*export const BINANCE_BITCOIN_USDT_REQUEST = "BINANCE_BITCOIN_USDT_REQUEST";
export const BINANCE_BITCOIN_USDT_SUCCESS = "BINANCE_BITCOIN_USDT_SUCCESS";
export const BINANCE_BITCOIN_USDT_FAILURE = "BINANCE_BITCOIN_USDT_FAILURE";*/

export const UPBIT_BTC_NEWLISTING_REQUEST = "UPBIT_BTC_NEWLISTING_REQUEST";
export const UPBIT_BTC_NEWLISTING_SUCCESS = "UPBIT_BTC_NEWLISTING_SUCCESS";
export const UPBIT_BTC_NEWLISTING_FAILURE = "UPBIT_BTC_NEWLISTING_FAILURE";

export const BINANCE_NEWLISTING_REQUEST = "BINANCE_NEWLISTING_REQUEST";
export const BINANCE_NEWLISTING_SUCCESS = "BINANCE_NEWLISTING_SUCCESS";
export const BINANCE_NEWLISTING_FAILURE = "BINANCE_NEWLISTING_FAILURE";

export const UPBIT_CHECK_COIN_REQUEST = "UPBIT_CHECK_COIN_REQUEST";
export const UPBIT_CHECK_COIN_SUCCESS = "UPBIT_CHECK_COIN_SUCCESS";
export const UPBIT_CHECK_COIN_FAILURE = "UPBIT_CHECK_COIN_FAILURE";

export const BINANCE_CHECK_COIN_REQUEST = "BINANCE_CHECK_COIN_REQUEST";
export const BINANCE_CHECK_COIN_SUCCESS = "BINANCE_CHECK_COIN_SUCCESS";
export const BINANCE_CHECK_COIN_FAILURE = "BINANCE_CHECK_COIN_FAILURE";

export const UPBIT_SETTING = "UPBIT_SETTING";
export const UPBIT_SETTING_SUCCESS = "UPBIT_SETTING_SUCCESS";
export const UPBIT_SETTING_FAILURE = "UPBIT_SETTING_FAILURE";

export const BINANCE_SETTING = "BINANCE_SETTING";
export const BINANCE_SETTING_SUCCESS = "BINANCE_SETTING_SUCCESS";
export const BINANCE_SETTING_FAILURE = "BINANCE_SETTING_FAILURE";

export const KEY_SETTING_REQUEST = "KEY_SETTING_REQUEST";
export const KEY_SETTING_SUCCESS = "KEY_SETTING_SUCCESS";
export const KEY_SETTING_FAILURE = "KEY_SETTING_FAILURE";

export const UPBIT_BID_REQUEST = "UPBIT_BID_REQUEST";
export const UPBIT_BID_SUCCESS = "UPBIT_BID_SUCCESS";
export const UPBIT_BID_FAILURE = "UPBIT_BID_FAILURE";

export const UPBIT_ASK_REQUEST = "UPBIT_ASK_REQUEST";
export const UPBIT_ASK_SUCCESS = "UPBIT_ASK_SUCCESS";
export const UPBIT_ASK_FAILURE = "UPBIT_ASK_FAILURE";

export const TRADE_ERROR_REQUEST = "TRADE_ERROR_REQUEST";

export const loadCoinInfo = createAction(COIN_INFO_REQUEST);
export const loadCoinList = createAction(COIN_LIST_REQUEST);
export const loadBithumbBitkrw = createAction(BITHUMB_BITCOIN_KRW);
export const loadUpbitBitKrw = createAction(UPBIT_BITCOIN_KRW);
export const loadUsdToKrw = createAction(CURRENCY_REQUEST);
export const loadBinanceBitUsdt = createAction(BINANCE_BITCOIN_USDT);
export const loadUpbitNewListing = createAction(UPBIT_BTC_NEWLISTING_REQUEST);
export const loadBianceNewListing = createAction(BINANCE_NEWLISTING_REQUEST);
export const loadTickers = createAction(TICKERS_REQUEST);

export const checkUpbitCoin = createAction(UPBIT_CHECK_COIN_REQUEST);
export const checkBinanceCoin = createAction(BINANCE_CHECK_COIN_REQUEST);

export const setUpbit = createAction(UPBIT_SETTING);
export const setBinance = createAction(BINANCE_SETTING);
export const setKey = createAction(KEY_SETTING_REQUEST);

export const setBtc = createAction(SETTING_BTC);

export const upbitBid = createAction(UPBIT_BID_REQUEST);
export const upbitAsk = createAction(UPBIT_ASK_REQUEST);

export const setTradeError = createAction(TRADE_ERROR_REQUEST);

const initialState = {
  tickers: [],
  isbitkrwLoading: false,
  bithumbBitKrw: 0.0,
  upbitBitKrw: 0.0,
  upbitBitKrwError: "",
  isUsdToKrwLoading: true,
  usdToKrw: 0.0,
  usdToKrwError: "",
  isbitusdtLoading: true,
  binanceBitUsdt: 0.0,
  binanceBitUsdtError: "",
  isUpbitNewListingLoading: false,
  upbitNewListing: [],
  isBinanceNewListingLoading: false,
  binanceNewListing: [],
  upbitApi: "",
  upbitSec: "",
  binanceApi: "",
  binanceSec: "",
  btc: {},
  coinInfo: [],
  coinList: [
    "ADA",
    "ADX",
    "ANKR",
    "ARDR",
    "ARK",
    "ATOM",
    "BAT",
    "BCH",
    "BTG",
    "CVC",
    "CHZ",
    "DCR",
    "ELF",
    "ENJ",
    "EOS",
    "ETC",
    "ETH",
    "GAS",
    "GNT",
    "GRS",
    "GTO",
    "HBAR",
    "ICX",
    "IOST",
    "IOTA",
    "KMD",
    "KNC",
    "LOOM",
    "LSK",
    "LTC",
    "MANA",
    "MBL",
    "MCO",
    "MTL",
    "NEO",
    "OMG",
    "ONG",
    "ONT",
    "OST",
    "POLY",
    "POWR",
    "QKC",
    "QTUM",
    "REP",
    "SC",
    "SNT",
    "STEEM",
    "STORJ",
    "STPT",
    "STRAT",
    "TFUEL",
    "THETA",
    "TRX",
    "VET",
    "WAVES",
    "XEM",
    "XLM",
    "XRP",
    "ZIL",
    "ZRX",
  ],
  tradeError: 0,
};
export default handleActions(
  {
    [SETTING_BTC]: (state, action) =>
      produce(state, (draft) => {
        draft.btc = action.payload;
      }),
    [COIN_INFO_REQUEST]: (state, action) =>
      produce(state, (draft) => {
        if (draft.coinInfo.length < action.payload.coinInfo.length)
          draft.coinInfo = action.payload.coinInfo;
      }),
    [TICKERS_REQUEST]: (state, action) => produce(state, (draft) => {}),
    [TICKERS_SUCCESS]: (state, action) =>
      produce(state, (draft) => {
        draft.tickers = action.payload;
      }),
    [TICKERS_FAILUER]: (state, action) => produce(state, (draft) => {}),
    [COIN_LIST_REQUEST]: (state, action) => produce(state, (draft) => {}),
    [COIN_LIST_SUCCESS]: (state, action) =>
      produce(state, (draft) => {
        const coinList = action.payload.map((coin) => {
          return coin.name;
        });
        draft.coinList = coinList;
      }),
    [COIN_LIST_FAILURE]: (state, action) => produce(state, (draft) => {}),
    [BITHUMB_BITCOIN_KRW]: (state, action) =>
      produce(state, (draft) => {
        const { BTC } = action.payload;
        draft.bithumbBitKrw = BTC;
      }),
    [UPBIT_BITCOIN_KRW]: (state, action) =>
      produce(state, (draft) => {
        const { BTC } = action.payload;
        draft.upbitBitKrw = BTC;
        draft.isbitkrwLoading = true;
      }),

    [CURRENCY_REQUEST]: (state, action) =>
      produce(state, (draft) => {
        draft.isUsdToKrwLoading = true;
      }),
    [CURRENCY_SUCCESS]: (state, action) =>
      produce(state, (draft) => {
        const target = action.payload.data.filter(
          (currency) => currency.pair === "KRW_USD"
        )[0].rate;
        //console.log(target);
        draft.isUsdToKrwLoading = false;
        draft.usdToKrw = target.toFixed(3);
      }),
    [CURRENCY_FAILURE]: (state, action) =>
      produce(state, (draft) => {
        draft.isUsdToKrwLoading = false;
        draft.usdToKrwError = action.error;
      }),
    [BINANCE_BITCOIN_USDT]: (state, action) =>
      produce(state, (draft) => {
        const { BTC } = action.payload;
        draft.binanceBitUsdt = BTC;
        draft.isbitusdtLoading = false;
      }),
    /*[BINANCE_BITCOIN_USDT_REQUEST]: (state, action) =>
      produce(state, (draft) => {
        draft.isbitusdtLoading = true;
      }),
    [BINANCE_BITCOIN_USDT_SUCCESS]: (state, action) =>
      produce(state, (draft) => {
        draft.binanceBitUsdt = action.payload[0].p;
        draft.isbitusdtLoading = false;
      }),
    [BINANCE_BITCOIN_USDT_FAILURE]: (state, action) =>
      produce(state, (draft) => {
        draft.isbitusdtLoading = false;
        draft.binanceBitUsdtError = action.error;
      }),*/
    [UPBIT_BTC_NEWLISTING_REQUEST]: (state, action) =>
      produce(state, (draft) => {
        draft.isUpbitNewListingLoading = true;
      }),
    [UPBIT_BTC_NEWLISTING_SUCCESS]: (state, action) =>
      produce(state, (draft) => {
        const { payload } = action;
        //console.log(payload);
        const filteredList = payload.map((v) => {
          if (
            moment(v.created_at).format("YYYY-MM-DD") ===
            moment().format("YYYY-MM-DD")
          )
            return { new: true, notice: v };
          else return { new: false, notice: v };
        });
        draft.upbitNewListing = filteredList;
        draft.isUpbitNewListingLoading = false;
      }),
    [UPBIT_BTC_NEWLISTING_FAILURE]: (state, action) =>
      produce(state, (draft) => {
        draft.isUpbitNewListingLoading = false;
      }),
    [BINANCE_NEWLISTING_REQUEST]: (state, action) =>
      produce(state, (draft) => {
        draft.isBinanceNewListingLoading = true;
      }),
    [BINANCE_NEWLISTING_SUCCESS]: (state, action) =>
      produce(state, (draft) => {
        draft.binanceNewListing = action.payload;
        draft.isBinanceNewListingLoading = false;
      }),
    [BINANCE_NEWLISTING_FAILURE]: (state, action) =>
      produce(state, (draft) => {
        draft.isBinanceNewListingLoading = false;
      }),
    [UPBIT_SETTING]: (state, action) =>
      produce(state, (draft) => {
        draft.upbitApi = action.payload.upbitApi;
        draft.upbitSec = action.payload.upbitSec;
      }),
    [UPBIT_SETTING_SUCCESS]: (state, action) => {},
    [UPBIT_SETTING_FAILURE]: (state, action) => {},
    [BINANCE_SETTING]: (state, action) =>
      produce(state, (draft) => {
        draft.binanceApi = action.payload.binanceApi;
        draft.binanceSec = action.payload.binanceSec;
      }),
    [BINANCE_SETTING_SUCCESS]: (state, action) => {},
    [BINANCE_SETTING_FAILURE]: (state, action) => {},
    [KEY_SETTING_REQUEST]: (state, action) =>
      produce(state, (draft) => {
        draft.upbitApi = action.payload.upbitApi;
        draft.upbitSec = action.payload.upbitSec;
        draft.binanceApi = action.payload.binanceApi;
        draft.binanceSec = action.payload.binanceSec;
      }),
    [KEY_SETTING_SUCCESS]: (state, action) => {},
    [KEY_SETTING_FAILURE]: (state, action) => {},
    [UPBIT_CHECK_COIN_REQUEST]: (state, action) =>
      produce(state, (dratf) => {}),
    [UPBIT_CHECK_COIN_SUCCESS]: (state, action) =>
      produce(state, (dratf) => {}),
    [UPBIT_CHECK_COIN_FAILURE]: (state, action) =>
      produce(state, (draft) => {}),
    [BINANCE_CHECK_COIN_REQUEST]: (state, action) =>
      produce(state, (dratf) => {}),
    [BINANCE_CHECK_COIN_SUCCESS]: (state, action) =>
      produce(state, (dratf) => {}),
    [BINANCE_CHECK_COIN_FAILURE]: (state, action) =>
      produce(state, (draft) => {}),
    [UPBIT_BID_REQUEST]: (state, action) => produce(state, (draft) => {}),
    [UPBIT_BID_SUCCESS]: (state, action) =>
      produce(state, (draft) => {
        const {
          payload: { error },
        } = action;
        draft.tradeError = error;
      }),
    [UPBIT_BID_FAILURE]: (state, action) =>
      produce(state, (draft) => {
        draft.tradeError = 1;
      }),
    [UPBIT_ASK_REQUEST]: (state, action) => produce(state, (draft) => {}),
    [UPBIT_ASK_SUCCESS]: (state, action) =>
      produce(state, (draft) => {
        const {
          payload: { error },
        } = action;
        draft.tradeError = error;
      }),
    [UPBIT_ASK_FAILURE]: (state, action) =>
      produce(state, (draft) => {
        draft.tradeError = 1;
      }),
    [TRADE_ERROR_REQUEST]: (state, action) =>
      produce(state, (draft) => {
        draft.tradeError = 0;
      }),
  },
  initialState
);
