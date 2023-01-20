import api, { herokuApi } from "apis";

export const getCurrency = () =>
  herokuApi.get("currency", {
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
  });

export const getBinanceNotice = () =>
  herokuApi.get("notice/binance", {
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
    withCredentials: true,
  });

export const getUpbitNotice = () =>
  herokuApi.get("notice/upbit", {
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
  });

export const updateUpbitNewCoin = (data) =>
  api.post("coin/notice/upbit", data, {
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
    withCredentials: true,
  });

export const getCoinTicker = () =>
  api.get("coin/tickers", {
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
    withCredentials: true,
  });
