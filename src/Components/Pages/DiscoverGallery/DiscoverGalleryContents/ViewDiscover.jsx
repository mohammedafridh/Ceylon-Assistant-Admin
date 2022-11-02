import React from 'react'
import './ViewDiscover.css'
import { MDBDataTable } from 'mdbreact';

const AllAdmins = () => {
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
        label: 'Image Url',
        field: 'imageUrl',
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
        imageUrl: 'dgergregergergertger erg retger te4rter ter tert re tre tretg re tgretgsgrg ',
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
        <h3>Discover Sri-Lanka</h3>
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