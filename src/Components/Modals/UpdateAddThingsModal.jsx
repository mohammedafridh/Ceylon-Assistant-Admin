import {useState} from 'react'
import { Modal, useMantineTheme} from '@mantine/core';
import '../Pages/AddThingsToDo/AddThingsToDoContents/AddThings.css'


function UpdateAddThingsModal({modalOpened,setModalOpened,data}) {
  const theme = useMantineTheme();
  const [activityName,setActivityName] = useState(data.Activity)
  const [description,setDescription] = useState(data.description)

  return (
    <Modal
      overlayColor={theme.colorScheme === 'dark' ? theme.colors.dark[9] : theme.colors.gray[2]}
      overlayOpacity={0.25}
      overlayBlur={0.5}
      size = '60%'
      opened = {modalOpened}
      onClose = {()=>setModalOpened(false)}
    >

<div className = 'addThingsForm'>
                  
                  <h3>Add Things To Do</h3>
                  
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
                    <button className='addThingsBtn' onClick = ''> Add Things To Do</button>
                </div>   
              </div>
    </Modal>
  );
}

export default UpdateAddThingsModal