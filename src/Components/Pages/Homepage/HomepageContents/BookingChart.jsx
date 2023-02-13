import React,{useState,useEffect} from 'react'
import './Charts.css'
import { LineChart, Line, XAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import {chartData} from './ChartData'
import { doc, deleteDoc, onSnapshot, collection } from "firebase/firestore";
import { db } from '../../../../Firebase';

const BookingChart = () => {

  const [error,setError] = useState('')
  const [loading,setLoading] = useState('')
  const [bookings,setBookings] = useState('')
  const [updatedChartData,setUpdatedChartData] = useState([])

  useEffect(() => {
    setLoading(true);
    const allData = onSnapshot(
      collection(db, "pending_booking"),
      (snapshot) => {
        let list = [];
        snapshot.docs.forEach((doc) => {
          list.push({
            docId: doc.id,
            ...doc.data(),
          });
        });
        setBookings(list);
        setLoading(false);
      },
      (error) => {
        setError(error.message);
      }
    );
    return () => {
      allData();
    };
  }, []);

  useEffect(() => {
    // Loop through the chartData array and add the number of tours to the activeTour property
  
    if (bookings.length > 0) {
      const updatedChartData = chartData.map((data) => {
        const monthData = bookings.map((tour) => {
          return (new Date(tour.startData).getMonth() === data.key) && new Date(tour.startData).getUTCFullYear() === new Date().getFullYear();
        });
        console.log(monthData.filter((item) => item === true).length);
        return {
          ...data,
          activeTour: monthData ? monthData.filter((item) => item === true).length : 0,
        };
      });
      setUpdatedChartData(updatedChartData);
    }
  }, [bookings]);

  useEffect(() => {
    console.log(updatedChartData);
  }, [updatedChartData]);
  

  return (
    <div className='charts'>
        <h3 className="chartTitle">Booking Analytics</h3>
        <ResponsiveContainer width="100%" aspect = {4/1}>
            <LineChart data = {updatedChartData}>
                <XAxis dataKey='name' stroke = 'blue' interval="preserveStartEnd"/>
                <Line type = 'monotone' dataKey= 'activeTour' stroke = 'blue' />
                <Tooltip />
                <CartesianGrid />
            </LineChart>
        </ResponsiveContainer>
    </div>
  )
}

export default BookingChart