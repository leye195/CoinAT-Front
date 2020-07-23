import React, { useState, useLayoutEffect, useCallback, useRef } from "react";
import styled from "styled-components";
import Loading from "./Loading";
import CurrentExchangeBar from "./CurrentExchangeBar";
import SettingBar from "./SettingBar";
import {
  loadUpbitBitKrw,
  loadBinanceBitUsdt,
  loadBithumbBitkrw,
} from "../reducers/coin";
import { useDispatch, useSelector } from "react-redux";
import { v4 } from "uuid";
import NewListing from "./NewListing";
import { getPercent } from "../utills";
import { coinTickers } from "../socket";
const ExchangesWrapper = styled.section`
  display: flex;
  flex-direction: column;
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
    width: 65%;
  }
  @media (max-width: 1024px) {
    width: 60%;
  }
  @media (max-width: 768px) {
    width: 100%;
  }
`;
const CoinHeadContainer = styled.section`
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
  @media (min-width: 1025px) {
    width: 65%;
  }
  @media (max-width: 1024px) {
    width: 60%;
  }
  @media (max-width: 768px) {
    width: 100%;
  }
`;
const CoinContainer = styled.section`
  display: flex;
  flex-direction: row;
  padding: 2px;
  border-bottom: 1px solid #e3e3e3;
`;
const Coin = styled.p`
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
  margin: 0;
  white-space: pre;
  @media (max-width: 768px) {
    font-size: 0.7rem;
  }
  &:nth-child(2),
  &:nth-child(5) {
    color: ${(props) => (props.head === true ? "black" : "#27ae60")};
    font-weight: ${(props) => (props.head === true ? "800" : "600")};
  }
  &:nth-child(3) {
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
  &:nth-child(4),
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
  //const [sortType, setSortType] = useState(-1);
  const dispatch = useDispatch();
  const { coinList, upbitBitKrw } = useSelector((state) => state.coin);
  const info = useRef([]);
  const sortType = useRef(-1);
  const timer = useRef(null);
  const getExchangeTickers = useCallback(() => {
    if (isFirstLoading === false && loading === false) setLoading(true);
    if (coinTickers && coinTickers.tickers) {
      let info = [...coinTickers.tickers]?.sort((x, y) => {
        if (sortType.current === -1) return x.symbol > y.symbol ? 1 : -1;
        else if (sortType.current === 1) return x.symbol < y.symbol ? 1 : -1;
        else if (sortType.current === -2) return x.last > y.last ? 1 : -1;
        else if (sortType.current === 2) return x.last < y.last ? 1 : -1;
        else if (sortType.current === -3) return x.blast > y.blast ? 1 : -1;
        else if (sortType.current === 3) return x.blast < y.blast ? 1 : -1;
        else if (sortType.current === -4) {
          if (x.per1 !== undefined && y.per1 !== undefined) {
            return x.per1 > y.per1 ? 1 : -1;
          } else {
            if (x.per1 === undefined) {
              return -1;
            } else if (y.per1 === undefined) {
              return 1;
            }
          }
        } else if (sortType.current === 4) {
          if (x.per1 !== undefined && y.per1 !== undefined) {
            return x.per1 < y.per1 ? 1 : -1;
          } else {
            if (x.per1 === undefined) {
              return 1;
            } else if (y.per1 === undefined) {
              return -1;
            }
          }
        }
      });
      dispatch(
        loadUpbitBitKrw({
          BTC: info.filter((ticker) => ticker.symbol === "BTC")[0]?.last || 0,
        })
      );
      dispatch(
        loadBithumbBitkrw({
          BTC: info.filter((ticker) => ticker.symbol === "BTC")[0]?.thumb || 0,
        })
      );
      dispatch(
        loadBinanceBitUsdt({
          BTC: info.filter((ticker) => ticker.symbol === "BTC")[0]?.blast || 0,
        })
      );
      if (loading === true) setLoading(false);
      if (isFirstLoading === false) setIsFirstLoading(true);
      setUpbitCoinInfo(info);
      if (!timer.current) {
        timer.current = setTimeout(() => {
          timer.current = null;
          getExchangeTickers();
        }, 2000);
      }
    }
  }, [loading, isFirstLoading, dispatch, sortType]);

  useLayoutEffect(() => {
    if (timer.current === null) getExchangeTickers();
    return () => {
      //clearTimeout(timer.current);
    };
  }, [getExchangeTickers, upbitBitKrw, coinList, info]);
  const onSort = useCallback(
    (coinInfo) => (e) => {
      const {
        target: {
          dataset: { id },
        },
      } = e;
      if (parseInt(id, 10) === 1) {
        if (sortType.current === 1) {
          coinInfo.sort((x, y) => {
            return x.symbol > y.symbol ? 1 : -1;
          });
          sortType.current = -1;
          //setSortType(-1);
        } else {
          coinInfo.sort((x, y) => {
            return x.symbol < y.symbol ? 1 : -1;
          });
          sortType.current = 1;
          //setSortType(1);
        }
      } else if (parseInt(id, 10) === 2) {
        if (sortType.current === 2) {
          coinInfo.sort((x, y) => {
            return x.last > y.last ? 1 : -1;
          });
          sortType.current = -2;
          //setSortType(-2);
        } else {
          coinInfo.sort((x, y) => {
            return x.last < y.last ? 1 : -1;
          });
          sortType.current = 2;
          //setSortType(2);
        }
      } else if (parseInt(id, 10) === 3) {
        if (sortType.current === 3) {
          coinInfo.sort((x, y) => {
            return x.blast > y.blast ? 1 : -1;
          });
          sortType.current = -3;
          //setSortType(-3);
        } else {
          coinInfo.sort((x, y) => {
            return x.blast < y.blast ? 1 : -1;
          });
          sortType.current = 3;
          //setSortType(3);
        }
      } else if (parseInt(id, 10) === 4) {
        if (sortType.current === 4) {
          coinInfo.sort((x, y) => {
            if (x.per1 !== undefined && y.per1 !== undefined) {
              return x.per1 > y.per1 ? 1 : -1;
            } else {
              if (x.per1 === undefined) {
                return -1;
              } else if (y.per1 === undefined) {
                return 1;
              } else {
                return -1;
              }
            }
          });
          sortType.current = -4;
        } else {
          coinInfo.sort((x, y) => {
            if (x.per1 !== undefined && y.per1 !== undefined) {
              return x.per1 < y.per1 ? 1 : -1;
            } else {
              if (x.per1 === undefined) {
                return 1;
              } else if (y.per1 === undefined) {
                return -1;
              } else {
                return -1;
              }
            }
          });
          sortType.current = 4;
          //setSortType(4);
        }
      }
    },
    [sortType]
  );
  return (
    <main>
      <ExchangesContainer>
        <ExchangeItem>Upbit</ExchangeItem>
        <ExchangeItem>Binance</ExchangeItem>
        <ExchangeItem>Bithumb</ExchangeItem>
      </ExchangesContainer>
      <SettingBar coinInfo={upbitCoinInfo} upbitBitKrw={upbitBitKrw} />
      <CurrentExchangeBar />
      <ExchangesWrapper>
        <CoinHeadContainer>
          <Coin head={true} onClick={onSort(upbitCoinInfo)} data-id={1}>
            코인
          </Coin>
          <Coin head={true} onClick={onSort(upbitCoinInfo)} data-id={2}>
            업비트(₩)
          </Coin>
          <Coin head={true} onClick={onSort(upbitCoinInfo)} data-id={3}>
            바이낸스(BTC)
          </Coin>
          <Coin head={true} onClick={onSort(upbitCoinInfo)} data-id={4}>
            차이(%)
          </Coin>
          <Coin head={true} onClick={onSort(upbitCoinInfo)} data-id={5}>
            빗썸(₩)
          </Coin>
          <Coin head={true} onClick={onSort(upbitCoinInfo)} data-id={6}>
            차이(%)
          </Coin>
        </CoinHeadContainer>
        <ExchangeCoinsContainer>
          {upbitCoinInfo
            ?.filter((ticker) => ticker.symbol !== "BTC")
            .map((v) => {
              const convertedBinance = parseFloat(
                (v.blast * upbitBitKrw).toFixed(2),
                10
              );
              const percentUP = getPercent(v.last, convertedBinance).toFixed(2);
              const percentBit = getPercent(v.thumb, convertedBinance).toFixed(
                2
              );
              return (
                <CoinContainer key={v4()}>
                  <Coin>{v.symbol}</Coin>
                  <Coin
                    head={percentUP === "-100.00"}
                    data-type={percentUP === "-100.00" ? "unlist" : "list"}
                  >
                    {v.last}₩
                  </Coin>
                  <Coin up={percentUP > 0}>
                    {v.blast && v.blast.toFixed(8)}
                    {"\n"}
                    {convertedBinance}₩
                  </Coin>
                  <Coin head={percentUP === "-100.00"} up={percentUP > 0}>
                    {percentUP !== "Infinity"
                      ? percentUP === "-100.00"
                        ? "미 상장"
                        : `${percentUP}%`
                      : "로딩중"}
                  </Coin>
                  <Coin
                    head={percentBit === "-100.00"}
                    data-type={percentBit === "-100.00" ? "unlist" : "list"}
                  >
                    {v.thumb}₩
                  </Coin>
                  <Coin
                    head={percentBit === "-100.00"}
                    up={percentBit > 0}
                    data-type={percentBit === "-100.00" ? "unlist" : "list"}
                  >
                    {percentBit !== "Infinity"
                      ? percentBit === "-100.00"
                        ? "미 상장"
                        : `${percentBit}%`
                      : "로딩중"}
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
