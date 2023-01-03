import React, {useState, useEffect} from 'react'
import '../Admin/Admin.css'
import { useUserAuth } from '../../../../../Context/Context';
import {db,storage} from '../../../../../Firebase'
import {doc, setDoc } from "firebase/firestore";
import {ref, uploadBytes, getDownloadURL} from 'firebase/storage'
import {v4} from 'uuid'
import SuccessModal from "../../../../Modals/SuccessModal";
import { Button, FileInput } from '@mantine/core';

const AddTourist = () => {

    const [fName, setFName] = useState('')
    const [lName, setLName] = useState('')
    const [contactNumber, setContactNumber] = useState('')
    const [passportNumber, setPassportNumber] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [passwordMatch, setPasswordMatch] = useState(true);
    const [passportImage, setPassportImage] = useState('')
    const [status, setStatus] = useState('Active')
    const [error, setError] = useState('')
    const[profileURL,setProfileURL] = useState(null)
    const[passportUrl,setPassportUrl] = useState(null)
    const [formStatus, setFormStatus] = useState('')
    const {signUp} = useUserAuth();
    const current = new Date();
    const addDate = `${current.getDate()}/${current.getMonth()+1}/${current.getFullYear()}`;

     const setImage = (e, imageFolder, setUrl) => {
        const image = e.target.files[0];
        const storageImageRef = ref(storage, `${imageFolder}/${image?.name + v4()}`);
        if(image === null || image === undefined || image === '') {
          console.log("No file selected");
          return
        }
        uploadBytes(storageImageRef, image).then(() => {
          console.log("Uploaded a blob or file!");
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
      const touristHandler = async (e) => {
        validatePassword()
        e.preventDefault();
        setError("");
        try {
          if(passwordMatch === false) {
            return
          }
            signUp(email, password)
              .then((data) => {
                const addDetails = doc(db, "Tourist", data.user.uid);    
                const details = {
                    firstName:fName,
                    lastName:lName,
                    contactNumber: contactNumber,
                    image: profileURL,
                    passPortImage: passportUrl,
                    email: email,
                    publishedDate:addDate,
                    status:status
                };
                setDoc(addDetails, details);
                setFName('')
                setLName('')
                setContactNumber('')
                setProfileURL('')
                setPassportUrl('')
                setEmail('')
                setPassword('')
                setConfirmPassword('');
                setFormStatus("Success")
              })
              .catch((error) => {
                setFormStatus("Error")
                setError(error.message)
              });
          } catch (err) {
            setError(err.message);
            setFormStatus("Error")
          }
    }

    const validatePassword = () => {
      console.log(passwordMatch, password, confirmPassword)
      password === confirmPassword
        ? setPasswordMatch(true)
        : setPasswordMatch(false);
    };

  

  return (
    <div className='UsersContainer'>
        <div className="addUser">
        <form onSubmit={touristHandler} className = 'addUserForm'>
                
            <h3>Add Tourist</h3>
            { passwordMatch ? '' : <p style = {{color:"red", fontWeight:"bold"}}>* The passwords doesn't Match. Try Again!</p>}

            <div>
                    <input 
                        type="text" 
                        className='userInput' 
                        onChange = {(e)=> setFName(e.target.value)}
                        placeholder='First Name'
                        value = {fName}
                        required
                    />
                    <input 
                        type="text" 
                        className='userInput' 
                        onChange = {(e)=> setLName(e.target.value)}
                        placeholder='Last Name'
                        value = {lName}
                        required
                    />
            </div>

            <div>
                    <input 
                        type="number" 
                        className='userInput' 
                        onChange = {(e)=> setContactNumber(e.target.value)}
                        placeholder='Contact Number'
                        value = {contactNumber}
                        required
                    />
               
                    <input 
                        type="text" 
                        className='userInput' 
                        onChange = {(e)=>setPassportNumber(e.target.value)}
                        placeholder= 'Passport Number'
                        value = {passportNumber}
                        required
                    />
            </div>

            <div>
                <input 
                    type="text" 
                    className='userInput' 
                    onChange = {(e)=> setEmail(e.target.value)}
                    placeholder='Email Address'
                    value = {email}
                    required
                />    
            </div>

            <div>
                <input 
                    type="password" 
                    className='userInput' 
                    onChange = {(e)=> setPassword(e.target.value)}
                    placeholder='Password'
                    value = {password}
                    required
                />

                <input 
                    type="password" 
                    className='userInput' 
                    onChange = {(e)=> setConfirmPassword(e.target.value)}
                    placeholder='Confirm Password'
                    value = {confirmPassword}
                    required
                />
            </div>
           
            <div className='userAuthImageContainer'>
                <div className="authProfile">
                    Profile Image
                    <input 
                        type="file" 
                        name = 'profileImg' 
                        onChange = {(e) => setImage(e, 'TestProfile', setProfileURL)}
                        required
                    />

                </div>
            
                <div className="authProfile">
                  <label>Passport Image</label>
                    <input 
                        type="file" 
                        name = 'coverImg' 
                        onChange = {(e) => setImage(e, 'TestPassport', setPassportUrl)}
                        required
                    />
                </div>
            </div>
            <button type="submit" className="button infoButton">
                 Add Tourist
            </button>
        </form>
        
        </div>
        <SuccessModal modalOpened={formStatus === 'Success' ?  true : false} setModalOpened={() => {setFormStatus('')}}/>
     </div>

  )
}

export default AddTourist