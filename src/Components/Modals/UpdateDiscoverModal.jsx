import {useEffect, useState} from 'react'
import { Modal, useMantineTheme} from '@mantine/core';
import '../Pages/AddThingsToDo/AddThingsToDoContents/AddThings.css'
import {db, storage} from '../../Firebase'
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { v4 } from "uuid";
import {collection, addDoc} from 'firebase/firestore'
import {query, doc, updateDoc} from "firebase/firestore";


function UpdateDiscoverModal({modalOpened,setModalOpened,data}) {
  const theme = useMantineTheme();
  const [imageUrl,setImageUrl] = useState(true)
  const [gallery,setGallery] = useState(false)
  const [destination,setDestination] = useState(data.destination)
  const [destinationNickname, setDestinationNickname] = useState(data.nickname)
  const [description,setDescription] = useState(data.description)
  const [photoUrl,setPhotoUrl] = useState(data.image)
  const [photo,setPhoto] = useState(null)
  const [url,setUrl] = useState(null)
  const [status,setStatus] = useState('active')
  const [error,setError] = useState('')

  useEffect(()=>{
    setDestination(data.destination)
    setDestinationNickname(data.nickname)
    setDescription(data.description)
    setPhotoUrl(data.image)
    setPhoto(data.image)

  },[data])

  useEffect(() => {
    const getImageUrl = async () => {
        const imageRef = ref(storage, `Discovery Images /${photo.name + v4()}`);
        uploadBytes(imageRef, photo)
          .then(() => {
            getDownloadURL(imageRef)
              .then((url) => {
                // console.log({ url });
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
    imageUrl();
  }, [photo]);

//   const galleryImageHandler = async (e)=>{
//       e.preventDefault();
//       setImageUrl(false)
//       setGallery(true)
//   }

//   const galleryImage = async ()=>{
//     const item = query(doc(db, 'Discover_Srilanka', data.id));
//     await updateDoc(item, {
//       destination:destination,
//       nickname:destinationNickname,
//       description:description,
//       image:url
//     }).then(()=>{
//         setModalOpened(false)
//     })
//   }

  const imageUrlHandler = async(e)=>{
      e.preventDefault();
      setImageUrl(true)
      setGallery(false)
  }

  const urlImage = async ()=>{
    const item = query(doc(db, 'Discover_Srilanka', data.id));
    await updateDoc(item, {
      destination:destination,
      nickname:destinationNickname,
      description:description,
      image:photoUrl
    }).then(()=>{
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
      onClose = {()=>{setModalOpened(false); setDestination(''); setDestinationNickname('')
      ; setPhoto(''); setPhotoUrl(''); setDescription('')}}
    >

<div>

<div className="optionContainer">
    {/* <button onClick = {galleryImageHandler} className = {gallery?'actives' : 'deactive'}>Gallery Image</button> */}
    <button onClick = {imageUrlHandler} className = {imageUrl?'actives' : 'deactive'}>Image URL</button> 
</div>

<div className="addDiscoverContainer">
  <div className = 'discoverForm'>
            
      <h3>Add Discover Sri-Lanka</h3>
      
      <div>
        <input 
            type="text" 
            className='infoInput' 
            onChange = {(e)=> setDestination(e.target.value)}
            placeholder='Destination Name'
            value = {destination}
        />
      </div>

      <div>
        <input 
            type="text" 
            className='infoInput' 
            onChange = {(e)=> setDestinationNickname(e.target.value)}
            placeholder='Destination Nickname'
            value = {destinationNickname}
        />
      </div>

      <div>
        {gallery && 
        <label>Add Image</label> }
          <input 
              type={imageUrl?'text' : 'file'} 
              className='infoInput' 
              onChange = {(e)=> imageUrl? setPhotoUrl(e.target.value): setPhoto(e.target.files[0])}
              placeholder= {imageUrl && 'Enter Image Url'}
              value = {imageUrl? photoUrl: photo}
          />
      </div>

      <textarea value = {description} placeholder = 'Description' className = 'discoverDescription'
        onChange= {(e)=> setDescription(e.target.value)}></textarea>

    <div className='discoverBtnContainer'>
        <button className='discoverBtn' onClick = {()=>urlImage()}>Add Discovery</button>
    </div>   
  </div>
</div>
</div>

    </Modal>
  );
}

export default UpdateDiscoverModal