import React, { useRef, useEffect, useCallback } from "react";
import styled from "styled-components";
import { v4 } from "uuid";

const ItemListDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 5px;
`;
const ItemListUl = styled.ul`
  display: flex;
  flex-direction: column;
  list-style: none;
  width: 100%;
  height: 200px;
  padding: 0;
  margin: 0;
  background-color: white;
  margin: 5px;
  padding: 5px;
  overflow-y: scroll;
  /* Hide scrollbar for Chrome, Safari and Opera */
  &::-webkit-scrollbar {
    display: none;
  }
  /* Hide scrollbar for IE and Edge */
  & {
    -ms-overflow-style: none;
  }
`;
const ItemListLi = styled.li`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 5px;
`;
const ItemSpan = styled.span`
  font-size: 0.8rem;
`;
const ItemInput = styled.input`
  background-color: white;
  border: 1px solid #e3e3e3;
  width: 30%;
  padding: 5px;
`;
function ItemList({ coins, onChangePercent }) {
  return (
    <ItemListDiv>
      <ItemListUl>
        {coins &&
          coins.map((coin) => {
            return (
              <ItemListLi>
                <ItemSpan>{coin.symbol}</ItemSpan>
                <ItemInput
                  type="number"
                  min={0}
                  max={100}
                  step={0.1}
                  placeholder="N%"
                  onChange={onChangePercent}
                  data-name={coin.symbol}
                />
              </ItemListLi>
            );
          })}
      </ItemListUl>
    </ItemListDiv>
  );
}
export default React.memo(ItemList);
