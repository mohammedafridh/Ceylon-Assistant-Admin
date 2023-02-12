import React from 'react'
import BaseLayout from '../../Layouts/BaseLayout'
import './Faq.css'
import AddFaq from './FaqContents/AddFaq'
import ViewFaq from './FaqContents/ViewFaq'

const Faq = () => {
  return (
    <BaseLayout>
    <div className="faq">
        <AddFaq />
        <ViewFaq />
    </div>
    </BaseLayout>
  )
}

export default Faq