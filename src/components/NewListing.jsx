import React, { useState, useCallback, useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import { v4 } from "uuid";
import { faMinus, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { loadUpbitNewListing } from "../reducers/coin";
import { colors } from "../styles/_variables";

const NewListingDiv = styled.div`
  display: flex;
  flex-direction: column;
  height: ${(props) => (props.hide ? "auto" : "45vh")};
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
    width: ${(props) => (props.hide ? "auto" : "270px")};
    height: ${(props) => (props.hide ? "auto" : "65vh")};
  }
  @media (max-width: 1024px) {
    width: ${(props) => (props.hide ? "auto" : "250px")};
  }
  @media (max-width: 768px) {
    width: ${(props) => (props.hide ? "auto" : "200px")};
    opacity: ${(props) => (props.hide ? "0.2" : "1.0")};
  }
`;

const FontDiv = styled.div`
  display: flex;
  align-self: flex-start;
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
  border-bottom: 3px solid ${colors['white']};
  cursor: pointer;
`;
const NewListingli = styled.li`
  list-style: none;
  flex: 1;
  padding: 5px;
  color: ${(props) => (props.selected ? `${colors['black']};` : `${colors['white']};`)};
  font-weight: ${(props) => (props.selected ? '400' : '200')};
  font-size: 0.8rem;
  margin-bottom: 5px;
  word-break: keep-all;
`;
const InfoContainer = styled.div`
  display: ${(props) => (props.hide ?'none' : 'flex')};
  border-top: 1px solid #0404043b;
`;
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
  const [isHide, setHide] = useState(false);
  const container = useRef();
  const timer = useRef();
  const dispatch = useDispatch();
  const onChangeSelect = useCallback((e) => {
    const {
      target: {
        dataset: { id },
      },
    } = e;
    setSelected(parseInt(id, 10));
  }, []);

  const onToggle = useCallback(() => {
    setHide((cur) => !cur);
  }, []);

  const checkSize = () => {
    const innerWidth = window.innerWidth;
    if (innerWidth <= 768) {
      setHide(true);
    }
  };

  const getNewListing = useCallback(() => {
    if (!timer.current) {
      dispatch(loadUpbitNewListing());
      setTimeout(() => {
        timer.current = null;
        getNewListing();
      }, 10000);
    }
  }, [dispatch]);

  useEffect(() => {
    checkSize();
    getNewListing();
    window.addEventListener("resize", checkSize);
    return () => {
      window.removeEventListener("resize", checkSize);
    };
  }, [getNewListing]);

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
      </NewListingUl>
      <InfoContainer ref={container} hide={isHide === true}>
        {selected === 0 ? (
          <UpbitInfoUl>
            {upbitNewListing &&
              upbitNewListing.map((notice) => {
                return (
                  <UpbitInfoli key={v4()}>{notice.notice.title}</UpbitInfoli>
                );
              })}
          </UpbitInfoUl>
        ) : (
          <BinanceInfoUl>
            {binanceNewListing &&
              binanceNewListing.map((notice) => {
                return <BinanceInfoli key={v4()}>{notice.title}</BinanceInfoli>;
              })}
          </BinanceInfoUl>
        )}
      </InfoContainer>
    </NewListingDiv>
  );
}
export default NewListing;
