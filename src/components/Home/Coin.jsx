import React from "react";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 0.1rem 0;
  margin-left: 3px;
  margin: 0;
  width: 30%;
  min-height: 2rem;
  word-break: break-all;
  font-size: 0.85rem;
  color: black;
  white-space: pre;
  cursor: ${(props) => (props.head ? "pointer" : "normal")};

  @media (max-width: 768px) {
    font-size: 0.7rem;
  }

  &:first-child {
    flex-direction: row;
  }

  &:nth-child(2),
  &:nth-child(5) {
    color: ${(props) => (props.head === true ? "black" : "#27ae60")};
    font-weight: ${(props) => (props.head === true ? "800" : "600")};
  }

  &:nth-child(3) {
    color: ${(props) =>
      props.head === true
        ? "black"
        : props.up === true
        ? "#e74c3c"
        : "#0984e3"};
    font-weight: ${(props) =>
      props.head === true ? "800" : props.up === true ? "600" : "600"};
    p {
      font-size: 0.85rem;
      margin-bottom: 0;
      margin-top: 0;
      @media (max-width: 768px) {
        font-size: 0.7rem;
      }
      @media (max-width: 425px) {
        align-self: flex-start;
      }
    }
  }

  &:nth-child(4),
  &:nth-child(6) {
    color: ${(props) =>
      props.head === true
        ? "black"
        : props.up === true
        ? "#e74c3c"
        : "#0984e3"};
    border-radius: 10px;
  }

  & > a {
    display: inherit;
    align-items: inherit;
    justify-content: inherit;
    color: black;
    text-decoration: none;
  }

  & .star__wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0 0;

    & > button {
      padding-left: 0.5rem;
      background-color: inherit;
      border: none;
      cursor: pointer;
    }
  }
`;

const Coin = ({ children, head, up, handleClick, id }) => {
  return (
    <Container head={head} up={up} onClick={handleClick} data-id={id}>
      {children}
    </Container>
  );
};

export default Coin;
