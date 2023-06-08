import React,{useState,useEffect} from 'react'
import './Charts.css'
import { LineChart, Line, XAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import {chartData} from './ChartData'
import { doc, deleteDoc, onSnapshot, collection } from "firebase/firestore";
import { db } from '../../../../Firebase';

const Charts = () => {

  const [error,setError] = useState('')
  const [loading,setLoading] = useState('')
  const [tours,setTours] = useState('')
  const [updatedChartData,setUpdatedChartData] = useState([])

  useEffect(() => {
    setLoading(true);
    const allData = onSnapshot(
      collection(db, "tours"),
      (snapshot) => {
        let list = [];
        snapshot.docs.forEach((doc) => {
          list.push({
            docId: doc.id,
            ...doc.data(),
          });
        });
        setTours(list);
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
  
    if (tours.length > 0) {
      const updatedChartData = chartData.map((data) => {
        const monthData = tours.map((tour) => {
          return (new Date(tour.startDate).getMonth() === data.key) && new Date(tour.startDate).getUTCFullYear() === new Date().getFullYear();
        });
        console.log(monthData.filter((item) => item === true).length);
        return {
          ...data,
          activeTours: monthData ? monthData.filter((item) => item === true).length : 0,
        };
      });
      setUpdatedChartData(updatedChartData);
    }
  }, [tours]);

  useEffect(() => {
    console.log(updatedChartData);
  }, [updatedChartData]);
  

  return (
    <div className='charts'>
        <h3 className="chartTitle">Tour Analytics</h3>
        <ResponsiveContainer width="100%" aspect = {4/1}>
            <LineChart data = {updatedChartData}>
                <XAxis dataKey='name' stroke = 'blue' interval="preserveStartEnd"/>
                <Line type = 'monotone' dataKey= 'activeTours' stroke = 'blue' />
                <Tooltip />
                <CartesianGrid />
            </LineChart>
        </ResponsiveContainer>
    </div>
  )
}

export default Charts