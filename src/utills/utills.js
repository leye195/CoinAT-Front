import axios from "axios";
import { v4 } from "uuid";

let binanceBTC = 0;
let thumbBTCKrw = 0;
let upbitBTCKrw = 0;
let wsBinance = null;
let wsUpbit = null;
let wsBithumb = null;

const tickers1 = {};
const tickersBTC1 = {};
const tickers2 = {};
const tickers3 = {};

export const coinTickers = { tickers: [], id: -1, type: "KRW" };

export const getPercent = (x, y) => {
  return ((x - y) / y) * 100;
};

// 업비트 소켓 연결
const upbitWS = async (coinList) => {
  if (wsUpbit === null) {
    const upbitList = (
      await axios.get("https://api.upbit.com/v1/market/all")
    ).data.filter(
      (coin) =>
        coin.market.includes("KRW-") ||
        (coin.market.includes("BTC-") &&
          coinList.includes(coin.market.slice(4))),
    );
    wsUpbit = new WebSocket("wss://api.upbit.com/websocket/v1");
    wsUpbit.binaryType = "arraybuffer";
    wsUpbit.onopen = () => {
      console.log("u connected");
      if (wsUpbit !== null && wsUpbit.readyState === 1) {
        const data = [
          { ticket: "test" },
          {
            type: "ticker",
            codes: ["KRW-BTC", ...upbitList.map((coin) => `${coin.market}`)],
          },
        ];
        wsUpbit.send(JSON.stringify(data));
      }
    };
    wsUpbit.onmessage = (e) => {
      // if (wsUpbit !== null && wsUpbit.readyState === 1) {
      const enc = new TextDecoder("utf-8");
      const arr = new Uint8Array(e.data);
      const {
        code,
        trade_price: tradePrice,
        opening_price: openPrice,
        high_price: highPrice,
        low_price: lowPrice,
        trade_date: tradeDate,
      } = JSON.parse(enc.decode(arr));
      const symbol = code.slice(code.indexOf("-") + 1, code.length);

      if (code === "KRW-BTC" && symbol === "BTC") upbitBTCKrw = tradePrice;
      if (code === `KRW-${symbol}`)
        tickers1[symbol] = {
          tradePrice,
          highPrice,
          lowPrice,
          openPrice,
          date: tradeDate,
        };
      if (code === `BTC-${symbol}`)
        tickersBTC1[symbol] = {
          tradePrice,
          highPrice,
          lowPrice,
          openPrice,
          date: tradeDate,
        };
    };
    wsUpbit.onclose = () => {
      if (wsUpbit !== null) {
        wsUpbit.close();
        wsUpbit = null;
        console.log("u disconnected");
        setTimeout(() => {
          upbitWS(coinList);
        }, 5000);
      }
    };
    wsUpbit.onerror = (e) => {
      console.log(e);
    };
  }
};
// 바이낸스 소켓 연결
const binanceWS = async (coinList) => {
  if (wsBinance === null) {
    let streams = "";
    for (let i = 0; i < coinList.length; i++) {
      if (i < coinList.length - 1) {
        streams += `${coinList[i].toLowerCase()}btc@ticker/`;
      } else streams += `${coinList[i].toLowerCase()}btc@ticker/`;
    }
    streams += `btcusdt@ticker`;
    wsBinance = new WebSocket(
      `wss://stream.binance.com:9443/stream?streams=${streams}`, // ethbtc@ticker" //"
    );
    wsBinance.onopen = () => {
      if (wsBinance !== null && wsBinance.readyState === 1) {
        console.log("b connected");
      }
    };
    wsBinance.onmessage = (e) => {
      if (wsBinance.readyState === 1) {
        const {
          data: { s, c, h, l, o },
        } = JSON.parse(e.data);
        const symbol = s.slice(0, s.length - 3);
        if (symbol === "BTCU") {
          binanceBTC = parseFloat(c);
          tickers2[s.slice(0, s.length - 4)] = {
            tradePrice: parseFloat(c),
            highPrice: h,
            lowPrice: l,
            openPrice: o,
          };
        } else {
          tickers2[symbol] = { tradePrice: parseFloat(c) };
        }
      }
    };

    wsBinance.onclose = () => {
      if (wsBinance !== null) {
        wsBinance.close();
        wsBinance = null;
        console.log("b disconnected");
        setTimeout(() => {
          binanceWS(coinList);
        }, 5000);
      }
    };

    wsBinance.onerror = (e) => {
      console.log(e);
    };
  }
};

