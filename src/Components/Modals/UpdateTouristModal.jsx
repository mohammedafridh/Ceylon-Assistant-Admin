import {useEffect, useState} from 'react'
import { Modal, useMantineTheme} from '@mantine/core';
// import '../Pages/AddThingsToDo/AddThingsToDoContents/AddThings.css'
import '../../Components/Pages/Users/UsersContents/Admin/Admin.css'
import { db,storage } from "../../Firebase";
import {query, doc, updateDoc} from "firebase/firestore";
import {ref, uploadBytes, getDownloadURL} from 'firebase/storage'
import {v4} from 'uuid'
import loadingGif from '../../assets/loading-gif.gif'
import { toast } from 'react-hot-toast';

function UpdateGuideModal({modalOpened,setModalOpened,data}) {
  const theme = useMantineTheme();
  const [fName, setFName] = useState(data.firstName)
  const [lName, setLName] = useState(data.lastName)
  const[profile,setProfile] = useState('')
  const [imgError,setImgError] = useState(false)
  const [contactNumber, setContactNumber] = useState(data.contactNumber)
  const [passportNumber, setPassportNumber] = useState(data.passportNumber)
  const[loading,setLoading] = useState(false)

  useEffect(()=>{
    setFName(data.firstName)
    setLName(data.lastName)
    setContactNumber(data.contactNumber)
    setPassportNumber(data.passportNumber)
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

  const updateDetails = async(data)=>{
    setLoading(true)
    const item = query(doc(db, 'Tourist', data.id));
    await updateDoc(item, {
      firstName:fName,
      lastName:lName,
      contactNumber: contactNumber,
      passportNumber:passportNumber,
      image: profile ? profile : data.image,
    }).then(()=>{
      setLoading(false)
      toast.success('Details Updated Successfully')
        setModalOpened(false)
    })
  }

  return (
    <Modal
      overlayColor={theme.colorScheme === 'dark' ? theme.colors.dark[9] : theme.colors.gray[2]}
      overlayOpacity={0.25}
      overlayBlur={0.5}
      size = '50%'
      opened = {modalOpened}
      onClose = {()=>{setModalOpened(false);
        //  setQuestion(''); 
        //  setAnswer('')
        }}
    >

<div className = 'addThingsForm'>
                
<div className = 'addUserForm'>
                
            <h3>Update Tourist</h3>

            { imgError ? <p style = {{color:"red", fontWeight:"bold"}}>* Please select a valid image!</p>: ''}

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

            <span className='profilePicture'>
                <div className="proUpdate">
                <span>Profile Image</span>
                <img src={profile ? profile : data.image} width={200} height={200} alt="profile" />
                <input
                  type="file"
                  name="coverImg"
                  placeholder="Update Image"
                  onChange={(e) => setImage(e, "Tourist_Profile", setProfile)}
                  required
                />
                </div>
            </span>

            {loading?
            <button type = 'submit' className="button infoButton">
              <img className='loadingIcon' src={loadingGif} />
            </button>:
           
            <button onClick = {()=>updateDetails(data)} className="button infoButton">
                 Update Tourist
            </button>}
        </div>
        </div>
    </Modal>
  );
}

export default UpdateGuideModal