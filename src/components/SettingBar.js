import React, { useCallback, useState, useRef, useEffect } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { sendMessage, cancelMessage } from "../reducers/bot";
import { faCog } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ItemList from "./ItemList";
import SettingTrade from "./SettingTrade";
const SettingBarDiv = styled.div`
  position: fixed;
  top: 0;
  right: 10px;
  padding-bottom: 10px;
  background: #c4cfd8;
  border-bottom-left-radius: 5px;
  border-bottom-right-radius: 5px;
  display: flex;
  flex-direction: column;
  box-shadow: -1px 1px 3px 0px #696969;
`;
const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;
const SelectContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-left: 5px;
  margin-right: 5px;
  margin-top: 5px;
  & div:first-child {
    flex: 1;
  }
`;
const SelectBtn = styled.button`
  color: white;
  background-color: #bdc3c7;
  padding: 6px;
  cursor: pointer;
  font-weight: 800;
  border: none;
  border-top-right-radius: 10px;
  border-bottom-right-radius: 10px;
  box-shadow: 1px 0px 3px 0px #949494;
  width: 100%;
`;

function SettingBar({ coinInfo, upbitBitKrw }) {
  const dispatch = useDispatch();
  const wrapper = useRef();
  const [coins, setCoins] = useState([]);
  const [coinPer, setCoinPer] = useState({});
  /**
   * coinPer: 현재 프리미엄 %
   * percent: 설정된 %
   * currentPer: 변화 값 저장, 비교용으로 사용
   */
  useEffect(() => {
    if (coins.length === 0) {
      setCoins(coinInfo);
    }
  }, [coinInfo, upbitBitKrw, coins]);
  const onChangePercent = useCallback(
    (e) => {
      const {
        target: { value, dataset },
      } = e;
      setCoinPer({
        ...coinPer,
        [dataset.name]: value,
      });
    },
    [coinPer]
  );

  const onSetting = useCallback(
    (e) => {
      const { target } = e;
      const percentsLength = Object.keys(coinPer).length;
      if (percentsLength > 0) {
        if (target.innerHTML === "설정") {
          target.innerHTML = "취소";
          dispatch(sendMessage({ coinPer }));
        } else {
          target.innerHTML = "설정";
          dispatch(cancelMessage());
        }
      } else {
        alert("최소 한개의 % 설정이 필요합니다");
      }
    },
    [coinPer, dispatch]
  );
  const onToggle = useCallback(() => {
    if (
      wrapper.current.style.display === "flex" ||
      wrapper.current.style.display === ""
    )
      wrapper.current.style.display = "none";
    else wrapper.current.style.display = "flex";
  }, []);
  return (
    <SettingBarDiv>
      <FontAwesomeIcon
        icon={faCog}
        style={{
          alignSelf: "flex-end",
          marginLeft: "5px",
          marginRight: "5px",
          marginTop: "5px",
          cursor: "pointer",
          fontSize: "1.0rem",
        }}
        onClick={onToggle}
      />
      <InputWrapper ref={wrapper} style={{ display: "none" }}>
        <SettingTrade coinInfo={coinInfo} />
        <ItemList coins={coins} onChangePercent={onChangePercent} />
        <SelectContainer>
          <SelectBtn onClick={onSetting}>설정</SelectBtn>
        </SelectContainer>
      </InputWrapper>
    </SettingBarDiv>
  );
}

export default React.memo(SettingBar);
