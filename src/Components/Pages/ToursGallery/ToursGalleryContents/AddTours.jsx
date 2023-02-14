import React, {useState,useEffect,useRef} from 'react'
import './AddTours.css'
import {collection, addDoc, setDoc, doc} from 'firebase/firestore'
import {db,storage} from '../../../../Firebase'
import { Select } from '@mantine/core';
import {ref, uploadBytes, getDownloadURL} from 'firebase/storage'
import {v4} from 'uuid'
import { toast } from "react-hot-toast";
import loadingGif from '../../../../assets/loading-gif.gif'

const AddTours = () => {

  const [destination,setDestination] = useState('')
  const [guide,setGuide] = useState('')
  const [mainImage,setMainImage] = useState('')
  const [image1,setImage1] = useState('')
  const [image2,setImage2] = useState('')
  const [image3,setImage3] = useState('')
  const [image4,setImage4] = useState('')
  const [status,setStatus] = useState('Active')
  const [error,setError] = useState(false)
  const [imgError,setImgError] = useState('')
  const mainImageRef = useRef()
  const image1Ref = useRef()
  const image2Ref = useRef()
  const image3Ref = useRef()
  const image4Ref = useRef()
  const[loading,setLoading] = useState(false)

  const districtData=[
    { value: 'Hambanthota', label: 'Hambanthota' },
    { value: 'Matara', label: 'Matara' },
    { value: 'Galle', label: 'Galle' },
    { value: 'Badulla', label: 'Badulla' },
    { value: 'Monaragala', label: 'Monaragala' },
    { value: 'Trincomalee', label: 'Trincomalee' },
    { value: 'Batticaloa', label: 'Batticaloa' },
    { value: 'Ampara', label: 'Ampara' },
    { value: 'Kegalle', label: 'Kegalle' },
    { value: 'Rathnapura', label: 'Rathnapura' },
    { value: 'Matale', label: 'Matale' },
    { value: 'Kandy', label: 'Kandy' },
    { value: 'Nuwara-Eliya', label: 'Nuwara Eliya' },
    { value: 'Anuradhapura', label: 'Anuradhapura' },
    { value: 'Polonnaruwa', label: 'Polonnaruwa' },
    { value: 'Gampaha', label: 'Gampaha' },
    { value: 'Colombo', label: 'Colombo' },
    { value: 'Kalutara', label: 'Kalutara' },
    { value: 'Puttalam', label: 'Puttalam' },
    { value: 'Kurunegala', label: 'Kurunegala' },
    { value: 'Jaffna', label: 'Jaffna' },
    { value: 'Kilinochchi', label: 'Kilinochchi' },
    { value: 'Mannar', label: 'Mannar' },
    { value: 'Mullativu', label: 'Mullativu' },
    { value: 'Vavuniya', label: 'Vavuniya' },
]

const[district,setDistrict] = useState()
  const districtHandler = (e)=>{
    setDistrict(e)
  }

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

  const tourHandler = async(e)=>{
    e.preventDefault()
    try{
      const addTour = collection(db, "toursGallery")
      setLoading(true)
      await addDoc(addTour,{guideId:guide, destination:destination, district: district,
      mainImage:mainImage, image1:image1, image2:image2, image3:image3, image4:image4, status:status})
        .then(()=>{
          setGuide('')
          setDestination('')
          setDistrict([])
          setMainImage('')
          setImage1('')
          setImage2('')
          setImage3('')
          setImage4('')
          mainImageRef.current.value = "";
          image1Ref.current.value = "";
          image2Ref.current.value = "";
          image3Ref.current.value = "";
          image4Ref.current.value = "";
          setError(false)
          setLoading(false)
          toast.success('Tour Added Successfully!')
        })
    }catch(err){
      toast.error('Please Try Again!')
      console.log(err)
    }

  }

  return (
    <div className="addThings">
        <form onSubmit={tourHandler} className = 'addThingsForm'>      
            <h3>Add Tours</h3>
            { imgError ? <p style = {{color:"red", fontWeight:"bold"}}>* Please select a valid image!</p>: ''}

            <div className='detailsContainer'>
              <input 
                    type="text" 
                    className='addTourInput' 
                    onChange = {(e)=> setGuide(e.target.value)}
                    placeholder='Guide ID'
                    value = {guide}
                    required
                />

              <input 
                  type="text" 
                  className='addTourInput' 
                  onChange = {(e)=> setDestination(e.target.value)}
                  placeholder='Destination'
                  value = {destination}
                  required
              />

                <Select 
                    style = {{width:"17rem", outline:"none", border:'none'}} 
                    data = {districtData} 
                    placeholder = 'Select District' 
                    onChange={districtHandler}
                    className = 'typeDrop'
                    value = {district}
                    required
                />
            </div>

            <div className="imageContainer">
                <div className="authProfile">
                  <span>Main Image</span>
                  {mainImage&&
                    <img src={mainImage} width={50} height={50} alt="profile" />}
                    <input 
                        type="file" 
                        name = 'coverImg' 
                        onChange = {(e) => setImage(e, 'toursGallery', setMainImage)}
                        required
                        ref={mainImageRef}
                    />
                </div>

              <div className= 'splitImageContainer'>
                <div className="authProfile">
                    <span>Image 1</span>
                    {image1 &&
                    <img src={image1} width={50} height={50} alt="profile" />}
                      <input 
                          type="file" 
                          name = 'coverImg' 
                          onChange = {(e) => setImage(e, 'toursGallery', setImage1)}
                          ref={image1Ref}
                          required
                      />
                </div>

                <div className="authProfile">
                    <span>Image 2</span>
                    {image2 &&
                    <img src={image2} width={50} height={50} alt="profile" />}
                      <input 
                          type="file" 
                          name = 'coverImg' 
                          onChange = {(e) => setImage(e, 'toursGallery', setImage2)}
                          ref={image2Ref}
                          required
                      />
                </div>
              </div>

              <div className= 'splitImageContainer'>
                <div className="authProfile">
                    <span>Image 3</span>
                    {image3 &&
                    <img src={image3} width={50} height={50} alt="profile" />}
                      <input 
                          type="file" 
                          name = 'coverImg' 
                          onChange = {(e) => setImage(e, 'toursGallery', setImage3)}
                          ref={image3Ref}
                          required
                      />
                </div>

                <div className="authProfile">
                    <span>Image 4</span>
                    {image4 &&
                    <img src={image4} width={50} height={50} alt="profile" />}
                      <input 
                          type="file" 
                          name = 'coverImg' 
                          onChange = {(e) => setImage(e, 'toursGallery', setImage4)}
                          ref={image4Ref}
                          required
                      />
                </div>
              </div>
            </div>

          <div className='addThingsBtnContainer'>
          {loading?
              <button type = 'submit' className="addThingsBtn">
                <img className='loadingIcon' src={loadingGif} />
              </button>:

              <button type = 'submit' className='addThingsBtn' >Add Tour To Gallery</button>}
          </div>   
        </form>
      </div>
  )
}

export default AddTours