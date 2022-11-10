import React from 'react'
import './UsersTop.css'
import { useNavigate} from 'react-router-dom'

const UsersTop = () => {

    const navigate = useNavigate()

    const adminHandler = ()=>{
        navigate('/adminPage')
    }

    const guideHandler = ()=>{
      navigate('/guidePage')
    }

    const touristHandler = ()=>{
      navigate('/touristPage')
        
    }

  return (
    <div className="usersTop">
        <div className="userActions">
            <button onClick = {adminHandler}>Admin</button>
            <button onClick = {guideHandler}>Tour Guides</button>
            <button onClick = {touristHandler}>Tourists</button>
        </div>
    </div>
  )
}

export default UsersTop