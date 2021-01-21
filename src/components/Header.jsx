import React from 'react';
import { Link } from 'react-router-dom';
import styled from "styled-components";

const Container = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 0 10px 0 10px;
  height: 50px;
  padding-top: 3px;
  padding-bottom: 3px;
  background-color: #fafafa;

  & a {
    text-decoration: none;
    color: black;
  }
  
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
        <Title>
          <Link to={'/'}>
            {title}
          </Link>
        </Title>
        <Link to={`/event`}>Event</Link>
    </Container>
);
export default Header;
