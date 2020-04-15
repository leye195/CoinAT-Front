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
} from "../reducers/coin";
import { useDispatch, useSelector } from "react-redux";
import { v4 } from "uuid";
import NewListing from "./NewListing";
const exchangeList = ["Upbit", "Binance"];
const ExchangesWrapper = styled.div`
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
    width: 70%;
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
  padding: 5px;
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
  font-size: 0.8rem;
  margin-right: 5px;
  &:first-child {
  }
  &:nth-child(2) {
  }
  &:nth-child(5) {
    p {
      font-size: 0.6rem;
    }
  }
  &:last-child {
  }
`;
function ExchangeList() {
  const [selected, setSelected] = useState(0);
  const [upbitCoinInfo, setUpbitCoinInfo] = useState([]);
  const [isFirstLoading, setIsFirstLoading] = useState(false);
  const [loading, setLoading] = useState(true);
  const [sortType, setSortType] = useState(0);
  const dispatch = useDispatch();
  const { coinList, upbitBitKrw } = useSelector((state) => state.coin);
  const timer = useRef(null);
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
        /*const converted = (
          tickers2[
            `${tickers1[v].symbol.slice(
              0,
              tickers1[v].symbol.indexOf("/")
            )}/BTC`
          ].last * upbitBitKrw
        ).toFixed(2);*/
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
        if (sortType === -1) return x.symbol > y.symbol ? 1 : -1;
        else if (sortType === 1) return x.symbol < y.symbol ? 1 : -1;
        else if (sortType === -2) return x.last > y.last ? 1 : -1;
        else if (sortType === 2) return x.last < y.last ? 1 : -1;
        else if (sortType === -3) return x.blast > y.blast ? 1 : -1;
        else if (sortType === 3) return x.blast < y.blast ? 1 : -1;
      });
    dispatch(loadUpbitBitKrw());
    dispatch(loadUsdToKrw());
    dispatch(loadBinanceBitUsdt());
    dispatch(loadUpbitNewListing());
    //dispatch(loadBianceNewListing());
    if (loading === true) setLoading(false);
    if (isFirstLoading === false) setIsFirstLoading(true);
    setUpbitCoinInfo(tickers1);
  }, [loading, isFirstLoading, coinList, dispatch, sortType]);
  useEffect(() => {
    timer.current = setTimeout(getExchangeTickers, 2500);
    return () => {
      clearTimeout(timer.current);
    };
  }, [getExchangeTickers]);
  const onSelectExchange = useCallback((e) => {
    setSelected(parseInt(e.target.dataset.id, 10));
    setIsFirstLoading(false);
  }, []);
  const onSort = useCallback(
    (e) => {
      const {
        target: {
          dataset: { id },
        },
      } = e;
      if (parseInt(id, 10) === 1) {
        if (sortType === 1) {
          upbitCoinInfo.sort((x, y) => {
            return x.symbol > y.symbol ? 1 : -1;
          });
          setSortType(-1);
        } else {
          upbitCoinInfo.sort((x, y) => {
            return x.symbol < y.symbol ? 1 : -1;
          });
          setSortType(1);
        }
      } else if (parseInt(id, 10) === 2) {
        if (sortType === 2) {
          upbitCoinInfo.sort((x, y) => {
            return x.last > y.last ? 1 : -1;
          });
          setSortType(-2);
        } else {
          upbitCoinInfo.sort((x, y) => {
            return x.last < y.last ? 1 : -1;
          });
          console.log();
          setSortType(2);
        }
      } else if (parseInt(id, 10) === 3) {
        if (sortType === 3) {
          upbitCoinInfo.sort((x, y) => {
            return x.blast > y.blast ? 1 : -1;
          });
          setSortType(-3);
        } else {
          upbitCoinInfo.sort((x, y) => {
            return x.blast < y.blast ? 1 : -1;
          });
          setSortType(3);
        }
      } else if (parseInt(id, 10) === 4) {
        if (sortType === 4) {
          setSortType(-4);
        } else {
          setSortType(4);
        }
      }
    },
    [sortType, upbitCoinInfo]
  );
  return (
    <div>
      <ExchangesContainer>
        <ExchangeItem>Upbit</ExchangeItem>
        <ExchangeItem>Binance</ExchangeItem>
        <SettingBar coinInfo={upbitCoinInfo} />
      </ExchangesContainer>
      <CurrentExchangeBar />
      <ExchangesWrapper>
        <ExchangeCoinsContainer>
          {
            <CoinContainer>
              <Coin head={true} onClick={onSort} data-id={1}>
                코인
              </Coin>
              <Coin head={true} onClick={onSort} data-id={2}>
                현재 가(₩)
              </Coin>
              <Coin head={true}>최저 가 </Coin>
              <Coin head={true}>최고 가</Coin>
              <Coin head={true} onClick={onSort} data-id={3}>
                바이낸스(BTC)
              </Coin>
              <Coin head={true} onClick={onSort}>
                차이(%)
              </Coin>
            </CoinContainer>
          }
          {upbitCoinInfo.map((v, idx) => {
            const convertedBinance = (v.blast * upbitBitKrw).toFixed(2);
            const percent = (
              ((v.last - convertedBinance) / v.last) *
              100
            ).toFixed(2);
            //console.log(percent);
            return (
              <CoinContainer key={v4()}>
                <Coin>{v.symbol}</Coin>
                <Coin>{v.last}</Coin>
                <Coin>{v.low} </Coin>
                <Coin>{v.high}</Coin>
                <Coin>
                  {v.blast?.toFixed(8)}
                  <p>= {convertedBinance}₩</p>
                </Coin>
                <Coin>{percent}%</Coin>
              </CoinContainer>
            );
          })}
        </ExchangeCoinsContainer>
        <NewListing />
      </ExchangesWrapper>
      <Loading isLoading={loading} />
    </div>
  );
}
export default React.memo(ExchangeList);
