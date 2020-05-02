import React, { useState, useEffect, useCallback, useRef } from "react";
import styled from "styled-components";
import ccxt from "ccxt";
import Loading from "./Loading";
import CurrentExchangeBar from "./CurrentExchangeBar";
import SettingBar from "./SettingBar";
import {
  loadUsdToKrw,
  loadUpbitBitKrw,
  loadBinanceBitUsdt,
  loadUpbitNewListing,
  loadBianceNewListing,
} from "../reducers/coin";
import { useDispatch, useSelector } from "react-redux";
import { v4 } from "uuid";
import NewListing from "./NewListing";
//const exchangeList = ["Upbit", "Binance"];
const ExchangesWrapper = styled.section`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;
const ExchangesContainer = styled.ul`
  display: flex;
  flex-direction: row;
  list-style: none;
  padding: 5px;
  border: 1px solid;
  border-left: 0;
  border-right: 0;
  border-bottom: 0;
  margin-top: 5px;
  margin-bottom: 0;
  font-size: 0.4rem;
  @media (max-width: 768px) {
    margin-top: 0px;
    padding: 0px;
  }
`;
const ExchangeItem = styled.li`
  padding-left: 10px;
  padding-right: 10px;
  cursor: pointer;
  color: ${(props) => (props.selected ? "black" : "black")};
