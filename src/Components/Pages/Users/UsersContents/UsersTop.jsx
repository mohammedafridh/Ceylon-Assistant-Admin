import React, {useState, useEffect} from 'react'
import './UsersTop.css'
import {Select, MultiSelect } from '@mantine/core';
import { useUserAuth } from '../../../../Context/Context';
import {db,storage} from '../../../../Firebase'
import {doc, setDoc } from "firebase/firestore";
import {ref, uploadBytes, getDownloadURL} from 'firebase/storage'
import {v4} from 'uuid'


const UsersTop = () => {

    const [admin,setAdmin] = useState(true)
    const [guide,setGuide] = useState(false)
    const [tourist,setTourist] = useState(false)
    const [fName, setFName] = useState('')
    const [lName, setLName] = useState('')
    const [contactNumber, setContactNumber] = useState('')
    const [passportNumber, setPassportNumber] = useState('')
    const [nicNumber, setNicNumber] = useState('')
    const [address, setAddress] = useState('')
    const [district, setDistrict] = useState('')
    const [type, setType] = useState('')
    const [languages, setLanguages] = useState([])
    const [guideRate, setGuideRate] = useState('')
    const [vehicleType, setVehicleType] = useState('')
    const [model, setModel] = useState('')
    const [maxPassengers, setMaxPassengers] = useState('')
    const [perKM, setPerKm] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [password2, setPassword2] = useState('')
    const [profileImage, setProfileImage] = useState('')
    const [idImage, setNicImage] = useState('')
    const [passportImage, setPassportImage] = useState('')
    const [date, setDate] = useState('')
    const [status, setStatus] = useState('Active')
    const [error, setError] = useState('')
    const[url,setUrl] = useState(null)
    const {signUp} = useUserAuth();
    const current = new Date();
    const addDate = `${current.getDate()}/${current.getMonth()+1}/${current.getFullYear()}`;


    const data = [
        { value: 'Sinhala', label: 'Sinhala' },
        { value: 'English', label: 'English' },
        { value: 'Hindi', label: 'Hindi' },
        { value: 'Malayalam', label: 'Malayalam' },
        { value: 'Urdu', label: 'Urdu' },
        { value: 'French', label: 'French' },
        { value: 'Arabic', label: 'Arabic' },
        { value: 'Spanish', label: 'Spanish' },
        { value: 'Russian', label: 'Russian' },
        { value: 'Chinese', label: 'Chinese' },
        { value: 'Japanese', label: 'Japanese' },
        { value: 'Italian', label: 'Italian' },
        { value: 'Korean', label: 'Korean' },
      ];

      useEffect(() => {
        const getImageUrl = async () => {
            const guideProfileRef = ref(storage, `GuideProfile/${profileImage.name + v4()}`);
            uploadBytes(guideProfileRef, profileImage)
              .then(() => {
                getDownloadURL(guideProfileRef)
                  .then((url) => {
                    console.log({ url });
                    setUrl(url);
                    //add details part
                    console.log("I'm here");
                    // const addDetails = doc(db, "Tourists")
                    // setDoc(addDetails,{name:newName, image:url, email:newEmail, gender:newGender,
                    //          contact_Number:newContactNumber})
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
      }, [profileImage]);

      const adminHandler = async (e) => {
        e.preventDefault()
        setAdmin(true)
        setGuide(false)
        setTourist(false)
        setError("")
            try {
              signUp(email, password)
                .then((data) => {
                  const addDetails = doc(db, "Admin", data.user.uid);
                  const details = {
                    email: email,
                    publishDate:addDate,
                    status:status
                  };
                  setDoc(addDetails, details);
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
          };

      const guideHandler = async (e) => {
        e.preventDefault()
        setAdmin(false)
        setGuide(true)
        setTourist(false)
        try {
            signUp(email, password)
              .then((data) => {
                const addDetails = doc(db, "Guide", data.user.uid);
                const details = {
                    firstName:fName,
                    lastName:lName,
                    contactNumber: contactNumber,
                    nicNumber: nicNumber,
                    address: address,
                    district: district,
                    guideType : type,
                    languages: languages,
                    guideRate:guideRate,
                    vehicleType:vehicleType,
                    model: model,
                    maxPassengers:maxPassengers,
                    perKmRate: perKM,
                    image: url,
                    email: email,
                    password:password,
                    publishedDate:addDate,
                    status:status
                };
                setDoc(addDetails, details);
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

    const touristHandler = async (e) => {
        e.preventDefault()
        setAdmin(false)
        setGuide(false)
        setTourist(true)

    }


  return (
    <div className='UsersContainer'>
        <div className="addUser">
        <div className="userTypeButtons">
            <button onClick = {adminHandler}>Admin</button>
            <button onClick = {guideHandler}>Tour Guides</button>
            <button onClick = {touristHandler}>Tourists</button>
        </div>

        <div className = 'addUserForm'>
                
            <h3>{tourist? 'Add Tourist' : guide? 'Add Guide' : 'Add Admin'}</h3>
            
            {(tourist || guide) &&
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
            }

            {(tourist || guide) &&
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
                        onChange = {tourist? (e)=>setPassportNumber(e.target.value): (e)=>setNicNumber(e.target.value)}
                        placeholder={tourist? 'Passport Number' : 'NIC Number'}
                        value = {tourist? passportNumber : nicNumber}
                    />
            </div>
            }

        {guide &&

            <div>
                <input 
                    type="text" 
                    className='userInput' 
                    onChange = {(e)=> setAddress(e.target.value)}
                    placeholder='Address'
                    value = {address}
                /> 

                <Select 
                    // style = {{width:"21rem", outline:"none"}} 
                    onChange = {(e)=> setDistrict(e.target.value)} 
                    placeholder='District'

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
        }

        {guide &&
            <div>
                <Select 
                    style = {{width:"15rem", outline:"none"}} 
                    onChange = {(e)=> setType(e.target.value)} 
                    placeholder='Guide Type'

                    data={[
                        { value: 'National', label: 'National' },
                        { value: 'Site', label: 'Site' },
                    ]}
                />

                <MultiSelect
                    data={data}
                    style = {{width:"19.5rem", outline:"none"}}
                    placeholder="Select Known Languages"
                    onChange = {(e)=> setLanguages([e.target.value])} 
                />

                <input 
                    type="number" 
                    className='infoInput' 
                    onChange = {(e)=> setGuideRate(e.target.value)} 
                    placeholder='Guide Rate Per Day'
                    value = {guideRate}
                />
            </div>
        }

        {guide &&
            <div>
                <Select 
                style = {{width:"10rem", outline:"none"}} 
                onChange = {(e)=> setVehicleType(e.target.value)} 
                placeholder='Vehicle Type'

                data={[
                    { value: 'Car', label: 'Car' },
                    { value: 'Van', label: 'Van' },
                    { value: 'Mini-Jeep', label: 'Mini Jeep' },
                  ]}
                />

                <input 
                    type="text" 
                    className='userInput' 
                    onChange = {(e)=> setModel(e.target.value)} 
                    placeholder='Vehicle Model'
                    value = {model}
                />

                <input 
                    type="number" 
                    className='userInput' 
                    onChange = {(e)=> setMaxPassengers(e.target.value)} 
                    placeholder='Maximum Passengers'
                    value = {maxPassengers}
                />

                <div className = 'perKm'>
                    <input 
                        type="number" 
                        className='userInput' 
                        onChange = {(e)=> setPerKm(e.target.value)} 
                        placeholder='Per Km Rate'
                        value = {perKM}
                    />
                    <span>*Rate for own vehicle charges</span>
                </div>
            </div>
        }

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
                    className='infoInput' 
                    onChange = {(e)=> setPassword2(e.target.value)}
                    placeholder='Confirm Password'
                /> */}
            </div>

            <div className='userAuthImageContainer'>
            {(tourist || guide) &&
                <div className="authProfile">
                    Profile Image
                    <input 
                        type="file" 
                        name = 'profileImg' 
                        onChange = {(e) => setProfileImage(e.target.files[0])}
                    />
                </div>
            }
            
            {(tourist || guide) &&
                <div className="authProfile">
                    {tourist? 'Passport Image' : 'Identity Image'}
                    <input 
                        type="file" 
                        name = 'coverImg' 
                        onChange = {tourist? (e)=>setPassportImage(e.target.files[0]): (e)=>setNicImage(e.target.files[0])}
                    />
                </div>
            }
            </div>
            <button className="button infoButton" 
                onClick={guideHandler}>
                {tourist?'Add Tourist' : guide? 'Add Guide' : 'Add Admin'}
            </button>
        </div>
        
        </div>
     </div>

  )
}

export default UsersTop