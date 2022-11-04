import React from 'react'
import './Faq.css'
import AddFaq from './FaqContents/AddFaq'
import ViewFaq from './FaqContents/ViewFaq'

const Faq = () => {
  return (
    <div className="faq">
        <AddFaq />
        <ViewFaq />
    </div>
  )
}

export default Faq