import React from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import TableStatus from './Table/TableStatus';
import TableHistory from './Table/TableHistory';
import TableBooking from './Table/TableBooking';
import TableCheckIn from './Table/TableCheckIn';
import TablePayment from './Table/TablePayment';

import CustomerInfoShow from './ShowData/CustomerInfoShow';
import ReceiptInfoShow from './ShowData/ReceiptInfoShow';
import CheckInInfoShow from './ShowData/CheckInInfoShow';
import HistoryInfoShow from './ShowData/HistoryInfoShow';
import StatusRecShow from './ShowData/StatusRecShow';

function App() {
  return (
    <div className="App">
      {/* <div>status</div>
       <TableStatus/>
      <div>history</div>
      <TableHistory/> 
      <div>payment</div>
      <TablePayment/> 
      <div>Booking</div>
      <TableBooking/>
      <div>Check In</div>
      <TableCheckIn/> */}
      {/* <CustomerInfoShow/> */}
      <Router>
      <Switch>
        <Route exact path='/' component={CustomerInfoShow} />
        <Route path='/ReceiptInfoShow' component={ReceiptInfoShow} />
        <Route path='/CheckInInfoShow' component={CheckInInfoShow}/>
        <Route path='/HistoryInfoShow' component={HistoryInfoShow}/>
        <Route path='/StatusRecShow' component={StatusRecShow}/>
      </Switch>
    </Router>
    </div>
  );
}

export default App;
