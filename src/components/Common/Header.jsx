import React from "react";
import { Link, NavLink } from "react-router-dom";
import styled from "styled-components";
import { breakDown } from "styles/_mixin";
import { colors } from "styles/_variables";

const Container = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 3px 10px 3px 10px;
  height: 50px;
  border-bottom: 1px solid ${colors["gray-100"]};
  background-color: #525f6e;
  font-weight: bold;
  & a {
    text-decoration: none;
    color: white;
  }

  ${breakDown.md`
    font-size: 0.85rem;
  `}
`;

const Title = styled.p`
  font-family: 800;
  font-size: 1.2rem;
`;

const Header = ({ title }) => (
  <Container>
    <Title>
      <Link to="/">{title}</Link>
    </Title>
    <NavLink activeClassName="" to="/event/upbit">
      소식
    </NavLink>
  </Container>
);
export default Header;
