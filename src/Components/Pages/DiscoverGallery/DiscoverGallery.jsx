import React from 'react'
import './DiscoverGallery.css'
import AddDiscover from './DiscoverGalleryContents/AddDiscover'
import ViewDiscover from './DiscoverGalleryContents/ViewDiscover'

const DiscoverGallery = () => {
  return (
    <div className="discoverGallery">
        <AddDiscover />
        <ViewDiscover />
    </div>
  )
}

export default DiscoverGallery