import React, {useState, useEffect} from 'react'
import '../Admin/Admin.css'
import { useUserAuth } from '../../../../../Context/Context';
import {db,storage} from '../../../../../Firebase'
import {doc, setDoc } from "firebase/firestore";
import {ref, uploadBytes, getDownloadURL} from 'firebase/storage'
import {v4} from 'uuid'
import Select from 'react-select'
import SuccessModal from "../../../../Modals/SuccessModal";


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
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [passwordMatch, setPasswordMatch] = useState(true);
    const [profileImage, setProfileImage] = useState('')
    const [nicImage, setNicImage] = useState('')
    const [passportImage, setPassportImage] = useState('')
    const [status, setStatus] = useState('Active')
    const [availability, setAvailability] = useState('Available')
    const [error, setError] = useState('')
    const[url,setUrl] = useState(null)
    const[nicUrl,setNicUrl] = useState(null)
    const [formStatus, setFormStatus] = useState('')
    const[modalOpened,setModalOpened] = useState(false)
    const[imgError,setImgError] = useState(false)
    const {signUp} = useUserAuth();
    const current = new Date();
    const addDate = `${current.getDate()}/${current.getMonth()+1}/${current.getFullYear()}`;

//language dropdown data
    const language = [
        { value: 'Sinhala  ', label: 'Sinhala' },
        { value: 'English  ', label: 'English' },
        { value: 'Hindi  ', label: 'Hindi' },
        { value: 'Malayalam  ', label: 'Malayalam' },
        { value: 'Urdu  ', label: 'Urdu' },
        { value: 'French  ', label: 'French' },
        { value: 'Arabic  ', label: 'Arabic' },
        { value: 'Spanish  ', label: 'Spanish' },
        { value: 'Russian  ', label: 'Russian' },
        { value: 'Chinese  ', label: 'Chinese' },
        { value: 'Japanese  ', label: 'Japanese' },
        { value: 'Italian  ', label: 'Italian' },
        { value: 'Korean  ', label: 'Korean' },
      ];

    const[languages,setLanguages] = useState()
    const languageHandler = (e)=>{
        setLanguages(Array.isArray(e)?e.map(x=>x.label):[]);
    }

    //guide dropdown data
      const typeData = [
        {value:'National', label: 'National'},
        {value:'Site', label: 'Site'}
      ]
  
      const[type,setType] = useState(typeData.label)
      const typeHandler = (e)=>{
        setType(e.label)
      }

      //district dropdown data

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

    const[district,setDistrict] = useState(districtData.label)
      const districtHandler = (e)=>{
        setDistrict(e.label)
      }

    //car dropdown data

    const carType=[
      { value: 'Car', label: 'Car' },
      { value: 'Van', label: 'Van' },
      { value: 'Mini-Jeep', label: 'Mini Jeep' },
    ]

    const[vehicleType,setVehicleType] = useState(carType.label)
      const vehicleHandler = (e)=>{
        setVehicleType(e.label)
      }

      //start

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
      const guideHandler = async (e) => {
        validatePassword()
        e.preventDefault();
        setError("");
        try {
          if(passwordMatch === false) {
            return
          }
            signUp(email, password)
              .then((data) => {
                const addDetails = doc(db, "Guides", data.user.uid);    
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
                  perKmRate: perKm,
                  image: profileImage,
                  nicImage: nicImage,
                  email: email,
                  password:password,
                  publishedDate:addDate,
                  status:status,
                  availability:availability
                };
                setDoc(addDetails, details);
                setFName('')
                setLName('')
                setContactNumber('')
                setNicNumber('')
                setAddress('')
                setDistrict('')
                setType('')
                setLanguages('')
                setGuideRate('')
                setVehicleType('')
                setModel('')
                setMaxPassengers('')
                setPerKm('')
                setUrl('')
                setNicUrl('')
                setEmail('')
                setPassword('')
                setConfirmPassword("");
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

        <form onSubmit={guideHandler} className = 'addUserForm'>
                
            <h3>Add Guide</h3>
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
                        onChange = {(e)=>setNicNumber(e.target.value)}
                        placeholder='NIC Number'
                        value = {nicNumber}
                        required
                    />
            </div>

            <div>
                <input 
                    type="text" 
                    className='userInput' 
                    onChange = {(e)=> setAddress(e.target.value)}
                    placeholder='Address'
                    value = {address}
                    required
                /> 

                <Select 
                  options = {districtData} 
                  placeholder = 'Select District' 
                  onChange={districtHandler}
                  className = 'typeDrop'
                  required
                />
            </div>

            <div>
              <Select isMulti
                options={language}
                placeholder = 'Select Languages'
                onChange={languageHandler}
                className = 'langDrop'
                required
              />
            </div>

            <div>
                <Select 
                  options = {typeData} 
                  placeholder = 'Guide Type' 
                  onChange={typeHandler}
                  className = 'guideDrop'
                  required
                />

                <input 
                    type="number" 
                    className='userInput' 
                    onChange = {(e)=> setGuideRate(e.target.value)} 
                    placeholder='Guide Rate Per Day'
                    value = {guideRate}
                    required
                />
            </div>

            <div>
                <Select 
                  options = {carType} 
                  placeholder = 'Vehicle Type' 
                  onChange={vehicleHandler}
                  className = 'typeDrop'
                  required
                />

                <input 
                    type="text" 
                    className='userInput' 
                    onChange = {(e)=> setModel(e.target.value)} 
                    placeholder='Vehicle Model'
                    value = {model}
                    required
                />

                <input 
                    type="number" 
                    className='userInput' 
                    onChange = {(e)=> setMaxPassengers(e.target.value)} 
                    placeholder='Maximum Passengers'
                    value = {maxPassengers}
                    required
                />

                <div className = 'perKm'>
                    <input 
                        type="number" 
                        className='userInput' 
                        onChange = {(e)=> setPerKm(e.target.value)} 
                        placeholder='Per Km Rate'
                        value = {perKm}
                        required
                    />
                    <span>*Rate for own vehicle charges</span>
                </div>
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
                    <input 
                        type="file" 
                        name = 'profileImg' 
                        onChange = {(e) => setImage(e, 'TestPassport', setProfileImage)}
                        required
                    />
                </div>
            
                <div className="authProfile">
                    NIC Image
                    <input 
                        type="file" 
                        name = 'coverImg' 
                        onChange = {(e) => setImage(e, 'TestPassport', setNicImage)}
                        required
                    />
                </div>

            </div>
            <button type="submit" className="button infoButton">
                 Add Guide
            </button>
        </form>
        </div>
        <SuccessModal modalOpened={modalOpened} setModalOpened={setModalOpened}/>
     </div>

  )
}

export default AddGuide