import React, { useEffect, useRef, useCallback } from "react";
import styled from "styled-components";
import ExchangeList from "./components/ExchangeList";
import { useDispatch } from "react-redux";
import { loadCoinList, loadUsdToKrw } from "./reducers/coin";
import Notice from "./components/Notice";
const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 10px;
  margin-bottom: 0;
  margin-top: 0;
  height: 20px;
  padding-top: 3px;
  padding-bottom: 3px;
  @media (max-width: 768px) {
    font-size: 0.85rem;
  }
`;
const Title = styled.p`
  font-family: 800;
`;
const App = () => {
  const dispatch = useDispatch();
  let timer = useRef(null);
  const getCurrency = useCallback(() => {
    dispatch(loadUsdToKrw());
    if (!timer.current) {
      timer.current = setTimeout(() => {
        timer.current = null;
        getCurrency();
      }, 8000);
    }
  }, [dispatch]);
  useEffect(() => {
    dispatch(loadCoinList());
  }, [dispatch]);
  return (
    <>
      <Header>
        <Title>CoinAT</Title>
      </Header>
      <Notice />
      <ExchangeList />
    </>
  );
};

export default App;
