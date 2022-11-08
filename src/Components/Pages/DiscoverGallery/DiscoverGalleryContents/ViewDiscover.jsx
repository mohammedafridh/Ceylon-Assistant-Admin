import React, { useEffect,useState } from 'react'
import './ViewDiscover.css'
import { MDBTable, MDBTableBody, MDBTableHead } from 'mdbreact';
import {db} from '../../../../Firebase'
import {collection, onSnapshot} from 'firebase/firestore'

const AllAdmins = () => {

  const [loading,setLoading] = useState(false)
  const [rowData,setRowData] = useState([])
  const [error,setError] = useState('')

  const columns = [
    
      {
        label: 'Discovery Id',
        field: 'id',
        sort: 'asc',
        width: 250
      },
      {
        label: 'Destination',
        field: 'destination',
        sort: 'asc',
        width: 200
      },
      {
        label: 'Image',
        field: 'image',
        sort: 'asc',
        width: 200
      },
      {
        label: 'Description',
        field: 'description',
        sort: 'asc',
        width: 400
      },
      {
        label: "Status",
        field: 'status',
        sort: 'asc',
        width: 200
      },
      {
        label: "Actions",
        field: 'actions',
        sort: 'asc',
        width: 130
      }
    ]
  
    useEffect(()=>{
      setLoading(true)
      const allData = onSnapshot(collection(db,'Discover_Srilanka'),(snapshot)=>{
        let list = []
        snapshot.docs.forEach((doc)=>{
          list.push({
            id:doc.id,
            ...doc.data()
          })
        })
        let rowDataCollection = []
        list.forEach((item) =>{
          const newItem = { id: item.id, destination: item.destination, image: item.image, description: item.description, status: item.status}
          rowDataCollection.push(newItem)
        })
        setRowData(rowDataCollection)
        console.log({rowDataCollection})
        setLoading(false)
      },(error)=>{
        setError(error.message)
      });
      return ()=>{
        allData()
      };
    },[]);

    return (
      <div className="allDiscoveries">
        <MDBTable scrollX>
          
          <MDBTableHead>
            <tr>
              {columns.map((item, index) => (
                <th>{item.label}</th>
              ))}
            </tr>
          </MDBTableHead>
          <MDBTableBody>
            {
                rowData.map((item, index) => (
                  <tr key={index}>
                      <td>{item.id}</td>
                      <td>{item.destination}</td>
                      <td><img width="500" height = '200' alt='' src={item.image}/></td>
                      <td>{item.description}</td>
                      <td>{item.status}</td>
                      <td><button className='dltBtn'>Delete</button></td>
                  </tr>
                ))  
            }
          </MDBTableBody>
        </MDBTable>
      </div>
      
    );
}

export default AllAdmins;