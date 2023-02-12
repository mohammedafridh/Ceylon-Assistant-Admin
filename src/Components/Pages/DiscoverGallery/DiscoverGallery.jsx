import React from 'react'
import BaseLayout from '../../Layouts/BaseLayout'
import './DiscoverGallery.css'
import AddDiscover from './DiscoverGalleryContents/AddDiscover'
import ViewDiscover from './DiscoverGalleryContents/ViewDiscover'

const DiscoverGallery = () => {
  return (
    <BaseLayout>
    <div className="discoverGallery">
        <AddDiscover />
        <ViewDiscover />
    </div>
    </BaseLayout>
  )
}

export default DiscoverGallery