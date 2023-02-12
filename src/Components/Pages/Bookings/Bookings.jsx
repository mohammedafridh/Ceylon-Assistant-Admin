import React,{useState} from 'react'
import './Bookings.css'
import AllBookings from './BookingContents/AllBookings';
import AllTours from './BookingContents/AllTours';
import BaseLayout from '../../Layouts/BaseLayout';

const Bookings = () => {
  return(
    <BaseLayout>
    <div className="bookings">
      <AllBookings />
      <AllTours />
    </div>
    </BaseLayout>
  )
    
}

export default Bookings;