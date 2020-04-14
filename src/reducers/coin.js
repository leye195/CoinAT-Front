import { createAction, handleActions } from "redux-actions";
import produce from "immer";
import moment from "moment";

export const UPBIT_BITCOIN_KRW_REQUEST = "UPBIT_BITCOIN_KRW_REQUEST";
export const UPBIT_BITCOIN_KRW_SUCCESS = "UPBIT_BITCOIN_KRW_SUCCESS";
export const UPBIT_BITCOIN_KRW_FAILURE = "UPBIT_BITCOIN_KRW_FAILURE";

export const CURRENCY_REQUEST = "CURRENCY_REQUEST";
export const CURRENCY_SUCCESS = "CURRENCY_SUCCESS";
export const CURRENCY_FAILURE = "CURRENCY_FAILURE";

export const BINANCE_BITCOIN_USDT_REQUEST = "BINANCE_BITCOIN_USDT_REQUEST";
export const BINANCE_BITCOIN_USDT_SUCCESS = "BINANCE_BITCOIN_USDT_SUCCESS";
export const BINANCE_BITCOIN_USDT_FAILURE = "BINANCE_BITCOIN_USDT_FAILURE";

export const UPBIT_BTC_NEWLISTING_REQUEST = "UPBIT_BTC_NEWLISTING_REQUEST";
export const UPBIT_BTC_NEWLISTING_SUCCESS = "UPBIT_BTC_NEWLISTING_SUCCESS";
export const UPBIT_BTC_NEWLISTING_FAILURE = "UPBIT_BTC_NEWLISTING_FAILURE";

export const BINANCE_NEWLISTING_REQUEST = "BINANCE_NEWLISTING_REQUEST";
export const BINANCE_NEWLISTING_SUCCESS = "BINANCE_NEWLISTING_SUCCESS";
export const BINANCE_NEWLISTING_FAILURE = "BINANCE_NEWLISTING_FAILURE";

export const loadUpbitBitKrw = createAction(UPBIT_BITCOIN_KRW_REQUEST);
export const loadUsdToKrw = createAction(CURRENCY_REQUEST);
export const loadBinanceBitUsdt = createAction(BINANCE_BITCOIN_USDT_REQUEST);
export const loadUpbitNewListing = createAction(UPBIT_BTC_NEWLISTING_REQUEST);
export const loadBianceNewListing = createAction(BINANCE_NEWLISTING_REQUEST);
const initialState = {
  isbitkrwLoading: false,
  upbitBitKrw: 0.0,
  upbitBitKrwError: "",
  isUsdToKrwLoading: false,
  usdToKrw: 0.0,
  usdToKrwError: "",
  isbitusdtLoading: false,
  binanceBitUsdt: 0.0,
  binanceBitUsdtError: "",
  isUpbitNewListingLoading: false,
  upbitNewListing: [],
  isBinanceNewListingLoading: false,
  binanceNewListing: [],
  coinList: [
    "ADA",
    "ADX",
    "ANKR",
    "ARDR",
    "ARK",
    "ATOM",
    "BAT",
    "BCH",
    "BSV",
    "BTG",
    "BTT",
    "CVC",
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
    "MFT",
    "MTL",
    "NEO",
    "NPXS",
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
    "STORM",
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
};
export default handleActions(
  {
    [UPBIT_BITCOIN_KRW_REQUEST]: (state, action) =>
      produce(state, (draft) => {
        draft.isbitkrwLoading = true;
      }),
    [UPBIT_BITCOIN_KRW_SUCCESS]: (state, action) =>
      produce(state, (draft) => {
        draft.isbitkrwLoading = false;
        draft.upbitBitKrw = action.payload[0].trade_price;
      }),
    [UPBIT_BITCOIN_KRW_FAILURE]: (state, action) =>
      produce(state, (draft) => {
        draft.upbitBitKrwError = action.payload.error;
      }),
    [CURRENCY_REQUEST]: (state, action) =>
      produce(state, (draft) => {
        draft.isUsdToKrwLoading = true;
      }),
    [CURRENCY_SUCCESS]: (state, action) =>
      produce(state, (draft) => {
        draft.isUsdToKrwLoading = false;
        draft.usdToKrw = action.payload[0].rate;
      }),
    [CURRENCY_FAILURE]: (state, action) =>
      produce(state, (draft) => {
        draft.isUsdToKrwLoading = false;
        draft.usdToKrwError = action.error;
      }),
    [BINANCE_BITCOIN_USDT_REQUEST]: (state, action) =>
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
      }),
    [UPBIT_BTC_NEWLISTING_REQUEST]: (state, action) =>
      produce(state, (draft) => {
        draft.isUpbitNewListingLoading = true;
      }),
    [UPBIT_BTC_NEWLISTING_SUCCESS]: (state, action) =>
      produce(state, (draft) => {
        const {
          payload: {
            data: { list },
          },
        } = action;
        const filteredList = list
          .filter((v) => v.title.includes("BTC"))
          .map((v) => {
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
  },
  initialState
);
