import React from 'react';
import Footer from './Footer';
import Header from './Header';

const Layout = ({children}) => {
  return <>
    <Header title='CoinAT'/>
    {children}
    <Footer/>
  </>
};
export default Layout;
