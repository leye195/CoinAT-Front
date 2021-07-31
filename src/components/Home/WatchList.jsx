import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import ExchangeInfo from "./ExchangeInfo";

const WatchListContainer = styled.div`
  min-height: 2rem;
  width: 100vw;
  background-color: white;
  text-shadow: none;
  border-bottom: 0.2rem solid rgba(0, 0, 0, 0.5);
`;

const WatchList = () => {
  const { watchList, upbitBitKrw, coinInfo } = useSelector(
    (state) => state.coin,
  );

  return (
    <WatchListContainer>
      {
        <ExchangeInfo
          coinInfo={coinInfo?.filter((ticker) =>
            watchList.includes(ticker.symbol),
          )}
          upbitBitKrw={upbitBitKrw}
        />
      }
    </WatchListContainer>
  );
};

export default WatchList;
