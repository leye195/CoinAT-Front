import React from "react";
import styled from "styled-components";
import { colors } from "../../styles/_variables";

const Button = styled.button`
  padding: 10px;
  width: 100%;
  border: none;
  background: ${colors["gray-100"]};
  font-size: 1.05rem;
  font-weight: bold;
  cursor: pointer;
`;

const LoadMore = React.forwardRef(({ isMore, handleLoadMore }, ref) => {
  return (
    <Button onClick={handleLoadMore} disabled={!isMore} ref={ref}>
      더 보기
    </Button>
  );
});

export default LoadMore;
