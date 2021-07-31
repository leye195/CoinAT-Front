import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { loadCoinList } from "reducers/coin";

import ExchangeList from "components/Home/ExchangeList";

const Home = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadCoinList());
  }, [dispatch]);

  return <ExchangeList />;
};

export default Home;
