import React from 'react'
import './AllUsers.css'
import { MDBDataTable } from 'mdbreact';

const AllTourists = () => {
  const data = {
    columns: [
      {
        label: 'User Id',
        field: 'id',
        sort: 'asc',
        width: 250
      },
      {
        label: 'Profile Image',
        field: 'profile',
        sort: 'asc',
        width: 250
      },
      {
        label: 'Passport Image',
        field: 'passportImage',
        sort: 'asc',
        width: 250
      },
      {
        label: 'First Name',
        field: 'firstName',
        sort: 'asc',
        width: 200
      },
      {
        label: 'Last Name',
        field: 'lastName',
        sort: 'asc',
        width: 200
      },
      {
        label: 'Contact Number',
        field: 'contactNumber',
        sort: 'asc',
        width: 150
      },
      {
        label: 'Passport Number',
        field: 'passportNumber',
        sort: 'asc',
        width: 150
      },
      {
        label: 'Email',
        field: 'email',
        sort: 'asc',
        width: 300
      },
      {
        label: 'Date',
        field: 'date',
        sort: 'asc',
        width: 150
      },
      {
        label: "Status",
        field: 'status',
        sort: 'asc',
        width: 150
      },
      {
        label: "Actions",
        field: 'actions',
        sort: 'asc',
        width: 150
      }
    ],
    rows: [
      {
        id: 'Tiger',
        profile: <img src = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQcOPp23EQaDtQApexyIVNHGNST2LcHkLQ0mQ&usqp=CAU' alt = '' style={{width:180, height:180, marginLeft:20}} />,
        passportImage: <img src = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQcOPp23EQaDtQApexyIVNHGNST2LcHkLQ0mQ&usqp=CAU' alt = '' style={{width:160, height:180, marginLeft:30}} />,
        firstName: 'Nixon',
        lastName: 'System Architect',
        contactNumber: 'Edinburgh',
        passportNumber: '61',
        email: 'System Architect',
        date: 'System Architect',
        status: 'active',
        actions: <button 
        style = {{backgroundColor:'red', color:'white', padding:5, borderRadius:6, width:100, border:'none'}}>
          Delete</button>
      }
    ]
  };

  return (
    <div className="allUsers">
        <h3>All Tourists</h3>
        <MDBDataTable
            scrollX
            striped
            bordered
            data={data}
        />
    </div>
    
  );
}

export default AllTourists;