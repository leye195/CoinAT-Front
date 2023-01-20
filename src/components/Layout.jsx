import React from "react";
import Footer from "components/Common/Footer";
import Header from "components/Common/Header";

const Layout = ({ children }) => {
  return (
    <>
      <Header title="CoinAT" />
      {children}
      <Footer />
    </>
  );
};
export default Layout;
