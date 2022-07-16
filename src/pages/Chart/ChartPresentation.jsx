import React from "react";
import styled from "styled-components";
import { breakUp } from "styles/_mixin";

const Container = styled.div`
  margin: 0 auto;
  padding-top: 20px;
  width: 95%;
  height: calc(100vh - 90px);

  ${breakUp.lg`
      max-width: 1550px;
      width: 80%;
  `}
`;

const TradeChartWrapper = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: center;
  flex-direction: column;
  margin-top: 0.5rem;
  margin: 0 auto;
  height: 500px;
  position: relative;
  overflow: hidden;
`;

const TitleWrapper = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: center;
  flex-direction: column;
  margin: 20px 0 5px 0;
  position: relative;
  font-weight: bold;

  &::before {
    position: absolute;
    content: "";
    width: 5px;
    height: 80%;
    background-color: #accff7;
  }
`;

const ExchangeTitle = styled.p`
  margin: 0 0 0.5rem 0;
  padding-left: 10px;
  opacity: 0.6;
`;

const CoinTitle = styled.p`
  margin: 0 0 0.5rem 0;
  padding-left: 10px;
  font-size: 1.5rem;
`;

const PriceWrapper = styled.div`
  margin: 0.5rem auto 0.5rem auto;
  width: 95%;
`;

const Price = styled.span`
  font-weight: bold;
  font-size: 1.5rem;
`;

const CurrencyType = styled.span`
  margin-left: 5px;
`;

const TradeChart = styled.div`
  width: 95%;
  height: 100%;
  padding: 10px;
  margin: 0 auto;
  border: 1px solid #e3e3e3;
  border-radius: 10px;
`;

const ButtonGroup = styled.div`
  width: 95%;
  margin: 0 auto;
  padding: 5px 0;
`;

const Button = styled.button`
  font-weight: bold;
  background-color: white;
  border: 1px solid #d3d3d3;
  outline: none;
  cursor: pointer;
`;

const ChartPresentation = ({ name, chartData, handleClick, chartRef }) => {
  return (
    <Container>
      <TitleWrapper>
        <CoinTitle>{name}/KRW 거래</CoinTitle>
        <ExchangeTitle>Upbit(업비트)</ExchangeTitle>
      </TitleWrapper>
      <PriceWrapper>
        <Price>
          {chartData && !!chartData.length
            ? chartData.slice(-1)[0].trade_price
            : 0}
        </Price>
        <CurrencyType>KRW</CurrencyType>
      </PriceWrapper>
      <TradeChartWrapper>
        <ButtonGroup>
          <Button onClick={handleClick("months")}>1달</Button>
          <Button onClick={handleClick("weeks")}>1주</Button>
          <Button onClick={handleClick("days")}>1일</Button>
          <Button onClick={handleClick("minutes")}>3분</Button>
        </ButtonGroup>
        <TradeChart ref={chartRef} />
      </TradeChartWrapper>
    </Container>
  );
};

export default ChartPresentation;
