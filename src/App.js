import React, { useEffect, useRef, useCallback } from "react";
import { useDispatch } from "react-redux";
import { loadCoinList, loadUsdToKrw } from "./reducers/coin";
import Routes from "./Routes";

const App = () => {
  let timer = useRef(null);
  const dispatch = useDispatch();

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

  return <Routes/>;
};

export default App;
