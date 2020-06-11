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
const Input = styled.input`
  height: 20px;
  border: none;
  margin: 3px;
  flex: 1;
  border-radius: 5px;
  padding: 2px;
`;

function SettingBar({ coinInfo, upbitBitKrw }) {
  const dispatch = useDispatch();
  const timer = useRef();
  const wrapper = useRef();
  const [coins, setCoins] = useState([]);
  const [coinPer, setCoinPer] = useState({});
  const checkPer = useRef({});
  const { btc } = useSelector((state) => state.coin);
  /**
   * coinPer: 현재 프리미엄 %
   * percent: 설정된 %
   * currentPer: 변화 값 저장, 비교용으로 사용
   */
  const startBot = useCallback(
    (coinlist, krw) => {
      const coinPerLength = Object.keys(coinPer).length;
      if (coinPerLength > 0) {
        [{ symbol: "BTC" }, ...coinlist].forEach((coin) => {
          if (
            Object.keys(coinPer).indexOf(coin.symbol) !== -1 &&
            coinPer[coin.symbol] !== ""
          ) {
            if (coin.symbol !== "BTC") {
              const converted = (coin.blast * krw).toFixed(2);
              const p = parseFloat(coinPer[coin.symbol], 10);
              const per1 = parseFloat(
                  (((coin.last - converted) / converted) * 100).toFixed(2),
                  10
                ),
                per2 = parseFloat(
                  (((coin.thumb - converted) / converted) * 100).toFixed(2),
                  10
                );
              //console.log(per2);
              if (Math.abs(per1) > p || Math.abs(per2) > p) {
                if (Object.keys(checkPer.current).indexOf(coin.symbol) === -1) {
                  checkPer.current = {
                    ...checkPer.current,
                    [coin.symbol]: { per1, per2 },
                  };
                  dispatch(
                    sendMessage({
                      coinInfo: {
                        symbol: coin.symbol,
                        upbit: coin.last,
                        binance: converted,
                        percentUp: per1,
                        bithumb: coin.thumb,
                        percentBit: per2,
                      },
                    })
                  );
                } else {
                  if (
                    checkPer.current[coin.symbol].per1 !== per1 ||
                    checkPer.current[coin.symbol].per2 !== per2
                  ) {
                    checkPer.current = {
                      ...checkPer.current,
                      [coin.symbol]: { per1, per2 },
                    };
                    dispatch(
                      sendMessage({
                        coinInfo: {
                          symbol: coin.symbol,
                          upbit: coin.last,
                          binance: converted,
                          percentUp: per1,
                          bithumb: coin.thumb,
                          percentBit: per2,
                        },
                      })
                    );
                  }
                }
              }
            } else {
              const p = parseFloat(coinPer[coin.symbol], 10);
              if (Math.abs(btc.percent) > p) {
                if (Object.keys(checkPer.current).indexOf(coin.symbol) === -1) {
                  checkPer.current = {
                    ...checkPer.current,
                    [coin.symbol]: btc.percent,
                  };
                  dispatch(
                    sendMessage({
                      coinInfo: {
                        symbol: coin.symbol,
                        upbit: btc.last,
                        binance: btc.converted,
                        percentUp: btc.percent,
                        bithumb: undefined,
                        percentBit: undefined,
                      },
                    })
                  );
                } else {
                  if (checkPer.current[coin.symbol] !== btc.percent) {
                    checkPer.current = {
                      ...checkPer.current,
                      [coin.symbol]: btc.percent,
                    };
                    dispatch(
                      sendMessage({
                        coinInfo: {
                          symbol: coin.symbol,
                          upbit: btc.last,
                          binance: btc.converted,
                          percent: btc.percent,
                          bithumb: undefined,
                          percentBit: undefined,
                        },
                      })
                    );
                  }
                }
              }
            }
          }
        });
      }
    },
    [coinPer, dispatch, btc]
  );
  useEffect(() => {
    //console.log(coinInfo);
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
