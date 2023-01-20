import React from "react";
import ExchangeList from "components/Home/ExchangeList";
import Common from "components/Common";
import { SubNavLink } from "./styles";

const HomePresentation = ({ type }) => {
  return (
    <>
      <Common.Row alignItems="center" justifyContent="center" full>
        <SubNavLink active={type !== "BTC" ? "true" : undefined} to="/">
          KRW 마켓
        </SubNavLink>
        <SubNavLink
          active={type === "BTC" ? "true" : undefined}
          to="/?type=BTC"
        >
          BTC 마켓
        </SubNavLink>
      </Common.Row>
      <ExchangeList />
    </>
  );
};

export default HomePresentation;
