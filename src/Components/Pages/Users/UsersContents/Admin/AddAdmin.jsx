import React, { useState, useEffect } from "react";
import "./Admin.css";
import { useUserAuth } from "../../../../../Context/Context";
import { db } from "../../../../../Firebase";
import { doc, setDoc } from "firebase/firestore";
import SuccessModal from "../../../../Modals/SuccessModal";
import { toast } from "react-hot-toast";
import loadingGif from '../../../../../assets/loading-gif.gif'

const AddAdmin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordMatch, setPasswordMatch] = useState(true);
  const [status, setStatus] = useState("Active");
  const [error, setError] = useState("");
  const[loading,setLoading] = useState(false)
  const [formStatus, setFormStatus] = useState('')
  const { signUp } = useUserAuth();
  const current = new Date();
  const addDate = `${current.getDate()}/${
    current.getMonth() + 1
  }/${current.getFullYear()}`;

  const adminHandler = async (e) => {
    validatePassword()
    e.preventDefault();
    setError("");
    try {
      if(passwordMatch === false) {
        return
      }
      //if the password's doesn't match this function won't run beyond line 27
      setLoading(true)
      signUp(email, password)
        .then((data) => {
          const addDetails = doc(db, "Admin", data.user.uid);
          const details = {
            email: email,
            publishDate: addDate,
            status: status,
          };
          setDoc(addDetails, details);
          setLoading(false)
          setEmail("");
          setPassword("");
          setConfirmPassword("");
          toast.success("Admin added successfully!")
          setLoading(false)
        })
        .catch((error) => {
          setLoading(false)
          error.code === 'auth/email-already-in-use' && toast.error('*Email Already Taken. Please Try Another!')
        })
        .catch((error) => {
          console.log(error);
         toast.error("Something Went Wrong. Please Try Again!")
         setLoading(false)
        });
    } catch (err) {
      setError(err.message);
      toast.error("Something Went Wrong. Please Try Again!")
      setLoading(false)
      console.log(err);
    }
  };

  const validatePassword = () => {
    console.log(passwordMatch, password, confirmPassword)
    password === confirmPassword
      ? setPasswordMatch(true)
      : setPasswordMatch(false);
  };

  return (
    <div className="UsersContainer">
      <div className="addUser">
        <form onSubmit={adminHandler} className="addUserForm">
          <h3>Add Admin</h3>
          { passwordMatch ? '' : <p style = {{color:"red", fontWeight:"bold"}}>* The passwords doesn't Match. Try Again!</p>}


          <div>
            <input
              type="email"
              className="userInput"
              onChange={(e) => setEmail(e.target.value)}
              value = {email}
              placeholder="Email Address"
              required
            />
          </div>

          <div>
            <input
              type="password"
              className="userInput"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <input
              type="password"
              className="userInput"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}  
              required
            />

          </div>

        {loading?
          <button type = 'submit' className="button infoButton">
            <img className='loadingIcon' src={loadingGif} />
          </button>:

          <button type="submit" className="button infoButton">
            Add Admin
          </button>}
        </form>
      </div>
      <SuccessModal modalOpened={formStatus === 'Success' ?  true : false} setModalOpened={() => {setFormStatus('')}}/>
      {/* <ErrorModal modalOpened={formStatus === 'Error' ?  true : false} setModalOpened={() => {setFormStatus('')}} /> */}
    </div>
  );
};

export default AddAdmin