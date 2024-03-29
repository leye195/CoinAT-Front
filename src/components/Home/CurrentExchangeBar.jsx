import React, { useEffect, useMemo, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled, { css } from "styled-components";
import { setBtc } from "reducers/coin";

import WatchList from "components/Home/WatchList";

import { colors } from "styles/_variables";
import { breakDown } from "styles/_mixin";

const ExchangeContainer = styled.section`
  ${(props) =>
    props.isFixed
      ? css`
          top: 0;
          position: fixed;
          opacity: 0.9;
          box-shadow: 0px 2px 7px 1px rgb(0 0 0 / 0.12);
          width: 100%;
        `
      : css`
          position: relative;
        `}
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: ${colors.blueSky};
  font-weight: 800;
  color: ${colors.white};
  text-shadow: 1px 1px 5px #545454;
  min-height: 35px;
  transition: all 0.5;

  ${breakDown.md`
    width: 100%;
    min-height: 6vh;
  `};
`;
const InfoContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Info = styled.p`
  padding-left: 5px;
  padding-right: 2px;
  font-size: 1rem;
  margin: 0;
  padding: 4px;

  ${breakDown.md`
    font-size: 0.85rem;
    word-break: inherit;
    display: flex;
    align-items: center;
    justify-content: center;
  `};

  @media (max-width: 581px) {
    font-size: 0.75rem;
  }
`;

function CurrentExchangeBar({ nav, isFixed }) {
  const dispatch = useDispatch();
  const { upbitBitKrw, usdToKrw, binanceBitUsdt, bithumbBitKrw, watchList } =
    useSelector((state) => state.coin);

  const [differene, setDifference] = useState(0);
  const [usdtRate, setUsdtRate] = useState(0);

  const convertUsdToKrw = useMemo(() => {
    const converted = parseFloat(binanceBitUsdt, 10) * usdToKrw;
    return converted.toFixed(2);
  }, [binanceBitUsdt, usdToKrw]);

  useEffect(() => {
    const converted = convertUsdToKrw;
    const percent1 = (
      ((parseFloat(upbitBitKrw, 10) - convertUsdToKrw) / convertUsdToKrw) *
      100
    ).toFixed(2);
    const percent2 = (
      ((parseFloat(bithumbBitKrw, 10) - convertUsdToKrw) / convertUsdToKrw) *
      100
    ).toFixed(2);

    if (converted && upbitBitKrw) {
      const difference =
        ((parseFloat(upbitBitKrw, 10) - convertUsdToKrw) / convertUsdToKrw) *
        100;
      setDifference(difference);
      setUsdtRate(usdToKrw * (1 + difference / 100));
    }

    dispatch(
      setBtc({
        symbol: "BTC",
        last: upbitBitKrw,
        converted: parseFloat(converted, 10),
        percent1: parseFloat(percent1, 10),
        thumb: bithumbBitKrw,
        percent2: parseFloat(percent2, 10),
      }),
    );
  }, [convertUsdToKrw, dispatch, upbitBitKrw, bithumbBitKrw, usdToKrw]);

  return (
    <>
      <ExchangeContainer ref={nav} isFixed={isFixed}>
        <InfoContainer>
          <Info>{`1$: ${usdToKrw}₩`}</Info>
          <Info>{`업비트: ${upbitBitKrw} BTC/KRW`}</Info>
          <Info>{`바이낸스: ${convertUsdToKrw} BTC/KRW`}</Info>
          <Info>{`차이: ${differene.toFixed(2)}%`}</Info>
          <Info>{`1USDT: ${usdtRate.toFixed(3)}₩`}</Info>
        </InfoContainer>
        {!!watchList.length && (
          <InfoContainer>
            <WatchList />
          </InfoContainer>
        )}
      </ExchangeContainer>
    </>
  );
}
export default CurrentExchangeBar;
