import React from 'react'
import Charts from './HomepageContents/Charts'
import FeaturedInfo from './HomepageContents/FeaturedInfo'
import './Homepage.css'
import WidgetLg from './HomepageContents/WidgetLg'

const Homepage = () => {
  return (
    <div className="Homepage">
      <FeaturedInfo />
      <Charts />
      <WidgetLg />
    </div>
  )
}

export default Homepage