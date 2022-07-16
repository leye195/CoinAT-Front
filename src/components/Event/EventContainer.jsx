import React from "react";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  width: 90vw;

  @media (min-width: 992px) {
    flex-direction: row;
    width: 970px;
  }
`;

const EventContainer = ({ children }) => {
  return <Container>{children}</Container>;
};
export default EventContainer;
