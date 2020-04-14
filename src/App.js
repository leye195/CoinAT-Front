import React from "react";
import styled from "styled-components";
import ExchangeList from "./components/ExchangeList";
const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 10px;
  margin-bottom: 0;
  margin-top: 0;
`;
const Title = styled.p`
  font-family: 800;
`;
function App() {
  return (
    <div>
      <Header>
        <Title>CoinAT</Title>
      </Header>
      <ExchangeList />
    </div>
  );
}

export default App;
