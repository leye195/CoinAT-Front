import React from 'react';
import styled from 'styled-components';

const Button = styled.button`
  padding: 10px;
  width: 100%;
  border: none;
  background: #f9fafc;
  font-size: 1.05rem;
  font-weight: bold;
  cursor: pointer;
`;

const LoadMore = React.forwardRef(({isMore, handleLoadMore},ref) => {
  return <Button onClick={handleLoadMore} disabled={!isMore} ref={ref}>더 보기</Button>
})

export default LoadMore;
