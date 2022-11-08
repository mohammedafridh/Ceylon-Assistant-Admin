import React, {useState} from 'react'
import './AddTours.css'
import {collection, addDoc} from 'firebase/firestore'
import {db} from '../../../../Firebase'
import {Select } from '@mantine/core';

const AddTours = () => {

  const [destination,setDestination] = useState('')
  const [district,setDistrict] = useState('')
  const [guide,setGuide] = useState('')
  const [mainImage,setMainImage] = useState('')
  const [image1,setImage1] = useState('')
  const [image2,setImage2] = useState('')
  const [image3,setImage3] = useState('')
  const [image4,setImage4] = useState('')
  const [status,setStatus] = useState('active')

  const addThingsHandler = async(e)=>{
      e.preventDefault();
      const addDetails = collection(db, 'AddTours')
        addDoc(addDetails,{destination:destination, district: district, guide:guide, mainImage:mainImage, status:status})
        .then(()=>{
          setDestination('')
          setDistrict('')
          setGuide('')
          setMainImage('')
        })
  }

  return (
    <div className="addThings">
        <div className = 'addThingsForm'>      
            <h3>Add Tours</h3>
            <div className='detailsContainer'>
              <input 
                    type="text" 
                    className='addTourInput' 
                    onChange = {(e)=> setGuide(e.target.value)}
                    placeholder='Guide Name'
                    value = {guide}
                />

              <input 
                  type="text" 
                  className='addTourInput' 
                  onChange = {(e)=> setDestination(e.target.value)}
                  placeholder='Destination'
                  value = {destination}
              />

            <Select 
                style = {{width:"20rem", outline:"none"}} 
                onChange = {(e)=> setDistrict(e.target.value)} 
                placeholder='District'
                value = {district}

                data={[
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
              ]}
            />
            </div>

            <div className="imageContainer">
                <div className="authProfile">
                  <span>Main Image</span>
                    <input 
                        type="file" 
                        name = 'coverImg' 
                        onChange = {(e)=>setMainImage(e.target.files[0])}
                        value = {mainImage}
                    />
                </div>

                <div className="authProfile">
                    <span>Image 1</span>
                      <input 
                          type="file" 
                          name = 'coverImg' 
                          onChange = {(e)=>setImage1(e.target.files[0])}
                          value = {image1}
                      />
                </div>

                <div className="authProfile">
                    <span>Image 2</span>
                      <input 
                          type="file" 
                          name = 'coverImg' 
                          onChange = {(e)=>setImage2(e.target.files[0])}
                          value = {image2}
                      />
                </div>

                <div className="authProfile">
                    <span>Image 3</span>
                      <input 
                          type="file" 
                          name = 'coverImg' 
                          onChange = {(e)=>setImage3(e.target.files[0])}
                          value = {image3}
                      />
                </div>

                <div className="authProfile">
                    <span>Image 4</span>
                      <input 
                          type="file" 
                          name = 'coverImg' 
                          onChange = {(e)=>setImage4(e.target.files[0])}
                          value = {image4}
                      />
                </div>
            </div>

          <div className='addThingsBtnContainer'>
              <button className='addThingsBtn' onClick = {addThingsHandler}> Add Tour</button>
          </div>   
        </div>
      </div>
  )
}

export default AddTours