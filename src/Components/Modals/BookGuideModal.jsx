import { Modal, useMantineTheme} from '@mantine/core';
import './BookGuideModal.css'
import { useState, useEffect } from 'react';
import {useUserAuth} from '../../Context/Context' 
import {collection, addDoc} from 'firebase/firestore'
import {db} from '../../Firebase'
import { toast } from 'react-hot-toast';
import loadingGif from '../../assets/loading-gif.gif'

function BookGuideModal({modalOpened,setModalOpened,guide}) {
  const theme = useMantineTheme();
  const {user} = useUserAuth();
  const [tourGuide,setTourGuide] = useState(guide.id)
    const[tourist,setTourist] = useState('')
    const[tourLocation,setTourLocation] = useState('')
    const[destination,setDestination] = useState('')
    const[startData,setStartDate] = useState('')
    const[endDate,setEndDate] = useState('')
    const[time,setTime] = useState('')
    const [status,setStatus] = useState('Active')
    const current = new Date();
    const addDate = `${current.getDate()}/${current.getMonth()+1}/${current.getFullYear()}`;
    const[loading,setLoading] = useState(false)

    useEffect(()=>{
      setTourGuide(guide.id)
      console.log(guide.id)
    },[guide])

    const bookingHandler = async(e)=>{
      e.preventDefault();
      try{
        setLoading(true)
        const addDetails = collection(db, 'pending_booking')
        await addDoc(addDetails,{guide:guide.id,tourist:tourist, location:tourLocation, destination: destination, startData: startData, 
        endDate:endDate, time: time, status:status})
        .then(()=>{
          setLoading(false)
          setModalOpened(false)
          toast.success('Booking Successful')
        })

      }catch(err){
        err.message('Error!')
        setLoading(false)
      }
      
    }


  return (
    <Modal
      overlayColor={theme.colorScheme === 'dark' ? theme.colors.dark[9] : theme.colors.gray[2]}
      overlayOpacity={0.40}
      overlayBlur={0.6}
      size = '27%'
      opened = {modalOpened}
      onClose = {()=>{setModalOpened(false); setTourLocation(''); setDestination('')
      ; setStartDate(''); setEndDate(''); setTime('')}}
    >

        <form className = 'infoForm' onSubmit = {bookingHandler}>
            <h3>Book Guide</h3>

            <div>
                <input 
                    type="text" 
                    className='infInput' 
                    onChange = {(e)=>setTourist(e.target.value)} 
                    placeholder='Tourist ID'
                    required
                />
            </div>

            <div>
                <input 
                    type="text" 
                    className='infInput' 
                    onChange = {(e)=>setTourLocation(e.target.value)} 
                    placeholder='Tour Location'
                    required
                />
            </div>

            <div>
                <input 
                    type="text" 
                    className='infInput' 
                    onChange = {(e)=>setDestination(e.target.value)} 
                    placeholder='Pickup Destination'
                    required
                />
            </div>

            <div>
                <label>Date From : </label>
                <input
                    type = 'date'
                    className='infInput' 
                    onChange = {(e)=>setStartDate(e.target.value)}
                    placeholder="Date From"
                    required
                />
            </div>

            <div>
                <label>Date To : </label>
                <input 
                    type="date" 
                    className='infInput' 
                    onChange = {(e)=>setEndDate(e.target.value)}
                    placeholder='Date To'
                    required
                />
            </div>

            <div style = {{width:"17.5rem"}}>
                <label>Time : </label>
                <input 
                
                    type="time" 
                    className='infInput' 
                    onChange = {(e)=>setTime(e.target.value)}
                    placeholder='Select Time'
                    required
                />
            </div>
            {loading?
            <button type = 'submit' className="button infoButton">
              <img className='loadingIcon' src={loadingGif} />
            </button>:

            <button type = 'submit' className="button infoButton">Confirm</button>}
        </form>
    </Modal>
  );
}

export default BookGuideModal