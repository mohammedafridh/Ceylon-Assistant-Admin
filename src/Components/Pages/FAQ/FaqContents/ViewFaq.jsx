import React, {useState, useEffect} from 'react'
import '../../DiscoverGallery/DiscoverGalleryContents/ViewDiscover.css'
import {db} from '../../../../Firebase'
import {collection, onSnapshot} from 'firebase/firestore'
import { MDBDataTable, MDBTable, MDBTableBody, MDBTableHead } from 'mdbreact';

const ViewAddThings = () => {

  const [loading,setLoading] = useState(false)
  const [rowData,setRowData] = useState([])
  const [error,setError] = useState('')
  
  const columns = [
      {
        label: 'Faq Id',
        field: 'id',
        sort: 'asc',
        width: 250
      },
      {
        label: 'Question',
        field: 'question',
        sort: 'asc',
        width: 200
      },
      {
        label: 'Answer',
        field: 'answer',
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
      const allData = onSnapshot(collection(db,'faq'),(snapshot)=>{
        let list = []
        snapshot.docs.forEach((doc)=>{
          list.push({
            id:doc.id,
            ...doc.data()
          })
        })
        let rowDataCollection = []
        list.forEach((item) =>{
          const newItem = { id: item.id, question: item.question, answer: item.answer, actions: <button>Delete</button>}
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
        <MDBDataTable
            scrollX
            striped
            bordered
            rows={rowData}
            columns={columns}
        />
      </div>
    
  );
}

export default ViewAddThings;