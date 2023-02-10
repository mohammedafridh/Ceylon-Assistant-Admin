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
  

  return (
    <div className='charts'>
        <h3 className="chartTitle">Tour Analytics</h3>
        <ResponsiveContainer width="100%" aspect = {4/1}>
            <LineChart data = {chartData}>
                <XAxis dataKey='name' stroke = 'blue' />
                <Line type = 'monotone' dataKey= 'activeTour' stroke = 'blue' />
                <Tooltip />
                <CartesianGrid />
            </LineChart>
        </ResponsiveContainer>
    </div>
  )
}

export default Charts