`;
const ExchangeCoinsContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 5px;
  @media (min-width: 1025px) {
    width: 60%;
    margin: 0 auto;
  }
  @media (max-width: 1024px) {
    width: 60%;
  }
  @media (max-width: 768px) {
    width: 100%;
  }
`;
const CoinContainer = styled.div`
  display: flex;
  flex-direction: row;
  padding: 2px;
  border-bottom: 1px solid #e3e3e3;
  &:first-child {
    font-weight: 800;
  }
  &:last-child {
    border-bottom: none;
  }
`;
const Coin = styled.div`
  cursor: ${(props) => (props.head ? "pointer" : "normal")};
  width: 30%;
  word-break: break-all;
  font-size: 0.85rem;
  color: black;
  margin-left: 3px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  @media (max-width: 768px) {
    font-size: 0.7rem;
  }
  &:first-child {
  }
  &:nth-child(2) {
    color: ${(props) => (props.head === true ? "black" : "#27ae60")};
    font-weight: ${(props) => (props.head === true ? "800" : "600")};
  }
  &:nth-child(4) {
  }
  &:nth-child(5) {
    color: ${(props) =>
      props.head === true
        ? "black"
        : props.up === true
        ? "#e74c3c"
        : "#0984e3"};
    font-weight: ${(props) =>
      props.head === true ? "800" : props.up === true ? "600" : "600"};
    p {
      font-size: 0.85rem;
      margin-bottom: 0;
      margin-top: 0;
      @media (max-width: 768px) {
        font-size: 0.7rem;
      }
      @media (max-width: 425px) {
        align-self: flex-start;
      }
    }
  }
  &:nth-child(6) {
    color: ${(props) =>
      props.head === true
        ? "black"
        : props.up === true
        ? "#ff2e18"
        : "#0012ff"};
    border-radius: 10px;
    background-color: ${(props) =>
      props.head === true
        ? "white"
        : props.up === true
        ? "#ff747363"
        : "#007fff47"};
    border-radius: 10px;
  }
`;
function ExchangeList() {
  const [upbitCoinInfo, setUpbitCoinInfo] = useState([]);
  const [isFirstLoading, setIsFirstLoading] = useState(false);
  const [loading, setLoading] = useState(true);
  const [sortType, setSortType] = useState(-1);
  const dispatch = useDispatch();
  const { coinList, upbitBitKrw } = useSelector((state) => state.coin);
  const info = useRef([]);
  const timer = useRef(null);
  const wsUpbit = useRef(null);
  const wsBinance = useRef(null);
  //const sortType = useRef(-1);
  const getExchangeTickers = useCallback(async () => {
    if (timer.current) {
      timer.current = setTimeout(getExchangeTickers, 2500);
    }
    if (isFirstLoading === false && loading === false) setLoading(true);
    const upbit = new ccxt.upbit();
    const binance = new ccxt.binance();
    let tickers1 = await upbit.fetchTickers(coinList.map((v) => `${v}/KRW`)),
      tickers2 = await binance.fetchTickers(coinList.map((v) => `${v}/BTC`));
    tickers1 = Object.keys(tickers1)
      .map((v) => {
        return {
          symbol: tickers1[v].symbol.slice(0, tickers1[v].symbol.indexOf("/")),
          last: tickers1[v].last,
          low: tickers1[v].low,
          high: tickers1[v].high,
          blast:
            tickers2[
              `${tickers1[v].symbol.slice(
                0,
                tickers1[v].symbol.indexOf("/")
              )}/BTC`
            ].last,
        };
      })
      .sort((x, y) => {
        const convertedX = x.blast * upbitBitKrw,
          convertedY = y.blast * upbitBitKrw;
        if (sortType === -1) return x.symbol > y.symbol ? 1 : -1;
        else if (sortType === 1) return x.symbol < y.symbol ? 1 : -1;
        else if (sortType === -2) return x.last > y.last ? 1 : -1;
        else if (sortType === 2) return x.last < y.last ? 1 : -1;
        else if (sortType === -3) return x.blast > y.blast ? 1 : -1;
        else if (sortType === 3) return x.blast < y.blast ? 1 : -1;
        else if (sortType === -4)
          return (x.last - convertedX) / x.last > (y.last - convertedY) / y.last
            ? 1
            : -1;
        else if (sortType === 4)
          return (x.last - convertedX) / x.last < (y.last - convertedY) / y.last
            ? 1
            : -1;
      });
    dispatch(loadUpbitBitKrw());
    dispatch(loadUsdToKrw());
    dispatch(loadBinanceBitUsdt());
    dispatch(loadUpbitNewListing());
    //dispatch(loadBianceNewListing());
    if (loading === true) setLoading(false);
    if (isFirstLoading === false) setIsFirstLoading(true);
    setUpbitCoinInfo(tickers1);
  }, [loading, isFirstLoading, dispatch, coinList, upbitBitKrw, sortType]);
  const upbitWS = useCallback(() => {
    if (wsUpbit.current === null) {
      wsUpbit.current = new WebSocket("wss://api.upbit.com/websocket/v1");
      wsUpbit.current.binaryType = "arraybuffer";
      wsUpbit.current.onopen = () => {
        //console.log("connected");
        const data = [
          { ticket: "test" },
          { type: "ticker", codes: coinList.map((coin) => `KRW-${coin}`) },
        ];
        //console.log(JSON.stringify(data));
        wsUpbit.current.send(JSON.stringify(data));
      };
      wsUpbit.current.onmessage = (e) => {
        const enc = new TextDecoder("utf-8");
        const arr = new Uint8Array(e.data);
        const {
          code,
          high_price,
          low_price,
          trade_price,
          ask_bid,
        } = JSON.parse(enc.decode(arr));
        const symbol = code.slice(code.indexOf("-") + 1, code.length);
        const targetCoin = info.current.filter(
          (item) => item.symbol === symbol
        );
        const cleanedList = info.current.filter(
          (item) => item.symbol !== symbol
        );
        if (targetCoin.length > 0) {
          info.current = cleanedList.concat([
            {
              symbol,
              last: trade_price,
              high: high_price,
              low: low_price,
              blast: targetCoin[0].blast,
              ask_bid,
            },
          ]);
        } else {
          info.current = cleanedList.concat([
            {
              symbol,
              last: trade_price,
              high: high_price,
              low: low_price,
              ask_bid,
              blast: 0.0,
            },
          ]);
        }
      };
      wsUpbit.current.onclose = () => {
        wsUpbit.current.close();
      };
    }
  }, [coinList]);
  const binanceWS = useCallback(() => {
    if (wsBinance.current === null) {
      let streams = "";
      for (let i = 0; i < coinList.length; i++) {
        if (i < coinList.length - 1) {
          streams += `${coinList[i].toLowerCase()}btc@ticker/`;
        } else streams += `${coinList[i].toLowerCase()}btc@ticker`;
      }
      wsBinance.current = new WebSocket(
        `wss://stream.binance.com:9443/stream?streams=${streams}` //ethbtc@ticker" //"
      );
      wsBinance.current.onopen = () => {
        console.log("b connected");
      };
      wsBinance.current.onmessage = (e) => {
        const {
          data: { s, c },
        } = JSON.parse(e.data);
        const symbol = s.slice(0, s.length - 3);
        for (let i = 0; i < info.current.length; i++) {
          if (info.current[i].symbol === symbol) {
            const percent =
              (info.current[i].last - info.current[i].blast * upbitBitKrw) /
              info.current[i].last;
            info.current[i] = { ...info.current[i], blast: c, percent };
            break;
          }
        }
        info.current.sort((x, y) => {
          const convertedX = x.blast * upbitBitKrw,
            convertedY = y.blast * upbitBitKrw;
          if (sortType === -1) return x.symbol > y.symbol ? 1 : -1;
          else if (sortType === 1) return x.symbol < y.symbol ? 1 : -1;
          else if (sortType === -2) return x.last > y.last ? 1 : -1;
          else if (sortType === 2) return x.last < y.last ? 1 : -1;
          else if (sortType === -3) return x.blast > y.blast ? 1 : -1;
          else if (sortType === 3) return x.blast < y.blast ? 1 : -1;
          else if (sortType === -4)
            return ((x.last - convertedX) / convertedX) * 100 >
              ((y.last - convertedY) / convertedY) * 100
              ? 1
              : -1;
          else if (sortType === 4)
            return ((x.last - convertedX) / convertedX) * 100 <
              ((y.last - convertedY) / convertedY) * 100
              ? 1
              : -1;
        });
      };
      wsBinance.current.onclose = () => {
        wsBinance.current.close();
      };
    }
  }, [coinList, sortType, upbitBitKrw]);
  useEffect(() => {
    timer.current = setTimeout(getExchangeTickers, 2500);
    return () => {
      clearTimeout(timer.current);
    };
  }, [getExchangeTickers, sortType, upbitBitKrw, coinList, info]);
  const onSort = useCallback(
    (coinInfo) => (e) => {
      const {
        target: {
          dataset: { id },
        },
      } = e;
      if (parseInt(id, 10) === 1) {
        if (sortType === 1) {
          coinInfo.sort((x, y) => {
            return x.symbol > y.symbol ? 1 : -1;
          });
          //sortType.current = -1;
          setSortType(-1);
        } else {
          coinInfo.sort((x, y) => {
            return x.symbol < y.symbol ? 1 : -1;
          });
          //sortType.current = 1;
          setSortType(1);
        }
      } else if (parseInt(id, 10) === 2) {
        if (sortType === 2) {
          coinInfo.sort((x, y) => {
            return x.last > y.last ? 1 : -1;
          });
          //sortType.current = -2;
          setSortType(-2);
        } else {
          coinInfo.sort((x, y) => {
            return x.last < y.last ? 1 : -1;
          });
          //console.log();
          //sortType.current = 2;
          setSortType(2);
        }
      } else if (parseInt(id, 10) === 3) {
        if (sortType === 3) {
          coinInfo.sort((x, y) => {
            return x.blast > y.blast ? 1 : -1;
          });
          //sortType.current = -3;
          setSortType(-3);
        } else {
          coinInfo.sort((x, y) => {
            return x.blast < y.blast ? 1 : -1;
          });
          //sortType.current = 3;
          setSortType(3);
        }
      } else if (parseInt(id, 10) === 4) {
        if (sortType === 4) {
          coinInfo.sort((x, y) => {
            const convertedX = x.blast * upbitBitKrw,
              convertedY = y.blast * upbitBitKrw;
            return ((x.last - convertedX) / convertedX) * 100 >
              ((y.last - convertedY) / convertedY) * 100
              ? 1
              : -1;
          });
          //sortType.current = -4;
          setSortType(-4);
        } else {
          coinInfo.sort((x, y) => {
            const convertedX = x.blast * upbitBitKrw,
              convertedY = y.blast * upbitBitKrw;
            return ((x.last - convertedX) / convertedX) * 100 <
              ((y.last - convertedY) / convertedY) * 100
              ? 1
              : -1;
          });
          setSortType(4);
          //sortType.current = 4;
        }
      }
    },
    [sortType, upbitBitKrw]
  );
  return (
    <main>
      <ExchangesContainer>
        <ExchangeItem>Upbit</ExchangeItem>
        <ExchangeItem>Binance</ExchangeItem>
      </ExchangesContainer>
      <SettingBar coinInfo={upbitCoinInfo} upbitBitKrw={upbitBitKrw} />
      <CurrentExchangeBar />
      <ExchangesWrapper>
        <ExchangeCoinsContainer>
          {
            <CoinContainer>
              <Coin head={true} onClick={onSort(upbitCoinInfo)} data-id={1}>
                코인
              </Coin>
              <Coin head={true} onClick={onSort(upbitCoinInfo)} data-id={2}>
                현재 가(₩)
              </Coin>
              <Coin head={true}>최저 가 </Coin>
              <Coin head={true}>최고 가</Coin>
              <Coin head={true} onClick={onSort(upbitCoinInfo)} data-id={3}>
                바이낸스(BTC)
              </Coin>
              <Coin head={true} onClick={onSort(upbitCoinInfo)} data-id={4}>
                차이(%)
              </Coin>
            </CoinContainer>
          }
          {upbitCoinInfo.map((v, idx) => {
            const convertedBinance = (v.blast * upbitBitKrw).toFixed(2);
            const percent = (
              ((v.last - convertedBinance) / convertedBinance) *
              100
            ).toFixed(2);
            return (
              <CoinContainer key={v4()}>
                <Coin>{v.symbol}</Coin>
                <Coin>{v.last}₩</Coin>
                <Coin>{v.low}₩ </Coin>
                <Coin>{v.high}₩</Coin>
                <Coin up={percent > 0}>
                  {v.blast && v.blast.toFixed(8)}
                  <p>{convertedBinance}₩</p>
                </Coin>
                <Coin up={percent > 0}>
                  {percent !== "Infinity" ? `${percent}%` : "로딩중"}
                </Coin>
              </CoinContainer>
            );
          })}
        </ExchangeCoinsContainer>
        <NewListing />
      </ExchangesWrapper>
      <Loading isLoading={loading} />
    </main>
  );
}
export default React.memo(ExchangeList);
