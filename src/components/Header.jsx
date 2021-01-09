import React from 'react';
import styled from "styled-components";

const Container = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 0 10px 0 10px;
  height: 20px;
  padding-top: 3px;
  padding-bottom: 3px;
  background-color: #fafafa;

  @media (max-width: 768px) {
    font-size: 0.85rem;
  }
`;
const Title = styled.p`
  font-family: 800;
  font-weight: bold;
`;

const Header = ({title}) => (
    <Container>
        <Title>{title}</Title>
    </Container>
);
export default Header;
