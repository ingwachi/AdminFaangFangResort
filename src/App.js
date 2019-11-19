import React from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import CustomerInfoShow from './ShowData/CustomerInfoShow';
import ReceiptInfoShow from './ShowData/ReceiptInfoShow';
import CheckInInfoShow from './ShowData/CheckInInfoShow';
import HistoryInfoShow from './ShowData/HistoryInfoShow';
import StatusRecShow from './ShowData/StatusRecShow';

import Login from './Login/Login'

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path='/' component={Login}/>
          <Route exact path='/CustomerInfoShow' component={CustomerInfoShow} />
          <Route path='/ReceiptInfoShow' component={ReceiptInfoShow} />
          <Route path='/CheckInInfoShow' component={CheckInInfoShow} />
          <Route path='/HistoryInfoShow' component={HistoryInfoShow} />
          <Route path='/StatusRecShow' component={StatusRecShow} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
