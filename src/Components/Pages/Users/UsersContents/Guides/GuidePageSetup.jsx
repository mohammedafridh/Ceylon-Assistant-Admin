import React from 'react'
import BaseLayout from '../../../../Layouts/BaseLayout'
import UsersTop from '../../UsersContents/UsersTop'
import AddGuide from './AddGuide'
import AllGuides from './AllGuides'

const GuidePageSetup = () => {
  return (
    <BaseLayout>
      <div className="guidePageSetup">
          <UsersTop />
          <AddGuide />
          <AllGuides />
      </div>
    </BaseLayout>
  )
}

export default GuidePageSetup