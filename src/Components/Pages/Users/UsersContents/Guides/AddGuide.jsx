import React, { useState, useEffect,useRef } from 'react'
import '../Admin/Admin.css'
import { useUserAuth } from '../../../../../Context/Context';
import { db, storage } from '../../../../../Firebase'
import { doc, setDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import { v4 } from 'uuid'
// import Select from 'react-select'
import { Select,MultiSelect } from '@mantine/core';
import SuccessModal from "../../../../Modals/SuccessModal";
import { toast } from 'react-hot-toast';
import loadingGif from '../../../../../assets/loading-gif.gif'


const AddGuide = () => {

  const [fName, setFName] = useState('')
  const [lName, setLName] = useState('')
  const [contactNumber, setContactNumber] = useState('')
  const [nicNumber, setNicNumber] = useState('')
  const [address, setAddress] = useState('')
  const [guideRate, setGuideRate] = useState('')
  const [model, setModel] = useState('')
  const [maxPassengers, setMaxPassengers] = useState('')
  const [perKm, setPerKm] = useState('')
  const [email, setEmail] = useState('')
  const[loading,setLoading] = useState(false)
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [passwordMatch, setPasswordMatch] = useState(true);
  const [profileImage, setProfileImage] = useState('')
  const [nicImage, setNicImage] = useState('')
  const [passportImage, setPassportImage] = useState('')
  const [status, setStatus] = useState('Active')
  const [availability, setAvailability] = useState('Available')
  const [error, setError] = useState('')
  const [url, setUrl] = useState(null)
  const[profileUrl,setProfileUrl] = useState('')
  const [nicUrl, setNicUrl] = useState('')
  const [formStatus, setFormStatus] = useState('')
  const [ratings, setRatings] = useState([])
  const [modalOpened, setModalOpened] = useState(false)
  const [imgError, setImgError] = useState(false)
  const { signUp } = useUserAuth();
  const current = new Date();
  const addDate = `${current.getDate()}/${current.getMonth() + 1}/${current.getFullYear()}`;
  const [languages, setLanguages] = useState('')
  const [profileImageInputRef, setProfileImageInputRef] = useState()
  const [nicImageInputRef, setNicImageInputRef] = useState()
  const profileRef = useRef()
  const nicRef = useRef()

  //language dropdown data
  // const language = [
  //   { value: 'Sinhala  ', label: 'Sinhala' },
  //   { value: 'English  ', label: 'English' },
  //   { value: 'Hindi  ', label: 'Hindi' },
  //   { value: 'Malayalam  ', label: 'Malayalam' },
  //   { value: 'Urdu  ', label: 'Urdu' },
  //   { value: 'French  ', label: 'French' },
  //   { value: 'Arabic  ', label: 'Arabic' },
  //   { value: 'Spanish  ', label: 'Spanish' },
  //   { value: 'Russian  ', label: 'Russian' },
  //   { value: 'Chinese  ', label: 'Chinese' },
  //   { value: 'Japanese  ', label: 'Japanese' },
  //   { value: 'Italian  ', label: 'Italian' },
  //   { value: 'Korean  ', label: 'Korean' },
  // ];

  // const [languages, setLanguages] = useState('')
  // const languageHandler = (e) => {
  //   setLanguages(Array.isArray(e) ? e.map(x => x.label) : []);
  // }

  const languageData = [
    "Sinhala",
    "English",
    "Hindi",
    "Malayalam",
    "Urdu",
    "French",
    "Arabic",
    "Spanish",
    "Russian",
    "Chinese",
    "Japanese",
    "Italian",
    "Korean",
  ];

  //guide dropdown data
  const typeData = [
    { value: 'National', label: 'National' },
    { value: 'Site', label: 'Site' }
  ]

  const [type, setType] = useState()
  const typeHandler = (e) => {
    setType(e)
  }

  //district dropdown data

  const districtData = [
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

  const [district, setDistrict] = useState()
  const districtHandler = (e) => {
    console.log(e)
    setDistrict(e)
  }

  //car dropdown data

  const carType = [
    { value: 'Car', label: 'Car' },
    { value: 'Van', label: 'Van' },
    { value: 'Mini-Jeep', label: 'Mini Jeep' },
  ]

  const [vehicleType, setVehicleType] = useState()
  const vehicleHandler = (e) => {
    setVehicleType(e)
  }

  const setImage = (e, imageFolder, setUrl) => {
    const image = e.target.files[0];
    const storageImageRef = ref(storage, `${imageFolder}/${image?.name + v4()}`);
    if (image === null || image === undefined || image === '') {
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

  const guideHandler = async (e) => {
    console.log({district, type, languages})
    e.preventDefault();
    setError("");
    if (password === confirmPassword) {
      if (contactNumber.length === 10) {
        if (!imgError) {
          setLoading(true)
          signUp(email, password)
            .then((data) => {
              const addDetails = doc(db, "Guides", data.user.uid);
              const details = {
                firstName: fName,
                lastName: lName,
                contactNumber: contactNumber,
                nicNumber: nicNumber,
                address: address,
                district: district,
                guideType: type,
                languages: languages,
                guideRate: guideRate,
                vehicleType: vehicleType,
                model: model,
                maxPassengers: maxPassengers,
                perKmRate: perKm,
                image: profileUrl,
                nicImage: nicUrl,
                email: email,
                password: password,
                publishedDate: addDate,
                status: status,
                availability: availability,
                ratings: ratings
              };
              setDoc(addDetails, details);
              setFName('')
              setLName('')
              setContactNumber('')
              setNicNumber('')
              setAddress('')
              setDistrict([])
              setType([])
              setLanguages([])
              setGuideRate('')
              setVehicleType([])
              setModel('')
              setMaxPassengers('')
              setPerKm('')
              setUrl('')
              setProfileUrl('')
              setNicUrl('')
              setEmail('')
              setPassword('')
              setConfirmPassword("");
              profileRef.current.value = "";
              nicRef.current.value = "";
              setLoading(false)
              toast.success('Guide added Successfully!')
            })
        } else {
          setError('*Image is not valid. Enter a valid one!')
          setLoading(false)
        }
      } else {
        setLoading(false)
        setError('*Contact Number must be 10 characters')
      }
    } else {
      setLoading(false)
      setError('Passwords Do Not Match!')
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

        <form onSubmit={guideHandler} className='addUserForm'>

          <h3>Add Guide</h3>
          <p style={{ color: error && 'red', fontWeight: 'bold' }}>{error}</p>

          <div>
            <input
              type="text"
              className='userInput'
              onChange={(e) => setFName(e.target.value)}
              placeholder='First Name'
              value={fName}
              required
            />
            <input
              type="text"
              className='userInput'
              onChange={(e) => setLName(e.target.value)}
              placeholder='Last Name'
              value={lName}
              required
            />
          </div>

          <div>
            <input
              type="tel"
              className='userInput'
              onChange={(e) => setContactNumber(e.target.value)}
              placeholder='Contact Number'
              value={contactNumber}
              required
            />

            <input
              type="text"
              className='userInput'
              onChange={(e) => setNicNumber(e.target.value)}
              placeholder='NIC Number'
              value={nicNumber}
              required
            />
          </div>

          <div>
            <input
              type="text"
              className='userInput'
              onChange={(e) => setAddress(e.target.value)}
              placeholder='Address'
              value={address}
              required
            />

            {/* <Select
              options={districtData}
              placeholder='Select District'
              onChange={districtHandler}
              className='typeDrop'
              required
            /> */}
            <Select
            data={districtData}
            placeholder='Select District'
            onChange={districtHandler}
            className='typeDrop'
            value = {district}
            required
            />
          </div>

          <div>
            <MultiSelect
              data={languageData}
              placeholder='Select Languages'
              value = {languages}
              onChange={setLanguages}
              className='langDrop'
              required
            /> 

            <Select
              data={typeData}
              placeholder='Guide Type'
              onChange={typeHandler}
              className='guideDrop'
              value = {type}
              required
            />

            <input
              type="number"
              className='userInput'
              onChange={(e) => setGuideRate(e.target.value)}
              placeholder='Guide Rate Per Day'
              value={guideRate}
              required
              style = {{width:200}}
            />
          </div>

          {/* <div>
            <Select
              data={typeData}
              placeholder='Guide Type'
              onChange={typeHandler}
              className='guideDrop'
              required
            />

            <input
              type="number"
              className='userInput'
              onChange={(e) => setGuideRate(e.target.value)}
              placeholder='Guide Rate Per Day'
              value={guideRate}
              required
            />
          </div> */}

          <div>
            <Select
              data={carType}
              placeholder='Vehicle Type'
              onChange={vehicleHandler}
              className='typeDrop'
              value = {vehicleType}
              required
            /> 

            <input
              type="text"
              className='userInput'
              onChange={(e) => setModel(e.target.value)}
              placeholder='Vehicle Model'
              value={model}
              required
            />

            <input
              type="number"
              className='userInput'
              onChange={(e) => setMaxPassengers(e.target.value)}
              placeholder='Maximum Passengers'
              value={maxPassengers}
              required
            />

            <div className='perKm'>
              <input
                type="number"
                className='userInput'
                onChange={(e) => setPerKm(e.target.value)}
                placeholder='Per Km Rate'
                value={perKm}
                required
              />
              <span>*Rate for own vehicle charges</span>
            </div>
          </div>

          <div>
            <input
              type="text"
              className='userInput'
              onChange={(e) => setEmail(e.target.value)}
              placeholder='Email Address'
              value={email}
              required
            />
          </div>

          <div>
            <input
              type="password"
              className="userInput"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <input
              type="password"
              className="userInput"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>


          <div className='userAuthImageContainer'>
            <div className="authProfile">
              Profile Image
              {profileUrl && <img src={profileUrl} width={70} height={70} alt="profile" />}
              <input
                type="file"
                name='profileImg'
                onChange={(e) => setImage(e, 'GuideProfile', setProfileUrl)}
                required
                ref={profileRef}
              />

            </div>
            <div className="authProfile">
              <label>NIC Image</label>
              {nicUrl && <img src={nicUrl} width={70} height={70} alt="profile" />}
              <input
                type="file"
                name='coverImg'
                onChange={(e) => setImage(e, 'GuideNic', setNicUrl)}
                required
                ref={nicRef}
              />
            </div>

          </div>

          {loading?
          <button type = 'submit' className="button infoButton">
          <img className='loadingIcon' src={loadingGif} />
          </button>:

          <button type="submit" className="button infoButton">
            Add Guide
          </button>}
        </form>
      </div>
      <SuccessModal modalOpened={modalOpened} setModalOpened={setModalOpened} />
    </div>

  )
}

export default AddGuide