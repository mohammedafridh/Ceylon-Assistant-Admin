import React from 'react'
import UsersTop from '../../UsersContents/UsersTop'
import AddTourists from './AddTourists'
import AllTourists from './AllTourists'

const TouristPageSetup = () => {
  return (
    <div className="touristPageSetup">
        <UsersTop />
        <AddTourists />
        <AllTourists />
    </div>
  )
}

export default TouristPageSetup