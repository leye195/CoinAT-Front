import React, { useEffect } from "react";
import styled from "styled-components";
import ExchangeList from "./components/ExchangeList";
import { useDispatch } from "react-redux";
import { loadCoinList } from "./reducers/coin";
const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 10px;
  margin-bottom: 0;
  margin-top: 0;
  height: 20px;
  @media (max-width: 768px) {
    font-size: 0.85rem;
  }
`;
const Title = styled.p`
  font-family: 800;
`;
function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadCoinList());
  });
  return (
    <>
      <Header>
        <Title>CoinAT</Title>
      </Header>
      <ExchangeList />
    </>
  );
}

export default App;
