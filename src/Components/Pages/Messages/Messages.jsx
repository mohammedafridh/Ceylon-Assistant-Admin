import React, {useState,useEffect} from 'react'
import './Messages.css'
import db from '../../../Firebase'
import {onSnapshot,collection} from 'firebase/firestore'

const Messages = () => {

    const [messages,setMessages] = useState([])
    const [Loading,setLoading] = useState(false)
    const[error,setError] = useState();

    // useEffect(()=>{
    //   setLoading(true)
    //   const allData = onSnapshot(collection(db,'messages'),(snapshot)=>{
    //     let list = []
    //     snapshot.docs.forEach((doc)=>{
    //       list.push({
    //         id:doc.id,
    //         ...doc.data()
    //       })
    //     })
    //     setMessages(list)
    //     setLoading(false)
    //   },(error)=>{
    //     setError(error.message)
    //   });
    //   return ()=>{
    //     allData()
    //   };
    // },[]);

  return (
    <div>
    
      <div className="messages">
      <h1>All Messages</h1>

          <div className="messageCard">
          <h3>Name :</h3>
          <h4>Email : </h4>
          <h5>Subject</h5>
          <p>Message : </p>
          <button className = 'replyBtn'>Noted</button>
      </div>  

  </div>

  </div>

  )
}

export default Messages