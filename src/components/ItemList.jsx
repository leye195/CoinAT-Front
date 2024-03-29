import React from "react";
import styled from "styled-components";
import { colors } from "styles/_variables";

const ItemListDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 5px;
`;

const ItemListUl = styled.ul`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  height: 200px;
  padding: 0;
  margin: 0;
  background-color: ${colors.white};
  overflow-y: scroll;
  list-style: none;

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
  padding: 10px;
  width: 100%;
  border: 1px solid ${colors["gray-100"]};
  border-left: 0;
  border-right: 0;
`;

const ItemSpan = styled.span`
  font-size: 0.8rem;
`;

const ItemInput = styled.input`
  padding: 5px;
  width: 30%;
  background-color: ${colors.white};
  border: 2px solid ${colors["gray-100"]};
`;

function ItemList({ coins, onChangePercent }) {
  return (
    <ItemListDiv>
      <ItemListUl>
        <ItemListLi>
          <ItemSpan>BTC</ItemSpan>
          <ItemInput
            type="number"
            min={0}
            max={100}
            step={0.1}
            placeholder="N%"
            onChange={onChangePercent}
            data-name="BTC"
          />
        </ItemListLi>
        {coins &&
          coins.map((coin) => {
            return (
              <ItemListLi key={coin}>
                <ItemSpan>{coin}</ItemSpan>
                <ItemInput
                  type="number"
                  min={0}
                  max={100}
                  step={0.1}
                  placeholder="N%"
                  onChange={onChangePercent}
                  data-name={coin}
                />
              </ItemListLi>
            );
          })}
      </ItemListUl>
    </ItemListDiv>
  );
}
export default React.memo(ItemList);
