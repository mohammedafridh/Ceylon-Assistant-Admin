import React, {useState} from 'react'
import './AddFaq.css'

const AddFaq = () => {

  const [question,setQuestion] = useState('')
  const [answer,setAnswer] = useState('')

  return (
    <div className="addFaq">
      <div className = 'addFaqForm'>      
            <h3>Add FAQ</h3>
            <div className='detailsContainer'>
              <input 
                    type="text" 
                    className='faqInput' 
                    onChange = {(e)=> setQuestion(e.target.value)}
                    placeholder='Question'
                />
            </div>

            <textarea value = {answer} placeholder = 'Answer' className = 'discoverDescription'
              onChange= {(e)=> setAnswer(e.target.value)}></textarea>

              <button>Add FAQ</button>
        </div>
    </div>
  )
}

export default AddFaq