import React, { useState, useCallback, useRef } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { v4 } from "uuid";
import { faWindowMinimize } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
const NewListingDiv = styled.div`
  width: 40%;
  height: 35vh;
  background: #c4cfd8;
  margin-top: 5px;
  position: fixed;
  right: 0;
  bottom: 0;
  border-radius: 4px;
  border: 3px solid #d4d2d270;
  box-shadow: 2px 2px 6px 1px;
  overflow: scroll;
`;
const FontDiv = styled.div`
  display: "flex";
  align-self: "flex-end";
  align-items: "center";
  justify-content: "center";
`;
const NewListingUl = styled.ul`
  display: flex;
  padding: 0;
  align-items: center;
  justify-content: center;
  text-align: center;
  margin: 0;
  border-bottom: 3px solid #ffffff;
  cursor: pointer;
`;
const NewListingli = styled.li`
  list-style: none;
  flex: 1;
  padding: 5px;
  color: ${(props) => (props.selected ? "black" : "#ffffff")};
  font-weight: ${(props) => (props.selected ? "400" : "200")};
  font-size: 0.8rem;
  margin-bottom: 5px;
  word-break: keep-all;
`;
const InfoContainer = styled.div``;
const UpbitInfoUl = styled.ul`
  display: flex;
  flex-direction: column;
  padding: 5px;
  margin: 2px;
`;
const UpbitInfoli = styled.li`
  list-style: none;
  font-size: 0.8rem;
  margin-bottom: 5px;
  font-weight: ${(props) => (props.new ? "600" : "300")};
`;
const BinanceInfoUl = UpbitInfoUl.withComponent("ul");
const BinanceInfoli = styled(UpbitInfoli.withComponent("li"))`
  font-weight: ${(props) => (props.new ? "600" : "300")};
`;
function NewListing() {
  const { upbitNewListing, binanceNewListing } = useSelector(
    (state) => state.coin
  );
  const [selected, setSelected] = useState(0);
  const container = useRef();
  const onChangeSelect = useCallback((e) => {
    const {
      target: {
        dataset: { id },
      },
    } = e;
    setSelected(parseInt(id, 10));
  }, []);
  const onToggle = useCallback(() => {
    if (container.current.style.display === "flex")
      container.current.style.display = "none";
    else container.current.style.display = "flex";
  }, []);
  return (
    <NewListingDiv>
      <FontDiv>
        <FontAwesomeIcon icon={faWindowMinimize} onClick={onToggle} />
      </FontDiv>
      <NewListingUl>
        <NewListingli
          data-id={0}
          onClick={onChangeSelect}
          selected={selected === 0}
        >
          업비트 상장
        </NewListingli>
        <NewListingli
          data-id={1}
          onClick={onChangeSelect}
          selected={selected === 1}
        >
          바이낸스 상장
        </NewListingli>
      </NewListingUl>
      <InfoContainer style={{ display: "flex" }} ref={container}>
        {selected === 0 ? (
          <UpbitInfoUl>
            {upbitNewListing &&
              upbitNewListing.map((v) => {
                return (
                  <UpbitInfoli key={v4()} new={v.new === true}>
                    {v.notice.title}
                  </UpbitInfoli>
                );
              })}
          </UpbitInfoUl>
        ) : (
          <BinanceInfoUl>
            {binanceNewListing &&
              binanceNewListing.map((v) => {
                return (
                  <BinanceInfoli key={v4()} new={v.new === true}>
                    {v.notice.title}
                  </BinanceInfoli>
                );
              })}
          </BinanceInfoUl>
        )}
      </InfoContainer>
    </NewListingDiv>
  );
}
export default NewListing;
