import React, { useEffect, useState } from 'react'
import './WidgetLg.css'
import Table from 'react-bootstrap/Table';
import {collection, onSnapshot} from 'firebase/firestore'
import { db } from '../../../../Firebase';
import { useGuides } from "../../../../Context/GuidesContext";


const WidgetLg = () => {

  const [tours,setTours] = useState([])
  const[error,setError] = useState('')
  const {guides} = useGuides()

  // useEffect(() => {
  //   const findGuideName = (id) => {
  //     const guide = guides.find(guide => guide.id === id)
  //     return guide ? guide.firstName : null   
  //   }
  // })

  useEffect(()=>{
    const allData = onSnapshot(collection(db,'tours'),(snapshot)=>{
      let list = []
      snapshot.docs.forEach((doc)=>{
        list.push({
          id:doc.id,
          ...doc.data()
        })
      })
      setTours(list.filter(item=>item.status=='Active'))
    },(error)=>{
      setError(error.message)
    });
    return ()=>{
      allData()
    };
  },[]);


  return (
    <div className="widgetLg">
      <h3>Active Tours</h3>
      <Table striped bordered hover size="sm">
      <thead>
        <tr>
          <th>Id</th>
          <th>Tour Guide Name</th>
          <th>Destination</th>
          <th>Date Range</th>
          <th>Status</th>
        </tr>
      </thead>
        <tbody>
        {tours.map((tour)=>(
        <tr key ={tour.id}>
          <td>{tour.id}</td>
          <td>{tour.email}</td>
          <td>{tour.tourDestination}</td>
          <td>{tour.from} - {tour.to}</td>
          <td>{tour.status}</td>
        </tr>
        ))}
      </tbody>

      
    </Table>
    </div>
    
  );
}

export default WidgetLg