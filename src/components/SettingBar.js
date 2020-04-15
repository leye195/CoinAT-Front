import React, { useState, useCallback, useRef } from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { sendMessage } from "../reducers/bot";
import { faCog } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { setUpbit, setBinance } from "../reducers/coin";
import Select from "react-select";
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
/*const Select = styled.select`
  flex: 1;
  height: 25px;
  border: none;
  background-color: white;
`;*/
const SelectInput = styled.input`
  width: 30px;
  height: 25px;
  padding: 0px 5px;
  border: none;
  margin-left: 5px;
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
  border: none;
  margin: 3px;
  flex: 1;
  border-radius: 5px;
  padding: 2px;
`;

const SecretInput = styled.input`
  height: 20px;
  border: none;
  margin: 3px;
  flex: 1;
  border-radius: 5px;
  padding: 2px;
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
  const upbitApi = useRef();
  const upbitSec = useRef();
  const binanceApi = useRef();
  const binanceSec = useRef();
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
  const onClickUpbit = useCallback(
    (e) => {
      const { target } = e;
      if (target.innerHTML === "확인") {
        if (upbitApi.current.value === "" || upbitSec.current.value === "") {
          alert("API 혹은 Secret키를 입력해주세요");
          return;
        }
        dispatch(
          setUpbit({
            upbitApi: upbitApi.current.value,
            upbitSec: upbitSec.current.value,
          })
        );
        target.innerHTML = "취소";
      } else {
        upbitApi.current.value = "";
        upbitSec.current.value = "";
        dispatch(
          setUpbit({
            upbitApi: "",
            upbitSec: "",
          })
        );
        target.innerHTML = "확인";
      }
    },
    [dispatch]
  );
  const onClickBinance = useCallback(
    (e) => {
      const { target } = e;
      if (target.innerHTML === "확인") {
        if (
          binanceApi.current.value === "" ||
          binanceSec.current.value === ""
        ) {
          alert("API 혹은 Secret키를 입력해주세요");
          return;
        }
        dispatch(
          setBinance({
            binanceApi: binanceApi.current.value,
            binanceSec: binanceSec.current.value,
          })
        );
        target.innerHTML = "취소";
      } else {
        binanceApi.current.value = "";
        binanceSec.current.value = "";
        dispatch(
          setBinance({
            binanceApi: "",
            binanceSec: "",
          })
        );
        target.innerHTML = "확인";
      }
    },
    [dispatch]
  );
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
        }}
        onClick={onToggle}
      />
      <InputWrapper ref={wrapper} style={{ display: "none" }}>
        <SelectContainer>
          <Select
            onChange={onSelectChange}
            options={coinList.map((v) => {
              return { value: v, label: v };
            })}
          />
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
          <ApiInput ref={upbitApi} type="text" placeholder="업비트 api" />
          <SecretInput
            ref={upbitSec}
            type="password"
            placeholder="업비트 secret"
          />
          <SettingBtn onClick={onClickUpbit}>확인</SettingBtn>
        </ApiContainer>
        <ApiContainer>
          <ApiInput ref={binanceApi} type="text" placeholder="바이낸스 api" />
          <SecretInput
            ref={binanceSec}
            type="password"
            placeholder="바이낸스 secret"
          />
          <SettingBtn onClick={onClickBinance}>확인</SettingBtn>
        </ApiContainer>
      </InputWrapper>
    </SettingBarDiv>
  );
}

export default React.memo(SettingBar);
