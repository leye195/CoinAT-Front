import React from "react";
import styled, { css, keyframes } from "styled-components";

const LoadingAni = keyframes`
    from{
        opacity:0.3;
    }to{
        opacity:0.9;
    }
`;
const LoadingContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: #00000070;
`;
const LoadingBar = styled.div`
  position: absolute;
  border: 3px solid white;
  border-color: white transparent transparent;
  width: ${(props) =>
    props.size === "l" ? "50px" : props.size === "m" ? "30px" : "10px"};
  height: ${(props) =>
    props.size === "l" ? "50px" : props.size === "m" ? "30px" : "10px"};
  border-radius: 50%;
  ${(props) =>
    props.size === "l"
      ? css`
          animation: ${LoadingAni} 1.5s ease-out infinite;
        `
      : props.size === "m"
      ? css`
          animation: ${LoadingAni} 1.5s ease-out infinite;
        `
      : css`
          animation: ${LoadingAni} 1.5s ease-out infinite;
        `}
`;
function Loading({ isLoading }) {
  return (
    <>
      {isLoading ? (
        <LoadingContainer>
          <LoadingBar size="l" />
          <LoadingBar size="m" />
          <LoadingBar size="s" />
        </LoadingContainer>
      ) : (
        <></>
      )}
    </>
  );
}
export default Loading;
