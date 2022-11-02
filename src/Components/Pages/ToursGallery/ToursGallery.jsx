import React from 'react'
import AddTours from './ToursGalleryContents/AddTours'
import ViewTours from './ToursGalleryContents/ViewTours'

const ToursGallery = () => {
  return (
    <div className="toursGallery">
        <AddTours />
        <ViewTours />
    </div>
  )
}

export default ToursGallery