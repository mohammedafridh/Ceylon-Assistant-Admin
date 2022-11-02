import React,{useState} from 'react'
import './Bookings.css'
import AllBookings from './BookingContents/AllBookings';
import AllTours from './BookingContents/AllTours';

const Bookings = () => {
  return(
    <div className="bookings">
      <AllBookings />
      <AllTours />
    </div>
  )
    
}

export default Bookings;