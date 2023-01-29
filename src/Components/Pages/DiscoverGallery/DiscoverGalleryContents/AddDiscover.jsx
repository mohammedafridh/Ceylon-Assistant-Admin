import React, {useState, useEffect} from 'react'
import './AddDiscover.css'
import {collection, addDoc} from 'firebase/firestore'
import {db, storage} from '../../../../Firebase'
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { v4 } from "uuid";
import { toast } from "react-hot-toast";

const AddDiscover = () => {

  const [imageUrl,setImageUrl] = useState(true)
  const [gallery,setGallery] = useState(false)
  const [destination,setDestination] = useState('')
  const [destinationNickname, setDestinationNickname] = useState('')
  const [description,setDescription] = useState('')
  const [photoUrl,setPhotoUrl] = useState('')
  const [photo,setPhoto] = useState(null)
  const [url,setUrl] = useState(null)
  const [status,setStatus] = useState('active')
  const [error,setError] = useState('')
  const current = new Date();
  const date = `${current.getDate()}/${current.getMonth()+1}/${current.getFullYear()}`;

  useEffect(() => {
    const getImageUrl = async () => {
        const imageRef = ref(storage, `Discovery Images /${photo.name + v4()}`);
        uploadBytes(imageRef, photo)
          .then(() => {
            getDownloadURL(imageRef)
              .then((url) => {
                // console.log({ url });
                setUrl(url);
              })
              .catch((err) => {
                setError(err.message, "error getting the image");
              });
          })
          .catch((err) => {
            setError(err);
          });
      };
    const imageUrl = async () => {
      await getImageUrl();
    };
    imageUrl();
  }, [photo]);

  const galleryImageHandler = async (e)=>{
      e.preventDefault();
      setImageUrl(false)
      setGallery(true)
  }

  const galleryImage = async ()=>{
    const addDetails = collection(db, 'Discover_Srilanka')
    console.log('abc')
    await addDoc(addDetails,{destination:destination, nickname: destinationNickname, image: url, description:description, date:date, status:status})
    .then(()=>{
      setDestination('')
      setDestinationNickname('')
      setPhotoUrl('')
      setDescription('')
      toast.success('Discovery Added Successfully')
    })
  }

  const imageUrlHandler = async(e)=>{
      e.preventDefault();
      setImageUrl(true)
      setGallery(false)
  }

  const urlImage = async ()=>{
    const addDetails = collection(db, 'Discover_Srilanka')
    console.log('def')
    await addDoc(addDetails,{destination:destination, nickname: destinationNickname, image: photoUrl, description:description, date:date, status:status})
    .then(()=>{
      setDestination('')
      setDestinationNickname('')
      setPhotoUrl('')
      setDescription('')
      toast.success('Discovery Added Successfully')
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
                  value = {destination}
              />
            </div>

            <div>
              <input 
                  type="text" 
                  className='infoInput' 
                  onChange = {(e)=> setDestinationNickname(e.target.value)}
                  placeholder='Destination Nickname'
                  value = {destinationNickname}
              />
            </div>

            <div>
              {gallery && 
              <label>Add Image</label> }
                <input 
                    type={imageUrl?'text' : 'file'} 
                    className='infoInput' 
                    onChange = {(e)=> imageUrl? setPhotoUrl(e.target.value): setPhoto(e.target.files[0])}
                    placeholder= {imageUrl && 'Enter Image Url'}
                    value = {imageUrl? photoUrl: photo}
                />
            </div>

            <textarea value = {description} placeholder = 'Description' className = 'discoverDescription'
              onChange= {(e)=> setDescription(e.target.value)}></textarea>

          <div className='discoverBtnContainer'>
              <button className='discoverBtn' onClick = {()=>imageUrl?urlImage() : galleryImage()}>Add Discovery</button>
          </div>   
        </div>
      </div>
    </div>
  )
}

export default AddDiscover