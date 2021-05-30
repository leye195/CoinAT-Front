import React from "react";
import styled from "styled-components";
import { colors } from "styles/_variables";

const Container = styled.footer`
  min-height: 2.5rem;
  width: 100%;
  margin-top: 1.2rem;
  border-top: 1px solid ${colors["gray-100"]};
  background-color: ${colors["gray-50"]};
`;

const Footer = () => {
  return <Container></Container>;
};

export default Footer;
