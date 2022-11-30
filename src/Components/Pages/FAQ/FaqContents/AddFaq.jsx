import React, {useState} from 'react'
import './AddFaq.css'
import {collection, addDoc} from 'firebase/firestore'
import {db} from '../../../../Firebase'

const AddFaq = () => {

  const [question,setQuestion] = useState('')
  const [answer,setAnswer] = useState('')
  const [status,setStatus] = useState('active')
  const current = new Date();
  const date = `${current.getDate()}/${current.getMonth()+1}/${current.getFullYear()}`;

  const faqHandler = async()=>{
    try{
      const addDetails = collection(db, 'faq')
      try{
      await addDoc(addDetails,{question:question+'?', answer: answer, date:date, status:status})
      .then(()=>{
        setQuestion('')
        setAnswer('')
      })

      }catch(err){
        err.message('Cant add FAQ')
      }
    }catch(err){
      err.message('Cant Connect. Please Try Again!')
    }
    
  }

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
                    value = {question}
                    required
                />
            </div>

            <textarea value = {answer} placeholder = 'Answer' className = 'discoverDescription'
              onChange= {(e)=> setAnswer(e.target.value)} required></textarea>

              <button onClick={faqHandler}>Add FAQ</button>
        </div>
    </div>
  )
}

export default AddFaq