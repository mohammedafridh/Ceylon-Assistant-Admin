import { Modal, useMantineTheme} from '@mantine/core';
import './BookGuideModal.css'
import { useState, useEffect } from 'react';
import {useUserAuth} from '../../Context/Context' 
import {deleteDoc, doc} from 'firebase/firestore'
import {db} from '../../Firebase'
import { toast } from 'react-hot-toast';
import emailjs from '@emailjs/browser';

function MessageReplyModal({modalOpened,setModalOpened,message}) {
  const theme = useMantineTheme();
  const {user} = useUserAuth();
  const [email,setEmail] = useState(message.email)
  const [name,setName] = useState(message.name)
    const[userMessage,setUserMessage] = useState(message.message)
    const[subject,setSubject] = useState(message.subject)
    const[reply,setReply] = useState('')

    useEffect(()=>{
      setEmail(message.email)
      setName(message.name)
      setUserMessage(message.message)
      setSubject(message.subject)
    },[message])

    // const bookingHandler = async(e)=>{
    //   e.preventDefault();
    //   try{
    //     const addDetails = collection(db, 'pending_booking')
    //     await addDoc(addDetails,{guide:'',tourist:tourist, location:tourLocation, destination: destination, startData: startData, 
    //     endDate:endDate, time: time, status:status})
    //     .then(()=>{
    //       setModalOpened(false)
    //       toast.success('Booking Successful')
    //     })

    //   }catch(err){
    //     err.message('Error!')
    //   }
      
    // }

    const messageHandler= (e)=>{
        e.preventDefault()

        const templateParams = {
            subject: message.subject,
            to_name: message.name,
            to_email:message.email,
            message: reply,
          };

          console.log(templateParams)
    
          emailjs.send('service_b42ex4l', 'template_d7m6944', templateParams, 'ta7ULFlbVnrfwWRuQ')
            .then((response) => {
              console.log('SUCCESS!', response.status, response.text);
            }, (err) => {
              console.log('FAILED...', err);
            });

        const item = deleteDoc(doc(db, 'messages', message.docId));
          toast.success('Response sent successfully!')
          setModalOpened(false)
    }


  return (
    <Modal
      overlayColor={theme.colorScheme === 'dark' ? theme.colors.dark[9] : theme.colors.gray[2]}
      overlayOpacity={0.10}
      overlayBlur={0.5}
      size = '35%'
      opened = {modalOpened}
      onClose = {()=>{setModalOpened(false)}}
    >

        <form className = 'infoForm' onSubmit = {messageHandler}>
            <h3>{subject}</h3>

            <div>
                <input 
                    type="text" 
                    className='infInput' 
                    value = {email}
                    disabled
                />
            </div>

            <div>
                <input 
                    type="text" 
                    className='infInput' 
                    value = {userMessage}
                    disabled
                />
            </div>

            <span>
                {/* <div className='replyContainer'> */}
                    {/* <label>Reply</label> */}
                    <textarea onChange={(e) => setReply(e.target.value)} className='textArea' placeholder='Response'></textarea>
                {/* </div> */}
            </span>
            <button type = 'submit' className='messageBtn'>Send Message</button>
        </form>
    </Modal>
  );
}

export default MessageReplyModal