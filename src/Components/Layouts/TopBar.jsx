import React,{useEffect,useState} from 'react'
import './TopBar.css'
import {PersonAdd,Message, Settings} from '@mui/icons-material';
import { Link,useNavigate } from 'react-router-dom';
import { useUserAuth } from '../../Context/Context';
import {db} from '../../Firebase'
import {collection, onSnapshot} from 'firebase/firestore'

const TopBar = () => {

    const navigate = useNavigate()
    const {logOut} = useUserAuth()
    const[messages,setMessages] = useState('')
    const[requests,setRequests] = useState('')

    useEffect(()=>{
        const displayMessages = onSnapshot(collection(db,'messages'),(snapshot)=>{
            let list = []
            snapshot.docs.forEach((doc)=>{
                list.push({
                    id:doc.id,
                    ...doc.data()
                })
            })
            list = list.filter((list)=>list.status === "active")
            setMessages(list)
        })
        return ()=>{
            displayMessages()
        }
    },[])

    useEffect(()=>{
        const displayRequests = onSnapshot(collection(db,'guideRequests'),(snapshot)=>{
            let list = []
            snapshot.docs.forEach((doc)=>{
                list.push({
                    id:doc.id,
                    ...doc.data()
                })
            })
            list = list.filter((list)=>list.status === "Active")
            setRequests(list)
        })
        return ()=>{
            displayRequests()
        }
    },[])

    const logOutHandler = async()=>{
        await logOut()
        navigate('/login')
        localStorage.clear()
    }

  return (
    <div className = 'topBar'>
        <div className="topBarWrapper">
            <div className="topLeft">
                <span className="logo">Ceylon<span>Assistant</span></span>
            </div>

            <div className="topRight">
                <div className="topBarIconContainer">
                    <Link to = '/guideRequests'><PersonAdd /></Link>
                    <span className="topIconBadge">{requests.length}</span>
                </div>

                <div className="topBarIconContainer">
                    <Link to = '/messages'><Message /></Link>
                    <span className="topIconBadge">{messages.length}</span>
                </div>

                <div>
                    {/* <img src="https://thumbs.dreamstime.com/b/attractive-young-woman-taking-selfie-attractive-young-woman-taking-selfie-color-background-125943076.jpg" 
                    alt="" className="topAvatar" /> */}
                    <button className='logOutBtn' onClick={logOutHandler}>Log Out</button>
                </div>
            </div>
        </div>    
    </div>
  )
}

export default TopBar