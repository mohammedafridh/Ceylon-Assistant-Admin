import React, {useState, useRef} from 'react'
import './AddDiscover.css'
import {collection, addDoc} from 'firebase/firestore'
import {db, storage} from '../../../../Firebase'
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { v4 } from "uuid";
import { toast } from "react-hot-toast";
import loadingGif from '../../../../assets/loading-gif.gif'

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
  const[discoveryUrl,setDiscoveryUrl] = useState(null)
  const [error,setError] = useState('')
  const[imgError,setImgError] = useState(false)
  const current = new Date();
  const date = `${current.getDate()}/${current.getMonth()+1}/${current.getFullYear()}`;
  const discoverRef = useRef()
  const[loading,setLoading] = useState(false)

  const setImage = (e, imageFolder, setUrl) => {
    const image = e.target.files[0];
    const storageImageRef = ref(storage, `${imageFolder}/${image?.name + v4()}`);
    if(image === null || image === undefined || image === '') {
      console.log("No file selected");
      setImgError(true)
      return
    }
    uploadBytes(storageImageRef, image).then(() => {
      setImgError(false)
      getDownloadURL(storageImageRef)
        .then((url) => {
          setUrl(url);
          console.log({ profile: url });
        })
        .catch((error) => {
          console.log({ error });
        })
    });
  }


  const galleryImageHandler = async (e)=>{
      e.preventDefault();
      setImageUrl(false)
      setGallery(true)
  }

  const galleryImage = async ()=>{
    setLoading(true)
    const addDetails = collection(db, 'Discover_Srilanka')
    console.log('abc')
    await addDoc(addDetails,{destination:destination, nickname: destinationNickname, image: discoveryUrl, description:description, date:date, status:status})
    .then(()=>{
      setDestination('')
      setDestinationNickname('')
      setDiscoveryUrl('')
      setDescription('')
      discoverRef.current.value = "";
      setLoading(false)
      toast.success('Discovery Added Successfully')
    })
  }

  const imageUrlHandler = async(e)=>{
      e.preventDefault();
      setImageUrl(true)
      setGallery(false)
  }

  const urlImage = async ()=>{
    setLoading(true)
    const addDetails = collection(db, 'Discover_Srilanka')
    console.log('def')
    await addDoc(addDetails,{destination:destination, nickname: destinationNickname, image: photoUrl, description:description, date:date, status:status})
    .then(()=>{
      setDestination('')
      setDestinationNickname('')
      setPhotoUrl('')
      setDescription('')
      setLoading(false)
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
                  required
              />
            </div>

            <div>
              <input 
                  type="text" 
                  className='infoInput' 
                  onChange = {(e)=> setDestinationNickname(e.target.value)}
                  placeholder='Destination Nickname'
                  value = {destinationNickname}
                  required
              />
            </div>

            <div>
              {gallery && 
              <label>Add Image</label> }
              {gallery?
              <div>
              {discoveryUrl &&
                  <img src={discoveryUrl} width={70} height={70} alt="profile" />}</div> : 
              
              <div>
                {photoUrl&&
                  <img src={photoUrl} width={70} height={70} alt="profile" />}</div>
                  }
                <input 
                    type={imageUrl?'text' : 'file'} 
                    className='infoInput' 
                    onChange = {(e)=> imageUrl? setPhotoUrl(e.target.value): setImage(e, 'DiscoveryImage', setDiscoveryUrl)}
                    // onChange = {(e) => setImage(e, 'TouristProfile', setProfileURL)}
                    placeholder= {imageUrl && 'Enter Image Url'}
                    ref={discoverRef}
                    value = {imageUrl&& photoUrl}
                    required
                />
            </div>

            <textarea value = {description} placeholder = 'Description' className = 'discoverDescription'
              onChange= {(e)=> setDescription(e.target.value)} required></textarea>

          <div className='discoverBtnContainer'>
            
          {loading?
          <button type = 'submit' className="discoverBtn">
            <img className='loadingIcon' src={loadingGif} />
          </button>:
              <button className='discoverBtn' onClick = {()=>imageUrl?urlImage() : galleryImage()}>Add Discovery</button>}
          </div>   
        </div>
      </div>
    </div>
  )
}

export default AddDiscover