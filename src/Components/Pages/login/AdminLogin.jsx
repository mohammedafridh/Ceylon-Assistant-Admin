import React, {useState,useRef} from 'react'
import { useGuides } from '../../../Context/GuidesContext'
import './AdminLogin.css'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-hot-toast'
import { useUserAuth } from '../../../Context/Context'
import loadingGif from '../../../assets/loading-gif.gif'

const AdminLogin = () => {

  const {admins} = useGuides()
  const [email,setEmail] = useState('');
  const[password,setPassword] = useState('')
  const [error,setError] = useState('')
  const navigate = useNavigate()
  const {logIn, logOut, forgotPassword} = useUserAuth()
  const emailRef = useRef()
  const[loading,setLoading] = useState(false)

  const isAdminActive = admins.find(admin => admin.email === email && admin.status ==='Active')

  const loginHandler = async (e)=>{
    e.preventDefault();
    setError('')
        try{
          setLoading(true)
            const isLoggedIn = await logIn(email,password)
            if(isLoggedIn && !isAdminActive){
              setLoading(false)
                toast.error('Your account is not active')
                logOut()
                return
            }
            localStorage.setItem('user',JSON.stringify(isLoggedIn.user))
            navigate('/home')
            setLoading(false)
            toast.success('Logged in Successful. Thank You!')
            
        }catch(error){
            console.log(error.message)
            error.code === 'auth/invalid-email' && toast.error('Invalid email')
            error.code === 'auth/user-not-found' && toast.error('Admin not found')
            // error.code === 'auth/wrong-password' && toast.error('Incorrect Username or Password')
            error.code === 'auth/wrong-password' && setError('Incorrect Username or Password')
            setError('Failed to login')
            setLoading(false)
        }
}

const forgotPasswordHandler = async()=>{
  const emailVal = emailRef.current.value;
  console.log(emailVal)
  await forgotPassword(emailVal);
  toast.success('done')
}

  return (
    <div className="adminLogin">
        <div className="loginSection">
            <img src = 'https://firebasestorage.googleapis.com/v0/b/ceylon-assistant.appspot.com/o/logo%2Fca%20logo.jpeg?alt=media&token=e220fec0-fbf6-4ad5-b817-16064b84248c&_gl=1*tn00oz*_ga*NDAyMzI1MTA4LjE2NjY5NTk3NTE.*_ga_CW55HF8NVT*MTY4NjIyMTE5Mi4zLjEuMTY4NjIyMTE5OC4wLjAuMA..'/>
        </div>
            <form className='adminLoginForm' onSubmit = {loginHandler}>
                <h1>Ceylon Assistant Admin</h1>

                <p style={{ color: error && 'red', fontWeight: 'bold' }}>{error}</p>

                <div className='loginCredentials'>

                <input 
                  type="email" 
                  className='userInput' 
                  onChange = {(e)=> setEmail(e.target.value)}
                  placeholder='Email Address'
                  ref = {emailRef}
                  required
                />  

              <input 
                type="password" 
                className='userInput' 
                onChange = {(e)=> setPassword(e.target.value)}
                placeholder='Password'
                required
              />

              </div>
              {loading?
              <button type = 'submit' className='logBtn'>
                <img className='loadingIcon' src={loadingGif} />
              </button>:

              <button type = 'submit' className='logBtn'>Log In</button>}

                <span>Forgot Password? <a onClick={forgotPasswordHandler} className='resetPassword'><u>Reset Password</u></a></span>
              
            </form>     
    </div>

  )
}

export default AdminLogin