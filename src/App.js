import React from 'react';
import logo from './logo.svg';
import './App.css';


import TableStatus from './Table/TableStatus';
import TableHistory from './Table/TableHistory';
import TableBooking from './Table/TableBooking';
import TableCheckIn from './Table/TableCheckIn';
import TablePayment from './Table/TablePayment';

import CustomerInfoShow from './ShowData/CustomerInfoShow';

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
      <CustomerInfoShow/>
    </div>
  );
}

export default App;
