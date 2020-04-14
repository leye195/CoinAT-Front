import React, { useState, useCallback, useRef } from "react";
import styled from "styled-components";
import Select from "react-select";
import { useSelector, useDispatch } from "react-redux";
import { sendMessage } from "../reducers/bot";
import { faCog } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const SettingBarDiv = styled.div`
  position: fixed;
  right: 0;
  padding-bottom: 10px;
  background: #c4cfd8;
  border-bottom-left-radius: 5px;
  border-bottom-right-radius: 5px;
  display: flex;
  flex-direction: column;
  box-shadow: 0px 3px 2px 1px #e3e3e3;
`;
const FontDiv = styled.div`
  display: flex;
  align-self: flex-end;
  align-items: center;
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
const SelectInput = styled.input`
  width: 35px;
  padding: 8px 10px;
`;
const SelectBtn = styled.button`
  color: white;
  background-color: #bdc3c7;
  padding: 10px;
  font-size: 0.8rem;
  cursor: pointer;
  font-weight: 800;
  border: none;
  border-top-right-radius: 10px;
  border-bottom-right-radius: 10px;
  box-shadow: 1px 0px 3px 0px #949494;
`;

const ApiContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: "center";
  margin-left: 5px;
  margin-right: 5px;
  margin-top: 5px;
`;
const ApiInput = styled.input`
  height: 20px;
  height: 20px;
  border: none;
  margin: 3px;
  flex: 1;
`;
const SecretInput = styled.input`
  height: 20px;
  height: 20px;
  border: none;
  margin: 3px;
  flex: 1;
`;
const SettingBtn = styled.button`
  font-size: 0.6rem;
  color: white;
  background-color: #bdc3c7;
  border: none;
  cursor: pointer;
  border-top-right-radius: 5px;
  border-bottom-right-radius: 5px;
  padding: 5px;
`;
function SettingBar({ coinInfo }) {
  const { coinList, upbitBitKrw } = useSelector((state) => state.coin);
  const [selected, setSelected] = useState(-1);
  const [percent, setPercent] = useState(-1);
  const [currentPer, setCurrentPer] = useState(-1);
  const dispatch = useDispatch();
  const timer = useRef();
  const wrapper = useRef();
  const getOptions = () => {
    const options = coinList.map((v) => {
      return {
        value: v,
        label: v,
      };
    });
    return options;
  };
  const onSelectChange = useCallback((selectedOption) => {
    setSelected(selectedOption.value);
  }, []);
  const onPercentChange = useCallback((e) => {
    const { target } = e;
    if (target.value >= 0 && target.value <= 100) {
      setPercent(target.value);
    } else {
      target.value = 0;
    }
  }, []);
  const startBot = useCallback(() => {
    const selectedCoin = coinInfo.filter((v) => v.symbol === selected)[0];
    const converted = selectedCoin.blast * upbitBitKrw;
    const coinPer = (
      ((selectedCoin.last - converted) / selectedCoin.last) *
      100
    ).toFixed(2);
    if (Math.abs(coinPer) > percent) {
      if (currentPer !== Math.abs(coinPer)) {
        console.log(selectedCoin, coinPer);
        dispatch(
          sendMessage({
            coinInfo: selectedCoin,
            binance: converted,
            percent: coinPer,
          })
        );
      }
      setCurrentPer(coinPer);
    }
  }, [selected, percent, coinInfo, dispatch, upbitBitKrw, currentPer]);
  const onSetting = useCallback(
    (e) => {
      const { target } = e;
      if (selected !== -1 && percent !== -1) {
        if (target.innerHTML === "설정") {
          timer.current = setInterval(startBot, 2000);
          target.innerHTML = "취소";
        } else {
          target.innerHTML = "설정";
          clearInterval(timer.current);
        }
      }
    },
    [selected, percent, startBot]
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
      <FontDiv>
        <FontAwesomeIcon
          icon={faCog}
          style={{
            alignSelf: "flex-end",
            marginLeft: "5px",
            marginRight: "5px",
            marginTop: "5px",
            cursor: "pointer",
          }}
          onClick={onToggle}
        />
      </FontDiv>
      <InputWrapper ref={wrapper} style={{ display: "none" }}>
        <SelectContainer>
          <Select options={getOptions()} onChange={onSelectChange} />
          <SelectInput
            type="number"
            min={0}
            max={100}
            step={0.1}
            placeholder="N%"
            onChange={onPercentChange}
          />
          <SelectBtn onClick={onSetting}>설정</SelectBtn>
        </SelectContainer>
        <ApiContainer>
          <ApiInput type="text" placeholder="업비트 api" />
          <SecretInput type="password" placeholder="업비트 secret" />
          <SettingBtn>확인</SettingBtn>
        </ApiContainer>
        <ApiContainer>
          <ApiInput type="text" placeholder="바이낸스 api" />
          <SecretInput type="password" placeholder="바이낸스 secret" />
          <SettingBtn>확인</SettingBtn>
        </ApiContainer>
      </InputWrapper>
    </SettingBarDiv>
  );
}

export default SettingBar;
