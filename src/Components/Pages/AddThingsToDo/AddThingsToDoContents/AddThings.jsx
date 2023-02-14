import React, {useState} from 'react'
import './AddThings.css'
import {collection, addDoc} from 'firebase/firestore'
import {db} from '../../../../Firebase'
import { useEffect } from 'react'
import { toast } from 'react-hot-toast'
import loadingGif from '../../../../assets/loading-gif.gif'

const AddThings = ({activityNameProp, descriptionProp, imageUrlProp}) => {

  const [activityName,setActivityName] = useState('')
  const [description,setDescription] = useState('')
  const [imageUrl,setImageUrl] = useState('')
  const [status,setStatus] = useState('active')
  const current = new Date();
  const date = `${current.getDate()}/${current.getMonth()+1}/${current.getFullYear()}`;
  const[loading,setLoading] = useState(false)

  const addThingsHandler = async(e)=>{
      e.preventDefault();
      const addDetails = collection(db, 'ThingsToDoSrilanka')
      setLoading(true)
        addDoc(addDetails,{Activity:activityName, image: imageUrl, description:description, date: date, status:status})
        .then(()=>{
            setActivityName('')
            setImageUrl('')
            setDescription('')
            setLoading(false)
            toast.success('Things To Do Sri-Lanka added successfully!')
        })
  }

  useEffect(()=>{
    setActivityName(activityNameProp)
    setDescription(descriptionProp)
    setImageUrl(imageUrlProp)
  },[activityNameProp, descriptionProp, imageUrlProp])

  return (
    <div className="addThings">
        <div className = 'addThingsForm'>
                  
            <h3>Add Things To Do</h3>
            
            <div>
              <input 
                  type="text" 
                  className='infoInput' 
                  onChange = {(e)=> setActivityName(e.target.value)}
                  placeholder='Activity Name'
                  value = {activityName}
              />
            </div>

            <div>
                <input 
                    type = 'text' 
                    className='infoInput' 
                    onChange = {(e)=> setImageUrl(e.target.value)}
                    placeholder= 'Image URL'
                    value = {imageUrl}
                />
            </div>

            <textarea value = {description} placeholder = 'Description' className = 'addThingsDescription'
              onChange= {(e)=> setDescription(e.target.value)}></textarea>

          <div className='addThingsBtnContainer'>
      
        {loading?
          <button type = 'submit' className='addThingsBtn'>
            <img className='loadingIcon' src={loadingGif} />
          </button>:
              <button className='addThingsBtn' onClick = {addThingsHandler}> Add Things To Do</button>}
          </div>   
        </div>
      </div>
  )
}

export default AddThings