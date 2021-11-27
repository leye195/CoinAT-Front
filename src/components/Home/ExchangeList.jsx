import React, {
  useState,
  useLayoutEffect,
  useCallback,
  useRef,
  useEffect,
} from "react";
import { useDispatch, useSelector } from "react-redux";
import styled, { css } from "styled-components";
import Loading from "components/Loading";
import ExchangeInfo from "components/Home/ExchangeInfo";
import CurrentExchangeBar from "components/Home/CurrentExchangeBar";
import Coin from "components/Home/Coin";
import {
  loadUpbitBitKrw,
  loadBinanceBitUsdt,
  loadBithumbBitkrw,
  loadUsdToKrw,
  setCoinInfo,
} from "reducers/coin";
import { combineTickers } from "utills/utills";

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

function ExchangeList() {
  const [upbitCoinInfo, setUpbitCoinInfo] = useState([]);
  const [isFirstLoading, setIsFirstLoading] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isFixed, setIsFixed] = useState(false);
  const [navTop, setNavTop] = useState(null);

  const nav = useRef(null);
  const sortType = useRef(-1);
  const isMounted = useRef(false);
  const timer = useRef(null);

  const dispatch = useDispatch();
  const { coinList, upbitBitKrw, watchList } = useSelector(
    (state) => state.coin,
  );

  const getExchangeTickers = useCallback(() => {
    if (isFirstLoading === false && loading === false) setLoading(true);
    const coinTickers = combineTickers(upbitBitKrw, coinList);

    if (coinTickers && coinTickers.tickers) {
      const info = [...coinTickers.tickers]?.sort((x, y) => {
        if (sortType.current === -1) return x.symbol > y.symbol ? 1 : -1;
        if (sortType.current === 1) return x.symbol < y.symbol ? 1 : -1;
        if (sortType.current === -2) return x.last > y.last ? 1 : -1;
        if (sortType.current === 2) return x.last < y.last ? 1 : -1;
        if (sortType.current === -3) return x.blast > y.blast ? 1 : -1;
        if (sortType.current === 3) return x.blast < y.blast ? 1 : -1;
        if (sortType.current === -4) {
          if (x.per1 !== undefined && y.per1 !== undefined) {
            return x.per1 > y.per1 ? 1 : -1;
          }
          if (x.per1 === undefined) {
            return -1;
          }
          if (y.per1 === undefined) {
            return 1;
          }
        } else if (sortType.current === 4) {
          if (x.per1 !== undefined && y.per1 !== undefined) {
            return x.per1 < y.per1 ? 1 : -1;
          }
          if (x.per1 === undefined) {
            return 1;
          }
          if (y.per1 === undefined) {
            return -1;
          }
        }
        return 0;
      });

      dispatch(
        loadUpbitBitKrw({
          BTC: info.filter((ticker) => ticker.symbol === "BTC")[0]?.last || 0,
        }),
      );
      dispatch(
        loadBithumbBitkrw({
          BTC: info.filter((ticker) => ticker.symbol === "BTC")[0]?.thumb || 0,
        }),
      );
      dispatch(
        loadBinanceBitUsdt({
          BTC: info.filter((ticker) => ticker.symbol === "BTC")[0]?.blast || 0,
        }),
      );
      if (loading === true) setLoading(false);
      if (isFirstLoading === false) setIsFirstLoading(true);
      setUpbitCoinInfo(info);
      dispatch(setCoinInfo(info));
      dispatch(loadUsdToKrw());
      if (!timer.current) {
        timer.current = setTimeout(() => {
          timer.current = null;
          getExchangeTickers();
        }, 1000);
      }
    }
  }, [loading, isFirstLoading, dispatch, sortType, coinList, upbitBitKrw]);

  const navFix = useCallback(() => {
    if (window.scrollY >= navTop) {
      setIsFixed(true);
    } else {
      setIsFixed(false);
    }
  }, [navTop]);

  useEffect(() => {
    isMounted.current = true;
    return () => {
      if (isMounted.current) {
        clearTimeout(timer.current);
      }
      isMounted.current = false;
    };
  }, []);

  useEffect(() => {
    if (navTop === null) setNavTop(nav.current.offsetTop);
    window.addEventListener("scroll", navFix);
    return () => {
      window.removeEventListener("scroll", navFix);
    };
  }, [navTop, navFix]);

  useLayoutEffect(() => {
    if (timer.current === null) getExchangeTickers();
  }, [getExchangeTickers]);

  const onSort = useCallback(
    (coinInfo) => (e) => {
      const {
        target: {
          dataset: { id },
        },
      } = e;
      const coinInfoList = [...coinInfo];

      if (parseInt(id, 10) === 1) {
        if (sortType.current === 1) {
          coinInfoList.sort((x, y) => {
            return x.symbol > y.symbol ? 1 : -1;
          });
          sortType.current = -1;
        } else {
          coinInfoList.sort((x, y) => {
            return x.symbol < y.symbol ? 1 : -1;
          });
          sortType.current = 1;
        }
      } else if (parseInt(id, 10) === 2) {
        if (sortType.current === 2) {
          coinInfoList.sort((x, y) => {
            return x.last > y.last ? 1 : -1;
          });
          sortType.current = -2;
        } else {
          coinInfoList.sort((x, y) => {
            return x.last < y.last ? 1 : -1;
          });
          sortType.current = 2;
        }
      } else if (parseInt(id, 10) === 3) {
        if (sortType.current === 3) {
          coinInfoList.sort((x, y) => {
            return x.blast > y.blast ? 1 : -1;
          });
          sortType.current = -3;
        } else {
          coinInfoList.sort((x, y) => {
            return x.blast < y.blast ? 1 : -1;
          });
          sortType.current = 3;
        }
      } else if (parseInt(id, 10) === 4) {
        if (sortType.current === 4) {
          coinInfoList.sort((x, y) => {
            if (x.per1 !== undefined && y.per1 !== undefined) {
              return x.per1 > y.per1 ? 1 : -1;
            }
            if (x.per1 === undefined) {
              return -1;
            }
            if (y.per1 === undefined) {
              return 1;
            }
            return -1;
          });
          sortType.current = -4;
        } else {
          coinInfoList.sort((x, y) => {
            if (x.per1 !== undefined && y.per1 !== undefined) {
              return x.per1 < y.per1 ? 1 : -1;
            }
            if (x.per1 === undefined) {
              return 1;
            }
            if (y.per1 === undefined) {
              return -1;
            }
            return -1;
          });
          sortType.current = 4;
        }
      }
    },
    [sortType],
  );

  return (
    <Container>
      <CurrentExchangeBar nav={nav} isFixed={isFixed} />
      <ExchangesWrapper
        isFixed={isFixed}
        offsetHeight={nav.current !== null && nav.current.offsetHeight}
      >
        <CoinHeadContainer>
          <Coin head handleClick={onSort(upbitCoinInfo)} id={1}>
            코인
          </Coin>
          <Coin head handleClick={onSort(upbitCoinInfo)} id={2}>
            업비트(₩)
          </Coin>
          <Coin head handleClick={onSort(upbitCoinInfo)} id={3}>
            바이낸스(BTC)
          </Coin>
          <Coin head handleClick={onSort(upbitCoinInfo)} id={4}>
            차이(%)
          </Coin>
          <Coin head handleClick={onSort(upbitCoinInfo)} id={5}>
            빗썸(₩)
          </Coin>
          <Coin head handleClick={onSort(upbitCoinInfo)} id={6}>
            차이(%)
          </Coin>
        </CoinHeadContainer>
        <ExchangeCoinsContainer>
          <ExchangeInfo
            upbitBitKrw={upbitBitKrw}
            coinInfo={upbitCoinInfo}
            fixList={watchList}
          />
        </ExchangeCoinsContainer>
      </ExchangesWrapper>
      {(loading || upbitCoinInfo.length < coinList.length) && (
        <Loading isLoading />
      )}
    </Container>
  );
}
export default React.memo(ExchangeList);
