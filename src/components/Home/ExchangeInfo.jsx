import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AiOutlineStar, AiFillStar } from "react-icons/ai";
import styled from "styled-components";
import { v4 } from "uuid";
import { setWatchList } from "reducers/coin";
import Coin from "components/Home/Coin";
import { getPercent } from "utills/utills";

const CoinContainer = styled.section`
  display: flex;
  flex-direction: row;
  padding: 2px;
  border-bottom: 1px solid #e3e3e3;

  & svg {
    height: 1.1rem;
    width: 1.1rem;
  }

  & .watch {
    color: #fbbc03;
  }
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

const ExchangeInfo = ({
  upbitBitKrw,
  fixList = [],
  coinInfo = [],
  type = "KRW",
}) => {
  const dispatch = useDispatch();
  const { watchList } = useSelector((state) => state.coin);

  const handleWatchList = (symbol) => () => {
    dispatch(setWatchList(symbol));
  };

  return coinInfo
    ?.filter(
      (ticker) => ticker.symbol !== "BTC" && !fixList.includes(ticker.symbol),
    )
    .map((v) => {
      const convertedBinance = parseFloat(
        (v.blast * upbitBitKrw).toFixed(2),
        10,
      );
      const percentUP = getPercent(
        v.last,
        type === "KRW" ? convertedBinance : v.blast,
      ).toFixed(2);
      const percentBit = getPercent(v.thumb, convertedBinance).toFixed(2);

      return (
        <CoinContainer key={v4()}>
          <Coin>
            <div className="star__wrapper">
              <button type="button" onClick={handleWatchList(v.symbol)}>
                {!!watchList.find((symbol) => symbol === v.symbol) ? (
                  <AiFillStar className="watch" />
                ) : (
                  <AiOutlineStar className="unwatch" />
                )}
              </button>
            </div>
            <Link to={`/chart/${v.symbol}`}>
              {v.last !== 0 && (
                <CoinImage
                  src={`https://static.upbit.com/logos/${v.symbol}.png`}
                />
              )}
              {v.symbol}
            </Link>
          </Coin>
          <Coin
            head={percentUP === "-100.00"}
            data-type={percentUP === "-100.00" ? "unlist" : "list"}
          >
            {type !== "BTC" ? `${v.last}₩` : `${v.last.toFixed(8)}`}
          </Coin>
          <Coin up={percentUP > 0}>
            {v.blast && v.blast.toFixed(8)}
            {"\n"}
            {type !== "BTC" && `${convertedBinance}₩`}
          </Coin>
          <Coin head={percentUP === "-100.00"} up={percentUP > 0}>
            {percentUP !== "Infinity"
              ? percentUP === "-100.00" || isNaN(percentUP)
                ? "미 상장"
                : `${percentUP}%`
              : "로딩중"}
          </Coin>
          {type !== "BTC" && (
            <Coin
              head={percentBit === "-100.00"}
              data-type={percentBit === "-100.00" ? "unlist" : "list"}
            >
              {v.thumb}₩
            </Coin>
          )}
          {type !== "BTC" && (
            <Coin
              head={percentBit === "-100.00"}
              up={percentBit > 0}
              data-type={percentBit === "-100.00" ? "unlist" : "list"}
            >
              {percentBit !== "Infinity"
                ? percentBit === "-100.00" || isNaN(percentUP)
                  ? "미 상장"
                  : `${percentBit}%`
                : "로딩중"}
            </Coin>
          )}
        </CoinContainer>
      );
    });
};

export default ExchangeInfo;