// 빗썸 소켓 연결
const bithumbWS = async (coinList) => {
  if (wsBithumb === null) {
    wsBithumb = new WebSocket(`wss://pubwss.bithumb.com/pub/ws`);
    wsBithumb.onopen = async () => {
      const bithumbList = coinList.filter((coin) => coin.bithumb);
      if (wsBithumb !== null && wsBithumb.readyState === 1) {
        console.log("t connected");
        const data = {
          type: "ticker",
          symbols: [
            "BTC_KRW",
            ...bithumbList.map((coin) => `${coin.name}_KRW`),
          ],
          tickTypes: ["30M", "1H"],
        };
        wsBithumb.send(JSON.stringify(data));
      }
    };

    wsBithumb.onmessage = (e) => {
      const { data } = e;
      if (data) {
        const info = JSON.parse(data);
        if (info.content) {
          const { symbol, date, highPrice, lowPrice, openPrice, closePrice } =
            info.content;
          const coinSymbol = symbol.slice(0, symbol.length - 4);
          tickers3[coinSymbol] = {
            tradePrice: parseFloat(closePrice),
            highPrice,
            lowPrice,
            openPrice,
            date,
          };
          if (coinSymbol === "BTC")
            thumbBTCKrw = {
              tradePrice: parseFloat(closePrice),
              highPrice,
              lowPrice,
              openPrice,
              date,
            };
        }
      }
    };

    wsBithumb.onclose = () => {
      if (wsBithumb !== null) {
        wsBithumb.close();
        wsBithumb = null;
        console.log("t disconnected");
        setTimeout(() => {
          bithumbWS(coinList);
        }, 5000);
      }
    };
    wsBithumb.onerror = (e) => {
      console.log(e);
    };
  }
};

export const combineTickers = (currency, coinList, type = "KRW") => {
  const tickers = ["BTC", ...coinList].map((v) => {
    if (type === "KRW" || v === "BTC") {
      return {
        symbol: v, // tickers1[`${v}/KRW`].symbol.slice(0, tickers1[v].symbol.indexOf("/")),
        last: tickers1[`${v}`] === undefined ? 0 : tickers1[`${v}`].tradePrice,
        blast: tickers2[`${v}`] === undefined ? 0 : tickers2[`${v}`].tradePrice,
        convertedBlast:
          tickers2[`${v}`] === undefined
            ? 0
            : parseFloat(
                (tickers2[`${v}`].tradePrice * upbitBTCKrw).toFixed(2),
                10,
              ),
        thumb: tickers3[`${v}`] === undefined ? 0 : tickers3[`${v}`].tradePrice,
        per1:
          tickers1[`${v}`] === undefined || tickers2[`${v}`] === undefined
            ? undefined
            : getPercent(
                tickers1[`${v}`].tradePrice,
                parseFloat(
                  (tickers2[`${v}`].tradePrice * upbitBTCKrw).toFixed(2),
                  10,
                ),
              ),
        per2:
          tickers3[`${v}`] === undefined || tickers2[`${v}`] === undefined
            ? undefined
            : getPercent(
                tickers3[`${v}`].tradePrice,
                parseFloat(
                  (tickers2[`${v}`].tradePrice * upbitBTCKrw).toFixed(2),
                  10,
                ),
              ),
      };
    }

    return {
      symbol: v, // tickers1[`${v}/KRW`].symbol.slice(0, tickers1[v].symbol.indexOf("/")),
      last:
        tickersBTC1[`${v}`] === undefined ? 0 : tickersBTC1[`${v}`].tradePrice,
      blast: tickers2[`${v}`] === undefined ? 0 : tickers2[`${v}`].tradePrice,
      thumb: tickers3[`${v}`] === undefined ? 0 : tickers3[`${v}`].tradePrice,
      per1:
        tickersBTC1[`${v}`] === undefined || tickers2[`${v}`] === undefined
          ? undefined
          : getPercent(
              tickersBTC1[`${v}`].tradePrice,
              tickers2[`${v}`].tradePrice,
            ),
    };
  });

  coinTickers.tickers = tickers.length > 0 ? tickers : [];
  coinTickers.type = type !== "KRW" ? "BTC" : "KRW";
  coinTickers.id = v4();
  return coinTickers;
};

export const getAllList = (coinList) => {
  if (coinList.length > 0) {
    const coinNames = coinList.map((coin) => coin.name);
    // console.log("connedted");
    if (wsUpbit === null) upbitWS(coinNames);
    if (wsBinance === null) binanceWS(coinNames);
    if (wsBithumb === null) bithumbWS(coinList);
  }
};
