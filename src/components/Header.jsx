import React from 'react';
import { Link } from 'react-router-dom';
import styled from "styled-components";

const Container = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 3px 10px 3px 10px;
  height: 50px;
  border-bottom: 1px solid #e3e3e3;
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
        <Link to={`/event`}>공지사항</Link>
    </Container>
);
export default Header;
