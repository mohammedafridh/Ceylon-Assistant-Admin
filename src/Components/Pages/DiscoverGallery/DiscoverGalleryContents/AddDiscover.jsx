import React, {useState} from 'react'
import './AddDiscover.css'
import {collection, addDoc} from 'firebase/firestore'
import {db} from '../../../../Firebase'

const AddDiscover = () => {

  const [imageUrl,setImageUrl] = useState(true)
  const [gallery,setGallery] = useState(false)
  const [destination,setDestination] = useState('')
  const [description,setDescription] = useState('')
  const [photoUrl,setPhotoUrl] = useState('')
  const [photo,setPhoto] = useState('')
  const [status,setStatus] = useState('')

  const galleryImageHandler = async (e)=>{
      e.preventDefault();
      setImageUrl(false)
      setGallery(true)
  }

  const imageUrlHandler = async(e)=>{
      e.preventDefault();
      setImageUrl(true)
      setGallery(false)
  }

  const urlImage = async ()=>{
    const addDetails = collection(db, 'Discover_Srilanka')
    await addDoc(addDetails,{destination:destination, image: photoUrl, description:description})
    .then(()=>{
      setDestination('')
      setPhotoUrl('')
      setDescription('')
    })
  }

  const galleryImage = async ()=>{
    const addDetails = collection(db, 'Discover_Srilanka')
    await addDoc(addDetails,{destination:destination, image: photoUrl, description:description})
    .then(()=>{
      setDestination('')
      setPhotoUrl('')
      setDescription('')
    })
  }

  return (
    <div className="addDiscover">

      <div className="optionContainer">
          <button onClick = {galleryImageHandler} className = {gallery?'actives' : 'deactive'}>Gallery Image</button>
          <button onClick = {imageUrlHandler} className = {imageUrl?'actives' : 'deactive'}>Image URL</button> 
      </div>

      <div className="addDiscoverContainer">
        <div className = 'discoverForm'>
                  
            <h3>Add Discover Sri-Lanka</h3>
            
            <div>
              <input 
                  type="text" 
                  className='infoInput' 
                  onChange = {(e)=> setDestination(e.target.value)}
                  placeholder='Destination Name'
              />
            </div>

            <div>
              {gallery && 
              <label>Add Image</label> }
                <input 
                    type={imageUrl?'text' : 'file'} 
                    className='infoInput' 
                    onChange = {(e)=> imageUrl? setPhotoUrl(e.target.value): setPhoto(e.target.value)}
                    placeholder= {imageUrl && 'Enter Image Url'}
                />
            </div>

            <textarea value = {description} placeholder = 'Description' className = 'discoverDescription'
              onChange= {(e)=> setDescription(e.target.value)}></textarea>

          <div className='discoverBtnContainer'>
              <button className='discoverBtn' onClick = {urlImage}>Add Discovery</button>
          </div>   
        </div>
      </div>
    </div>
  )
}

export default AddDiscover