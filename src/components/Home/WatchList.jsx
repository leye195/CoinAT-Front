import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { useLocation } from "react-router-dom";
import queryString from "query-string";

import ExchangeInfo from "components/Home/ExchangeInfo";

import { colors } from "styles/_variables";

const WatchListContainer = styled.div`
  min-height: 2rem;
  width: 100vw;
  background-color: ${colors.white};
  text-shadow: none;
  border-bottom: 0.2rem solid rgba(0, 0, 0, 0.5);
`;

const WatchList = () => {
  const { search } = useLocation();
  const { type } = queryString.parse(search);
  const { watchList, upbitBitKrw, coinInfo } = useSelector(
    (state) => state.coin,
  );

  return (
    <WatchListContainer>
      <ExchangeInfo
        coinInfo={coinInfo?.filter((ticker) =>
          watchList.includes(ticker.symbol),
        )}
        upbitBitKrw={upbitBitKrw}
        type={type}
      />
    </WatchListContainer>
  );
};

export default WatchList;
