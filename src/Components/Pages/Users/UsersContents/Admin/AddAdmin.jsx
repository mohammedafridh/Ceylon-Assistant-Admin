import React, {useState, useEffect} from 'react'
import './Admin.css'
import { useUserAuth } from '../../../../../Context/Context';
import {db} from '../../../../../Firebase'
import {doc, setDoc } from "firebase/firestore";

const AddAdmin = () => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [password2, setPassword2] = useState('')
    const [status, setStatus] = useState('Active')
    const [error, setError] = useState('')
    const {signUp} = useUserAuth();
    const current = new Date();
    const addDate = `${current.getDate()}/${current.getMonth()+1}/${current.getFullYear()}`;

    const adminHandler = async (e) => {
        e.preventDefault()
        setError("")
            try {
              signUp(email, password)
                .then((data) => {
                  const addDetails = doc(db, "Admin", data.user.uid);
                  const details = {
                    email: email,
                    publishDate:addDate,
                    status:status
                  };
                  setDoc(addDetails, details);
                  setEmail('')
                setPassword('')
                setPassword2('')
                })
                .catch((error) => {
                  console.log(error);
                });
            } catch (err) {
              setError(err.message);
              console.log(err);
            }
          };


  return (
    <div className='UsersContainer'>
        <div className="addUser">

        <div className = 'addUserForm'>
                
            <h3>Add Admin</h3>

            <div>
                <input 
                    type="text" 
                    className='userInput' 
                    onChange = {(e)=> setEmail(e.target.value)}
                    placeholder='Email Address'
                    value = {email}
                />    
            </div>

            <div>
                <input 
                    type="password" 
                    className='userInput' 
                    placeholder='Password'
                    value={password}
                    onChange={(e)=>setPassword(e.target.value)}
                    aria-required="true"
                />
      

                {/* <input 
                    type= 'password' 
                    className='userInput' 
                    placeholder='Confirm Password'
                    onChange={handlePassword}
                    value = {password2}
                    aria-required="true"
                /> */}
            </div>

            <button className="button infoButton" onClick={adminHandler}>Add Admin</button>

        </div>
      </div>  
    </div>
  )
}

export default AddAdmin