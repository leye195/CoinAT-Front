import React, { useCallback, useState, useRef, useEffect } from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { sendMessage } from "../reducers/bot";
import { faCog } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { setUpbit, setBinance } from "../reducers/coin";
import ItemList from "./ItemList";
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
  width: 100%;
`;
function SettingBar({ coinInfo, upbitBitKrw }) {
  const dispatch = useDispatch();
  const timer = useRef();
  const wrapper = useRef();
  const upbitApi = useRef();
  const upbitSec = useRef();
  const binanceApi = useRef();
  const binanceSec = useRef();

  const [coins, setCoins] = useState([]);
  const [coinPer, setCoinPer] = useState({});
  const checkPer = useRef({});

  /**
   * coinPer: 현재 프리미엄 %
   * percent: 설정된 %
   * currentPer: 변화 값 저장, 비교용으로 사용
   */
  const startBot = useCallback(
    (coinlist, krw) => {
      const coinPerLength = Object.keys(coinPer).length;
      if (coinPerLength > 0) {
        coinlist.forEach((coin) => {
          if (
            Object.keys(coinPer).indexOf(coin.symbol) !== -1 &&
            coinPer[coin.symbol] !== ""
          ) {
            const converted = (coin.blast * krw).toFixed(2);
            const p = parseFloat(coinPer[coin.symbol], 10);
            const per = parseFloat(
              (((coin.last - converted) / converted) * 100).toFixed(2),
              10
            );
            if (Math.abs(per) > p) {
              if (Object.keys(checkPer.current).indexOf(coin.symbol) === -1) {
                checkPer.current = {
                  ...checkPer.current,
                  [coin.symbol]: per,
                };
                dispatch(
                  sendMessage({
                    coinInfo: {
                      symbol: coin.symbol,
                      upbit: coin.last,
                      binance: coin.converted,
                      percent: per,
                    },
                  })
                );
              } else {
                if (checkPer.current[coin.symbol] !== per) {
                  checkPer.current = {
                    ...checkPer.current,
                    [coin.symbol]: per,
                  };
                  dispatch(
                    sendMessage({
                      coinInfo: {
                        symbol: coin.symbol,
                        upbit: coin.last,
                        binance: coin.converted,
                        percent: per,
                      },
                    })
                  );
                }
              }
            }
          }
        });
      }
    },
    [coinPer, dispatch]
  );
  useEffect(() => {
    if (timer.current) {
      startBot(coinInfo, upbitBitKrw);
    }
    if (coins.length === 0) {
      setCoins(coinInfo);
    }
  }, [coinInfo, upbitBitKrw, startBot, coins]);
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
          timer.current = true;
        } else {
          target.innerHTML = "설정";
          timer.current = false;
        }
      } else {
        alert("최소 한개의 % 설정이 필요합니다");
      }
    },
    [coinPer]
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
          fontSize: "1.0rem",
        }}
        onClick={onToggle}
      />
      <InputWrapper ref={wrapper} style={{ display: "none" }}>
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
        <ItemList coins={coins} onChangePercent={onChangePercent} />
        <SelectContainer>
          <SelectBtn onClick={onSetting}>설정</SelectBtn>
        </SelectContainer>
      </InputWrapper>
    </SettingBarDiv>
  );
}

export default React.memo(SettingBar);
