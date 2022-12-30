import React, {useState, useEffect} from 'react'
import '../Admin/Admin.css'
import { useUserAuth } from '../../../../../Context/Context';
import {db,storage} from '../../../../../Firebase'
import {doc, setDoc } from "firebase/firestore";
import {ref, uploadBytes, getDownloadURL} from 'firebase/storage'
import {v4} from 'uuid'
import SuccessModal from "../../../../Modals/SuccessModal";

const AddTourist = () => {

    const [fName, setFName] = useState('')
    const [lName, setLName] = useState('')
    const [contactNumber, setContactNumber] = useState('')
    const [passportNumber, setPassportNumber] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [passwordMatch, setPasswordMatch] = useState(true);
    const [profileImage, setProfileImage] = useState('')
    const [passportImage, setPassportImage] = useState('')
    const [status, setStatus] = useState('Active')
    const [error, setError] = useState('')
    const[url,setUrl] = useState(null)
    const[passportUrl,setPassportUrl] = useState(null)
    const [formStatus, setFormStatus] = useState('')
    const[modalOpened,setModalOpened] = useState(false)
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
        // validatePassword()
        e.preventDefault();
        setError("");
        try {
            signUp(email, password)
              .then((data) => {
                const addDetails = doc(db, "Tourist", data.user.uid);    
                const details = {
                    firstName:fName,
                    lastName:lName,
                    contactNumber: contactNumber,
                    image: url,
                    passportNumber:passportNumber,
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
                setPassportNumber('')
                setUrl('')
                setPassportUrl('')
                setEmail('')
                setPassword('')
                setModalOpened(true)
                // setFormStatus("Success")
              })
              .catch((error) => {
                // setFormStatus("Error")
                setError(error.message)
              });
          } catch (err) {
            setError(err.message);
            // setFormStatus("Error")
          }
    }

    // const validatePassword = () => {
    //   console.log(passwordMatch, password, confirmPassword)
    //   password === confirmPassword
    //     ? setPasswordMatch(true)
    //     : setPasswordMatch(false);
    // };

  return (
    <div className='UsersContainer'>
        <div className="addUser">
        <form onSubmit={touristHandler} className = 'addUserForm'>
                
            <h3>Add Tourist</h3>

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

            </div>
           
            <div className='userAuthImageContainer'>
                <div className="authProfile">
                    Profile Image
                    <input 
                        type="file" 
                        name = 'profileImg' 
                        onChange = {(e) => setProfileImage(e.target.files[0])}
                        required
                    />
                </div>
            
                <div className="authProfile">
                  <label>Passport Image</label>
                    <input 
                        type="file" 
                        name = 'coverImg' 
                        onChange = {(e)=>setPassportImage(e.target.files[0])}
                        required
                    />
                </div>
            </div>
            <button type="submit" className="button infoButton">
                 Add Tourist
            </button>
        </form>
        
        </div>
        <SuccessModal modalOpened={modalOpened} setModalOpened={setModalOpened}/>
     </div>

  )
}

export default AddTourist
