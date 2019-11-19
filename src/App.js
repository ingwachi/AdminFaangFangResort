import React from 'react';
import logo from './logo.svg';
import './App.css';


import TableStatus from './admin/TableStatus';
import TableHistory from './admin/TableHistory';
import TableBooking from './admin/TableBooking';
import TableCheckIn from './admin/TableCheckIn';
import TablePayment from './admin/TablePayment';
import FinishBooking from './FinishBooking';
import FinishPayment from './FinishPayment'
import Confirm from './Confirm';

function App() {
  return (
    <div className="App">
      <div>status</div>
       <TableStatus/>
      <div>history</div>
      <TableHistory/> 
      <div>payment</div>
      <TablePayment/> 
      <div>Booking</div>
      <TableBooking/>
      <div>Check In</div>
      <TableCheckIn/>
      {/* <FinishPayment/> */}
    </div>
  );
}

export default App;
