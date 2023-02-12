import React from 'react'
import BaseLayout from '../../../../Layouts/BaseLayout'
import UsersTop from '../../UsersContents/UsersTop'
import AddTourists from './AddTourists'
import AllTourists from './AllTourists'

const TouristPageSetup = () => {
  return (
    <BaseLayout>
    <div className="touristPageSetup">
        <UsersTop />
        <AddTourists />
        <AllTourists />
    </div>
    </BaseLayout>
  )
}

export default TouristPageSetup