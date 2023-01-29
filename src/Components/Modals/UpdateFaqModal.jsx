import {useEffect, useState} from 'react'
import { Modal, useMantineTheme} from '@mantine/core';
import '../Pages/AddThingsToDo/AddThingsToDoContents/AddThings.css'
import { db } from "../../Firebase";
import {query, doc, updateDoc} from "firebase/firestore";
import { toast } from "react-hot-toast";

function UpdateFaqModal({modalOpened,setModalOpened,data}) {
  const theme = useMantineTheme();
  const [question,setQuestion] = useState(data.question)
  const [answer,setAnswer] = useState(data.answer)

  useEffect(()=>{
    setQuestion(data.question)
    setAnswer(data.answer)
  },[data])

  const updateDetails = async(data)=>{
    const item = query(doc(db, 'faq', data.id));
    await updateDoc(item, {
      question: question,
      answer:answer
    }).then(()=>{
        setModalOpened(false)
        toast.success('FAQ Updated Successfully!')
    })
  }

  return (
    <Modal
      overlayColor={theme.colorScheme === 'dark' ? theme.colors.dark[9] : theme.colors.gray[2]}
      overlayOpacity={0.25}
      overlayBlur={0.5}
      size = '60%'
      opened = {modalOpened}
      onClose = {()=>{setModalOpened(false); setQuestion(''); setAnswer('')}}
    >

<div className = 'addThingsForm'>
                  
    <h3>Update FAQ</h3>
    
    <div>
      <input 
          type="text" 
          className='infoInput' 
          onChange = {(e)=> setQuestion(e.target.value)}
          placeholder='Question'
          value = {question}
      />
    </div>

    <textarea value = {answer} placeholder = 'Answer' className = 'addThingsDescription'
      onChange= {(e)=> setAnswer(e.target.value)}></textarea>

  <div className='addThingsBtnContainer'>
      <button className='addThingsBtn' onClick = {()=>updateDetails(data)}> Update</button>
  </div>   
</div>
    </Modal>
  );
}

export default UpdateFaqModal