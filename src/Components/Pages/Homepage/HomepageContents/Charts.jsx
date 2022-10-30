import React from 'react'
import './Charts.css'
import { LineChart, Line, XAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import {chartData} from './ChartData'

const Charts = () => {
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