import React from 'react';
import {
    BrowserRouter as Router,
    Route,
    Switch,
  } from "react-router-dom";
import Layout from './components/Layout';
import Event from './pages/Event';
import Home from './pages/Home';

export default () => (
    <Router>
      <Layout>
        <Switch>
          <Route path="/" exact component={Home}/>
          <Route path="/event" exact component={Event}/>
          <Route path="/event/:name" exact component={Event}/>
        </Switch>
      </Layout>
    </Router>
);