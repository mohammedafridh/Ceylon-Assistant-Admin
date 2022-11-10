import React, {useState, useEffect} from 'react'
import '../Admin/Admin.css'
import {Select, MultiSelect } from '@mantine/core';
import { useUserAuth } from '../../../../../Context/Context';
import {db,storage} from '../../../../../Firebase'
import {doc, setDoc } from "firebase/firestore";
import {ref, uploadBytes, getDownloadURL} from 'firebase/storage'
import {v4} from 'uuid'
import {Form} from 'react-bootstrap'


const AddTourist = () => {

    const [fName, setFName] = useState('')
    const [lName, setLName] = useState('')
    const [contactNumber, setContactNumber] = useState('')
    const [passportNumber, setPassportNumber] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [password2, setPassword2] = useState('')
    const [profileImage, setProfileImage] = useState('')
    const [passportImage, setPassportImage] = useState('')
    const [status, setStatus] = useState('Active')
    const [error, setError] = useState('')
    const[url,setUrl] = useState(null)
    const[passportUrl,setPassportUrl] = useState(null)
    const {signUp} = useUserAuth();
    const current = new Date();
    const addDate = `${current.getDate()}/${current.getMonth()+1}/${current.getFullYear()}`;

      useEffect(() => {
        const getImageUrl = async () => {
            const guideProfileRef = ref(storage, `TouristProfile/${profileImage.name + v4()}`);
            uploadBytes(guideProfileRef, profileImage)
              .then(() => {
                getDownloadURL(guideProfileRef)
                  .then((url) => {
                    console.log({ url });
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
        const getPassPortImageUrl = async () => {
            const guidePassportRef = ref(storage, `TouristPassport/${passportImage.name + v4()}`);
            uploadBytes(guidePassportRef, passportImage)
              .then(() => {
                getDownloadURL(guidePassportRef)
                  .then((url) => {
                    console.log({ url });
                    setPassportUrl(url);
                  })
                  .catch((err) => {
                    setError(err.message, "error getting the image");
                  });
              })
              .catch((err) => {
                setError(err);
              });
          };
        const passPortImageUrl = async () => {
          await getPassPortImageUrl();
        };
        imageUrl();
        passPortImageUrl();
      }, [profileImage, passportImage]);

      const touristHandler = async (e) => {
        try {
            signUp(email, password)
              .then((data) => {
                const addDetails = doc(db, "Tourist", data.user.uid);    
                const details = {
                    firstName:fName,
                    lastName:lName,
                    contactNumber: contactNumber,
                    image: url,
                    passPortImage: passportUrl,
                    email: email,
                    password:password,
                    publishedDate:addDate,
                    status:status
                };
                setDoc(addDetails, details);
                setFName('')
                setLName('')
                setContactNumber('')
                setUrl('')
                setPassportUrl('')
                setEmail('')
                setPassword('')
              })
              .catch((error) => {
                console.log(error);
              });
          } catch (err) {
            setError(err.message);
            console.log(err);
          }

    }

  return (
    <div className='UsersContainer'>
        <div className="addUser">
        <div className = 'addUserForm'>
                
            <h3>Add Tourist</h3>

            <div>
                    <input 
                        type="text" 
                        className='userInput' 
                        onChange = {(e)=> setFName(e.target.value)}
                        placeholder='First Name'
                        value = {fName}
                    />
                    <input 
                        type="text" 
                        className='userInput' 
                        onChange = {(e)=> setLName(e.target.value)}
                        placeholder='Last Name'
                        value = {lName}
                    />
            </div>

            <div>
                    <input 
                        type="number" 
                        className='userInput' 
                        onChange = {(e)=> setContactNumber(e.target.value)}
                        placeholder='Contact Number'
                        value = {contactNumber}
                    />
               
                    <input 
                        type="text" 
                        className='userInput' 
                        onChange = {(e)=>setPassportNumber(e.target.value)}
                        placeholder= 'Passport Number'
                        value = {passportNumber}
                    />
            </div>

            <div>
                <input 
                    type="text" 
                    className='userInput' 
                    onChange = {(e)=> setEmail(e.target.value)}
                    placeholder='Email Address'
                    value = {email}
                />    
            </div>

            <div>
                <input 
                    type="password" 
                    className='userInput' 
                    onChange = {(e)=> setPassword(e.target.value)}
                    placeholder='Password'
                    value = {password}
                />

                {/* <input 
                    type="password" 
                    className='userInput' 
                    onChange = {(e)=> setPassword2(e.target.value)}
                    placeholder='Confirm Password'
                /> */}
            </div>

            <div className='userAuthImageContainer'>
                <div className="authProfile">
                    Profile Image
                    <input 
                        type="file" 
                        name = 'profileImg' 
                        onChange = {(e) => setProfileImage(e.target.files[0])}
                    />
                </div>
            
                <div className="authProfile">
                  <label>Passport Image</label>
                    <input 
                        type="file" 
                        name = 'coverImg' 
                        onChange = {(e)=>setPassportImage(e.target.files[0])}
                    />
                </div>
            </div>
            <button className="button infoButton" onClick={touristHandler}>Add Tourist </button>
        </div>
        
        </div>
     </div>

  )
}

export default AddTourist