import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import queryString from "query-string";

import { loadCoinList } from "reducers/coin";

import HomePresentation from "./HomePresentation";

const HomeContainer = () => {
  const dispatch = useDispatch();
  const { search } = useLocation();
  const { type } = queryString.parse(search);

  useEffect(() => {
    dispatch(loadCoinList(type ?? "KRW"));
  }, [dispatch, type]);

  return <HomePresentation type={type} />;
};

export default HomeContainer;
