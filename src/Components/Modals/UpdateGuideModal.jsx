import {useEffect, useState} from 'react'
import { Modal, useMantineTheme} from '@mantine/core';
// import '../Pages/AddThingsToDo/AddThingsToDoContents/AddThings.css'
import '../../Components/Pages/Users/UsersContents/Admin/Admin.css'
import { db,storage } from "../../Firebase";
import {query, doc, updateDoc} from "firebase/firestore";
import {ref, uploadBytes, getDownloadURL} from 'firebase/storage'
import {v4} from 'uuid'
import Select from 'react-select'
import { useUserAuth } from '../../Context/Context';


function UpdateGuideModal({modalOpened,setModalOpened,data}) {
  const theme = useMantineTheme();
  const [fName, setFName] = useState(data.firstName)
    const [lName, setLName] = useState(data.lastName)
    const [contactNumber, setContactNumber] = useState(data.contactNumber)
    const [address, setAddress] = useState(data.address)
    const [guideRate, setGuideRate] = useState(data.guideRate)
    const [model, setModel] = useState(data.model)
    const [maxPassengers, setMaxPassengers] = useState(data.maxPassengers)
    const [perKm, setPerKm] = useState(data.perKmRate)
    const[profile,setProfile] = useState('')
    const [imgError,setImgError] = useState(false)
    const[url,setUrl] = useState(null)
    const [formStatus, setFormStatus] = useState('')


  useEffect(()=>{
    setFName(data.firstName)
    setLName(data.lastName)
    setContactNumber(data.contactNumber)
    setAddress(data.address)
    setGuideRate(data.guideRate)
    setMaxPassengers(data.maxPassengers)
    setPerKm(data.perKmRate)
    setModel(data.model)
  },[data])

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

  const language = [
    { value: 'Sinhala ', label: 'Sinhala' },
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

const typeData = [
  {value:'National', label: 'National'},
  {value:'Site', label: 'Site'}
]

const[type,setType] = useState(typeData.label)
const typeHandler = (e)=>{
  setType(e.label)
}

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


  const updateDetails = async(data)=>{
    console.log('hello')
    const item = query(doc(db, 'Guides', data.id));
    await updateDoc(item, {
      firstName:fName,
      lastName:lName,
      contactNumber: contactNumber,
      address: address,
      district: district,
      guideType : type,
      languages: languages,
      guideRate:guideRate,
      vehicleType:vehicleType,
      model: model,
      maxPassengers:maxPassengers,
      perKmRate: perKm,
      image:profile

    }).then(()=>{
      alert('Details Updated Successfully')
        setModalOpened(false)
    })
  }

  return (
    <Modal
      overlayColor={theme.colorScheme === 'dark' ? theme.colors.dark[9] : theme.colors.gray[2]}
      overlayOpacity={0.25}
      overlayBlur={0.5}
      size = '60%'
      opened = {modalOpened}
      onClose = {()=>{setModalOpened(false);
        //  setQuestion(''); 
        //  setAnswer('')
        }}
    >

<div className = 'addThingsForm'>
                
            <h3>Add Guide</h3>

            { imgError ? <p style = {{color:"red", fontWeight:"bold"}}>* Please select a valid image!</p>: ''}
            
            <div>
                    <input 
                        type="text" 
                        className='userInputModal' 
                        onChange = {(e)=> setFName(e.target.value)}
                        placeholder='First Name'
                        value = {fName}
                        required
                    />
                    <input 
                        type="text" 
                        className='userInputModal' 
                        onChange = {(e)=> setLName(e.target.value)}
                        placeholder='Last Name'
                        value = {lName}
                        required
                    />
            </div>

            <div>
                    <input 
                        type="number" 
                        className='userInputModal' 
                        onChange = {(e)=> setContactNumber(e.target.value)}
                        placeholder='Contact Number'
                        value = {contactNumber}
                        required
                    />
            </div>

            <div>
                <input 
                    type="text" 
                    className='userInputModal' 
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
                  value = {district}
                />
            </div>

            <div>
              <Select isMulti
                options={language}
                placeholder = 'Select Languages'
                onChange={languageHandler}
                className = 'langDrop'
              />
            </div>

            <div>
                <Select 
                  options = {typeData} 
                  placeholder = 'Guide Type' 
                  onChange={typeHandler}
                  className = 'guideDrop'
                />

                <input 
                    type="number" 
                    className='userInputModal' 
                    onChange = {(e)=> setGuideRate(e.target.value)} 
                    placeholder='Guide Rate Per Day'
                    value = {guideRate}
                    required
                />

                <div className = 'perKm'>
                    <input 
                        type="number" 
                        className='userInputModal' 
                        onChange = {(e)=> setPerKm(e.target.value)} 
                        placeholder='Per Km Rate'
                        value = {perKm}
                        required
                    />
                    <span>*Per Km Rate for own vehicle</span>
                </div>
            </div>

            <div>
                <Select 
                  options = {carType} 
                  placeholder = 'Vehicle Type' 
                  onChange={vehicleHandler}
                  className = 'typeDrop'
                />

                <input 
                    type="text" 
                    className='userInputModal' 
                    onChange = {(e)=> setModel(e.target.value)} 
                    placeholder='Vehicle Model'
                    value = {model}
                />
              <input 
                    type="number" 
                    className='userInputModal' 
                    onChange = {(e)=> setMaxPassengers(e.target.value)} 
                    placeholder='Maximum Passengers'
                    value = {maxPassengers}
                    required
                />

                <div>               
              </div>
            </div>
            <div className="authProfile">
                  <span>Profile Image</span>
                    <input 
                        type="file" 
                        name = 'coverImg' 
                        onChange = {(e) => setImage(e, 'Guide_Profile', setProfile)}
                        required
                    />
                </div>
           
            <button onClick = {()=>updateDetails(data)} className="button infoButton">
                 Update Details
            </button>
        </div>
    </Modal>
  );
}

export default UpdateGuideModal