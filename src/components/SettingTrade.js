import React, { useCallback, useRef, useEffect } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { setUpbit, setBinance, upbitBid, upbitAsk } from "../reducers/coin";
const ApiContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: "center";
  margin-left: 5px;
  margin-right: 5px;
  margin-top: 5px;
`;
const Input = styled.input`
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
const TradeSettingDiv = ApiContainer.withComponent("div");
const TradeBtn = styled(SettingBtn.withComponent("button"))`
  border-radius: 10px;
  width: 50%;
`;
function SettingTrade({ coinInfo }) {
  const dispatch = useDispatch();
  const timer = useRef(false);
  const upbitApi = useRef();
  const upbitSec = useRef();
  const binanceApi = useRef();
  const binanceSec = useRef();
  const coinSymbol = useRef("");
  const percent = useRef("");
  const amount = useRef(0);
  const check = useRef(null);
  const { upbitBitKrw } = useSelector((state) => state.coin);

  useEffect(() => {
    if (timer.current) {
      startTrade();
    }
  });
  /**
   * coinPer: 현재 프리미엄 %
   * percent: 설정된 %
   * currentPer: 변화 값 저장, 비교용으로 사용
   */
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
  const onClickTrade = useCallback((e) => {
    if (timer.current) {
      timer.current = false;
    } else {
      if (
        binanceApi.current.value === "" ||
        binanceSec.current.value === "" ||
        upbitApi.current.value === "" ||
        upbitSec.current.value === ""
      ) {
        alert("API 와 Secret이 필요합니다");
      } else if (coinSymbol.current === "" || percent.current === "") {
        alert("코인 & 차이(%) 설정이 필요합니다");
      } else {
        timer.current = true;
      }
    }
  }, []);
  const onChangeCoin = useCallback((e) => {
    const { target } = e;
    coinSymbol.current = target.value;
    //console.log(coinSymbol.current);
  }, []);
  const onChangePercent = useCallback((e) => {
    const { target } = e;
    percent.current = target.value;
  }, []);
  const onChangeAmount = useCallback((e) => {
    const { target } = e;
    amount.current = target.value;
  }, []);
  const startTrade = useCallback(() => {
    const coin = coinInfo.filter((coin) => coin.symbol === coinSymbol.current);
    const converted = (coin[0].blast * upbitBitKrw).toFixed(2);
    const p = parseFloat(percent.current, 10);
    const per = parseFloat(
      (((coin[0].last - converted) / converted) * 100).toFixed(2),
      10
    );
    if (Math.abs(per) >= p) {
      if (per > 0) {
        //console.log("업비트 매도, 바이낸스 매수"); //ask  bid
        dispatch(
          upbitAsk({
            symbol: coin[0].symbol,
            q: amount.current,
          })
        );
      } else {
        //console.log("업비트 매수, 바이낸스 매도"); //bid ask
        dispatch(
          upbitBid({
            symbol: coin[0].symbol,
            q: amount.current,
          })
        );
      }
      check.current = per;
    }
  }, [coinInfo, upbitBitKrw, dispatch]);
  return (
    <>
      <ApiContainer>
        <Input ref={upbitApi} type="text" placeholder="업비트 api" />
        <SecretInput
          ref={upbitSec}
          type="password"
          placeholder="업비트 secret"
        />
        <SettingBtn onClick={onClickUpbit}>확인</SettingBtn>
      </ApiContainer>
      <ApiContainer>
        <Input ref={binanceApi} type="text" placeholder="바이낸스 api" />
        <SecretInput
          ref={binanceSec}
          type="password"
          placeholder="바이낸스 secret"
        />
        <SettingBtn onClick={onClickBinance}>확인</SettingBtn>
      </ApiContainer>
      <TradeSettingDiv>
        <Input type="text" placeholder="코인" onChange={onChangeCoin} />
        <Input
          type="number"
          placeholder="차이%"
          min={0}
          max={100}
          step={0.1}
          onChange={onChangePercent}
        />
        <Input
          type="number"
          placeholder="코인 양"
          min={0}
          step={0.1}
          onChange={onChangeAmount}
        />
        <TradeBtn onClick={onClickTrade}>
          {timer.current ? "설정 취소" : "자전 설정"}
        </TradeBtn>
      </TradeSettingDiv>
    </>
  );
}

export default React.memo(SettingTrade);
