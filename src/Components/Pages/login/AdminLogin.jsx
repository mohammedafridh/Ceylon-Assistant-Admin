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
            navigate('/')
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
            <img src = 'https://firebasestorage.googleapis.com/v0/b/ceylon-assistant.appspot.com/o/logos%2FWhatsApp%20Image%202022-12-28%20at%2010.52.01%20AM.jpeg?alt=media&token=6809fdab-7ee5-4906-9b12-f69d21f8f732'/>
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