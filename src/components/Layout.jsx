import React from 'react';
import Footer from 'components/Footer';
import Header from 'components/Header';

const Layout = ({children}) => {
  return <>
    <Header title='CoinAT'/>
    {children}
    <Footer/>
  </>
};
export default Layout;
