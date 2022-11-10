import React from 'react'
import '../AllUsers.css'
import { MDBDataTable } from 'mdbreact';

const AllAdmins = () => {
  const data = {
    columns: [
      {
        label: 'Tour Id',
        field: 'id',
        sort: 'asc',
        width: 250
      },
      {
        label: 'Email',
        field: 'email',
        sort: 'asc',
        width: 200
      },
      {
        label: 'Password',
        field: 'password',
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
        email: 'Nixon',
        password: 'dgergregergergertger erg retger te4rter ter tert re tre tretg re tgretg ',
        status: 'active',
        actions: <button 
            style = {{backgroundColor:'red', color:'white', padding:5, borderRadius:6, width:100, border:'none'}}>
            Delete</button>

      }
    ]
  };

  return (
    <div className="allUsers">
        <h3>All Admins</h3>
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