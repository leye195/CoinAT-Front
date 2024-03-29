import React, { useRef, useCallback } from "react";
import { useDispatch } from "react-redux";
import { loadUsdToKrw } from "./reducers/coin";
import Routes from "./Routes";

const App = () => {
  const timer = useRef(null);
  const dispatch = useDispatch();

  const getCurrency = useCallback(() => {
    dispatch(loadUsdToKrw());
    if (!timer.current) {
      timer.current = setTimeout(() => {
        timer.current = null;
        getCurrency();
      }, 20000);
    }
  }, [dispatch]);

  return <Routes />;
};

export default App;
