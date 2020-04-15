import React, { useState, useEffect, useCallback, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import { v4 } from "uuid";
import { faMinus, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { checkUpbitCoin, checkBinanceCoin } from "../reducers/coin";
const NewListingDiv = styled.div`
  display: flex;
  flex-direction: column;
  height: ${(props) => (props.hide ? "auto" : "35vh")};
  background: #c4cfd8;
  margin-top: 5px;
  position: fixed;
  right: 10px;
  bottom: 0;
  border-radius: 4px;
  border: 3px solid #d4d2d270;
  box-shadow: 2px 2px 6px 1px;
  overflow: scroll;
  @media (min-width: 1025px) {
    width: auto;
  }
  @media (max-width: 1024px) {
    width: auto;
  }
  @media (max-width: 768px) {
    width: ${(props) => (props.hide ? "auto" : "200px")};
  }
`;
const FontDiv = styled.div`
  display: flex;
  align-self: flex-end;
  margin: 5px;
  svg {
    cursor: pointer;
  }
`;
const NewListingUl = styled.ul`
  display: ${(props) => (props.hide ? "none" : "flex")};
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
  const dispatch = useDispatch();
  const { upbitNewListing, binanceNewListing } = useSelector(
    (state) => state.coin
  );
  const [selected, setSelected] = useState(0);
  const [isHide, setHide] = useState(false);
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
    if (container.current.style.display === "flex") {
      container.current.style.display = "none";
      setHide(true);
    } else {
      container.current.style.display = "flex";
      setHide(false);
    }
  }, []);

  const checkTodaysNotice = useCallback(() => {
    const upbitNewNotices = upbitNewListing.filter((v) => v.new === true);
    const binanceNewNotices = binanceNewListing.filter((v) => v.new === true);
    if (upbitNewNotices.length > 0) {
      dispatch(
        checkUpbitCoin({
          notices: upbitNewNotices, //upbitNewNotices,
        })
      );
    }
    if (binanceNewNotices.length > 0) {
      dispatch(
        checkBinanceCoin({
          notices: binanceNewNotices,
        })
      );
    }
  }, [upbitNewListing, binanceNewListing, dispatch]);
  useEffect(() => {
    checkTodaysNotice();
  }, [checkTodaysNotice]);
  return (
    <NewListingDiv hide={isHide === true}>
      <FontDiv>
        {isHide ? (
          <FontAwesomeIcon icon={faPlus} onClick={onToggle} />
        ) : (
          <FontAwesomeIcon icon={faMinus} onClick={onToggle} />
        )}
      </FontDiv>
      <NewListingUl hide={isHide === true}>
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
