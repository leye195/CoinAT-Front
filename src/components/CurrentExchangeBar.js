import React from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";

const ExchangeContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background: #90abbf;
  font-weight: 800;
  color: white;
  text-shadow: 1px 1px 5px #545454;
`;
const Info = styled.p`
  padding-left: 5px;
  padding-right: 2px;
  font-size: 0.75rem;
`;
function CurrentExchangeBar() {
  const { upbitBitKrw, usdToKrw, binanceBitUsdt } = useSelector(
    (state) => state.coin
  );
  const convertUsdToKrw = () => {
    const converted = parseFloat(binanceBitUsdt, 10) * usdToKrw;
    return converted.toFixed(2);
  };
  return (
    <>
      <ExchangeContainer>
        <Info>{`1$: ${usdToKrw}₩`}</Info>
        <Info>{`업비트: ${upbitBitKrw} BTC/KRW`}</Info>
        <Info>{`바이낸스: ${convertUsdToKrw()} BTC/KRW`}</Info>
        <Info>{`차이: ${(
          ((parseFloat(upbitBitKrw, 10) - convertUsdToKrw()) /
            parseFloat(upbitBitKrw, 10)) *
          100
        ).toFixed(2)}%`}</Info>
      </ExchangeContainer>
    </>
  );
}
export default CurrentExchangeBar;
