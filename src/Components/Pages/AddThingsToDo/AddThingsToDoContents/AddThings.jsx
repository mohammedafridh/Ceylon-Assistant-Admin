import React, {useState} from 'react'
import './AddThings.css'
import {collection, addDoc} from 'firebase/firestore'
import {db} from '../../../../Firebase'

const AddThings = () => {

  const [activityName,setActivityName] = useState('')
  const [description,setDescription] = useState('')
  const [imageUrl,setImageUrl] = useState('')
  const [status,setStatus] = useState('active')

  const addThingsHandler = async(e)=>{
      e.preventDefault();
      const addDetails = collection(db, 'ThingsToDo')
        addDoc(addDetails,{Activity:activityName, image: imageUrl, description:description, status:status})
        .then(()=>{
            setActivityName('')
            setImageUrl('')
            setDescription('')
        })
  }

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
              />
            </div>

            <div>
                <input 
                    type = 'text' 
                    className='infoInput' 
                    onChange = {(e)=> setImageUrl(e.target.value)}
                    placeholder= 'Image URL'
                />
            </div>

            <textarea value = {description} placeholder = 'Description' className = 'addThingsDescription'
              onChange= {(e)=> setDescription(e.target.value)}></textarea>

          <div className='addThingsBtnContainer'>
              <button className='addThingsBtn' onClick = {addThingsHandler}> Add Things To Do</button>
          </div>   
        </div>
      </div>
  )
}

export default AddThings