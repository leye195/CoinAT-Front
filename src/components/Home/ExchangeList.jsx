import React, { useState, useLayoutEffect, useCallback, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { v4 } from "uuid";
import styled, { css } from "styled-components";
import Loading from "../Loading";
import CurrentExchangeBar from "./CurrentExchangeBar";
import SettingBar from "./SettingBar";
import {
  loadUpbitBitKrw,
  loadBinanceBitUsdt,
  loadBithumbBitkrw,
  loadUsdToKrw,
  loadUpbitNewListing,
} from "../../reducers/coin";
import { getPercent, combineTickers } from "../../utills/utills";


const Container = styled.main`
  min-height: 100vh;
`;

const ExchangesWrapper = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  ${(props) =>
    props.isFixed &&
    css`
      padding-top: ${props.offsetHeight + 10}px;
    `}
`;
const ExchangeCoinsContainer = styled.div`
  display: flex;
  flex-direction: column;
  @media (min-width: 1025px) {
    width: 80%;
    margin: 0 auto;
  }
  @media (max-width: 1024px) {
    width: 90%;
    padding: 2px;
    margin: 0 auto;
  }
  @media (max-width: 768px) {
    width: 100%;
    padding: 0px;
  }
`;
const CoinHeadContainer = styled.section`
  display: flex;
  flex-direction: row;
  padding-top: 3px;
  padding-bottom: 3px;
  border-bottom: 1px solid #e3e3e3;
  &:first-child {
    font-weight: 800;
  }
  &:last-child {
    border-bottom: none;
  }
  @media (min-width: 1025px) {
    width: 80%;
    margin: 0 auto;
  }
  @media (max-width: 1024px) {
    width: 90%;
    margin: 0 auto;
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
const CoinImage = styled.img`
  height: 20px;
  width: 20px;
  margin-right: 2px;
  border: 1px solid #e3e3e3;
  border-radius: 50%;
  @media (max-width: 768px) {
    height: 10px;
    width: 10px;
  }
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
  &:first-child {
    flex-direction: row;
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
        ? "#e74c3c"
        : "#0984e3"};
    border-radius: 10px;
  }
`;

function ExchangeList() {
  const [upbitCoinInfo, setUpbitCoinInfo] = useState([]);
  const [isFirstLoading, setIsFirstLoading] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isFixed, setIsFixed] = useState(false);
  const [navTop, setNavTop] = useState(null);
  
  const nav = useRef(null);
  const info = useRef([]);
  const sortType = useRef(-1);
  const timer = useRef(null);

  const dispatch = useDispatch();
  const { coinList, upbitBitKrw } = useSelector((state) => state.coin);

  const getExchangeTickers = useCallback(() => {
    if (isFirstLoading === false && loading === false) setLoading(true);
    const coinTickers = combineTickers(upbitBitKrw, coinList);
    //console.log(coinTickers);
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
      dispatch(loadUsdToKrw());
      dispatch(loadUpbitNewListing());
      if (!timer.current) {
        timer.current = setTimeout(() => {
          timer.current = null;
          getExchangeTickers();
        }, 1300);
      }
    }
  }, [loading, isFirstLoading, dispatch, sortType, coinList, upbitBitKrw]);

  const navFix = () => {
    if (window.scrollY >= navTop) {
      //console.log("fixed");
      setIsFixed(true);
    } else {
      //console.log("normal");
      setIsFixed(false);
    }
  };

  useEffect(() => {
    if (navTop === null) setNavTop(nav.current.offsetTop);
    window.addEventListener("scroll", navFix);
    return () => {
      window.removeEventListener("scroll", navFix);
    };
  }, [navTop]);
  
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
    <Container>
      <SettingBar coinInfo={upbitCoinInfo} upbitBitKrw={upbitBitKrw} />
      <CurrentExchangeBar nav={nav} isFixed={isFixed} />
      <ExchangesWrapper
        isFixed={isFixed}
        offsetHeight={nav.current !== null && nav.current.offsetHeight}
      >
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
                  <Coin>
                    {v.last !== 0 && (
                      <CoinImage
                        src={`https://static.upbit.com/logos/${v.symbol}.png`}
                      />
                    )}
                    {v.symbol}
                  </Coin>
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
                      ? percentUP === "-100.00"||isNaN(percentUP)
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
                      ? percentBit === "-100.00"||isNaN(percentUP)
                        ? "미 상장"
                        : `${percentBit}%`
                      : "로딩중"}
                  </Coin>
                </CoinContainer>
              );
            })}
        </ExchangeCoinsContainer>
      </ExchangesWrapper>
      {(loading || upbitCoinInfo.length < coinList.length) && (
        <Loading isLoading={true} />
      )}
    </Container>
  );
}
export default React.memo(ExchangeList);
