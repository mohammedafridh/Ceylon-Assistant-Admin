import React from 'react'
import UsersTop from '../../UsersContents/UsersTop'
import AddGuide from './AddGuide'
import AllGuides from './AllGuides'

const GuidePageSetup = () => {
  return (
    <div className="guidePageSetup">
        <UsersTop />
        <AddGuide />
        <AllGuides />
    </div>
  )
}

export default GuidePageSetup