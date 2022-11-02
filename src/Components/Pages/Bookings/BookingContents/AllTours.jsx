import React from 'react'
import './AllBookings.css'
import { MDBDataTable } from 'mdbreact';

const AllTours = () => {
  const data = {
    columns: [
      {
        label: 'Tour Id',
        field: 'id',
        sort: 'asc',
        width: 250
      },
      {
        label: 'Guide Email',
        field: 'email',
        sort: 'asc',
        width: 200
      },
      {
        label: 'Contact Number',
        field: 'contact',
        sort: 'asc',
        width: 150
      },
      {
        label: 'Tour Destination',
        field: 'tourDestination',
        sort: 'asc',
        width: 150
      },
      {
        label: 'Pick-up Destination',
        field: 'pickupDestination',
        sort: 'asc',
        width: 200
      },
      {
        label: 'From',
        field: 'from',
        sort: 'asc',
        width: 150
      },
      {
        label: 'To',
        field: 'to',
        sort: 'asc',
        width: 150
      },
      {
        label: 'Tour Time.',
        field: 'time',
        sort: 'asc',
        width: 150
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
        contact: 'System Architect',
        tourDestination: 'Edinburgh',
        pickupDestination: '61',
        from: '2011/04/25',
        to: '$320,800',
        time: 5421,
        status: 'active',
        actions: <button 
        style = {{backgroundColor:'red', color:'white', padding:5, borderRadius:6, width:100, border:'none'}}>
          Delete</button>
      }
    ]
  };

  return (
    <div className="allBookings">
        <h3>All Tours</h3>
        <MDBDataTable
            scrollX
            striped
            bordered
            data={data}
        />
    </div>
    
  );
}

export default AllTours;