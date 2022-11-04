import React, { useEffect,useState } from 'react'
import './ViewDiscover.css'
import { MDBDataTable } from 'mdbreact';
import {db} from '../../../../Firebase'
import {collection, onSnapshot} from 'firebase/firestore'

const AllAdmins = () => {

  const [loading,setLoading] = useState(false)
  const [discovery,setDiscovery] = useState([])
  const [error,setError] = useState('')

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
      console.log(list)
      setDiscovery(list)
      setLoading(false)
    },(error)=>{
      setError(error.message)
    });
    return ()=>{
      allData()
    };
  },[]);

  const data = {
    columns: [
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
    ],
    rows: [
      {
        id: 'Tiger',
        destination: 'Nixoefefefewferf sefewsfewfwe wefn',
        image: <img src = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQcOPp23EQaDtQApexyIVNHGNST2LcHkLQ0mQ&usqp=CAU' alt = '' style={{width:180, height:180}} />,
        description: 'sefwefeffweffr w43erwrw4rw4rw 4rf 4rsdfsefr esfewfe dfffefe efsfsf erferfewfewfewfewf',
        status: 'active',
        actions: <button 
            style = {{backgroundColor:'red', color:'white', padding:5, borderRadius:6, width:100, border:'none'}}>
            Delete</button>

      }
    ]
  };

  return (
    <div className="allDiscoveries">
          {discovery.map((discover)=>(
            <h3>{discover.date}</h3>
          ))}

        
            <MDBDataTable
              scrollX
              striped
              bordered
              data={data}
            />   
    </div>
    
  );
}

export default AllAdmins;