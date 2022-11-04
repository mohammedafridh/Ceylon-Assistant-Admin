import React from 'react'
import '../../DiscoverGallery/DiscoverGalleryContents/ViewDiscover.css'
import { MDBDataTable } from 'mdbreact';

const ViewAddThings = () => {
  const data = {
    columns: [
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
        question: 'Nixoefefefewferf sefewsfewfwe wefn',
        answer: <img src = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQcOPp23EQaDtQApexyIVNHGNST2LcHkLQ0mQ&usqp=CAU' alt = '' style={{width:180, height:180}} />,
        status: 'active',
        actions: <button 
            style = {{backgroundColor:'red', color:'white', padding:5, borderRadius:6, width:100, border:'none'}}>
            Delete</button>

      }
    ]
  };

  return (
    <div className="allDiscoveries">
        <h3>All FAQ's</h3>
        <MDBDataTable
            scrollX
            striped
            bordered
            data={data}
        />
    </div>
    
  );
}

export default ViewAddThings;