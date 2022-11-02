import React from 'react'
import './AllUsers.css'
import { MDBDataTable } from 'mdbreact';

const AllGuides = () => {
  const data = {
    columns: [
      {
        label: 'User Id',
        field: 'id',
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
        label: 'NIC',
        field: 'nic',
        sort: 'asc',
        width: 150
      },
      {
        label: 'Address',
        field: 'address',
        sort: 'asc',
        width: 300
      },
      {
        label: 'District',
        field: 'district',
        sort: 'asc',
        width: 150
      },
      {
        label: 'Guide Type',
        field: 'guideType',
        sort: 'asc',
        width: 150
      },
      {
        label: 'Languages',
        field: 'languages',
        sort: 'asc',
        width: 200
      },
      {
        label: 'Guide Rate',
        field: 'guideRate',
        sort: 'asc',
        width: 150
      },
      {
        label: 'Vehicle Type',
        field: 'vehicleType',
        sort: 'asc',
        width: 150
      },
      {
        label: 'vehicle Modal',
        field: 'vehicleModal',
        sort: 'asc',
        width: 150
      },
      {
        label: 'Passengers',
        field: 'maxPassenger',
        sort: 'asc',
        width: 100
      },
      {
        label: 'Per Km Rate',
        field: 'perKm',
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
        firstName: 'Nixon',
        lastName: 'System Architect',
        contactNumber: 'Edinburgh',
        nic: '61',
        address: '2011/04/25',
        district: '$320,800',
        guideType: 'System Architect',
        languages: 'System Architect',
        guideRate: 'System Architect',
        vehicleType: 'System Architect',
        vehicleModal: 'System Architect',
        maxPassenger: '15',
        perKm: '350',
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
        <h3>All Guides</h3>
        <MDBDataTable
            scrollX
            striped
            bordered
            data={data}
        />
    </div>
    
  );
}

export default AllGuides;