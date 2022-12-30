import {useState} from 'react'
import { Modal, useMantineTheme} from '@mantine/core';
import '../Pages/AddThingsToDo/AddThingsToDoContents/AddThings.css'
import { db } from "../../Firebase";
import {query, doc, updateDoc} from "firebase/firestore";
import { useEffect } from 'react';


function UpdateAddThingsModal({modalOpened,setModalOpened,data}) {
  const theme = useMantineTheme();
  const [activityName,setActivityName] = useState(data.Activity)
  const [description,setDescription] = useState(data.description)
  console.log({data})
  useEffect(()=>{
    setActivityName(data.Activity)
    setDescription(data.description)
  },[data])
  const updateDetails = async(data)=>{
    const item = query(doc(db, 'ThingsToDoSrilanka', data.id));
    await updateDoc(item, {
      Activity: activityName,
      description:description
    }).then(()=>{
        setActivityName('')
        setDescription('')
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
      onClose = {()=>{setModalOpened(false); setActivityName(''); setDescription('')}}
    >

<div className = 'addThingsForm'>
                  
                  <h3>Update {data.Activity}</h3>
                  
                  <div>
                    <input 
                        type="text" 
                        className='infoInput' 
                        onChange = {(e)=> setActivityName(e.target.value)}
                        placeholder='Activity Name'
                        value = {activityName}
                    />
                  </div>
      
                  <textarea value = {description} placeholder = 'Description' className = 'addThingsDescription'
                    onChange= {(e)=> setDescription(e.target.value)}></textarea>
      
                <div className='addThingsBtnContainer'>
                    <button className='addThingsBtn' onClick = {()=>updateDetails(data)}> Update</button>
                </div>   
              </div>
    </Modal>
  );
}

export default UpdateAddThingsModal