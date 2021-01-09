import React, { useEffect, useRef, useCallback } from "react";
import ExchangeList from "./components/ExchangeList";
import { useDispatch } from "react-redux";
import { loadCoinList, loadUsdToKrw } from "./reducers/coin";
import Routes from "./Routes";

const App = () => {
  const dispatch = useDispatch();
  let timer = useRef(null);
  const getCurrency = useCallback(() => {
    dispatch(loadUsdToKrw());
    if (!timer.current) {
      timer.current = setTimeout(() => {
        timer.current = null;
        getCurrency();
      }, 8000);
    }
  }, [dispatch]);
  useEffect(() => {
    dispatch(loadCoinList());
  }, [dispatch]);
  return (
    <>
      <Routes/>
    </>
  );
};

export default App;
