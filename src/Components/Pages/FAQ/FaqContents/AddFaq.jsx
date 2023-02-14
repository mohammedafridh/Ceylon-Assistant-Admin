import React, {useState} from 'react'
import './AddFaq.css'
import {collection, addDoc} from 'firebase/firestore'
import {db} from '../../../../Firebase'
import { toast } from "react-hot-toast";
import loadingGif from '../../../../assets/loading-gif.gif'

const AddFaq = () => {

  const [question,setQuestion] = useState('')
  const [answer,setAnswer] = useState('')
  const [status,setStatus] = useState('active')
  const current = new Date();
  const date = `${current.getDate()}/${current.getMonth()+1}/${current.getFullYear()}`;
  const[loading,setLoading] = useState(false)

  const faqHandler = async()=>{
    try{
      setLoading(true)
      const addDetails = collection(db, 'faq')
      try{
      setLoading(true)
      await addDoc(addDetails,{question:question+'?', answer: answer, date:date, status:status})
      .then(()=>{
        setQuestion('')
        setAnswer('')
        setLoading(false)
        toast.success('FAQ Added Successfully!')
      })

      }catch(err){
        setLoading(false)
        toast.error('Cant add FAQ. Try Again!')
      }
    }catch(err){
      setLoading(false)
      toast.error('Cant Connect. Please Try Again!')
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

          {loading?
              <button type = 'submit' className='addThingsBtn'>
                <img className='loadingIcon' src={loadingGif} />
              </button>:
              <button onClick={faqHandler} className='addThingsBtn'>Add FAQ</button>}
        </div>
    </div>
  )
}

export default AddFaq