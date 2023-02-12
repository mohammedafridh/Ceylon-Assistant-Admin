import React from 'react'
import BaseLayout from '../../Layouts/BaseLayout'
import AddTours from './ToursGalleryContents/AddTours'
import ViewTours from './ToursGalleryContents/ViewTours'

const ToursGallery = () => {
  return (
    <BaseLayout>
      <div className="toursGallery">
          <AddTours />
          <ViewTours />
      </div>
    </BaseLayout>
  )
}

export default ToursGallery