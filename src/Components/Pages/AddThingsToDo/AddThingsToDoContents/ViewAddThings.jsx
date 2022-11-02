import React from 'react'
import '../../DiscoverGallery/DiscoverGalleryContents/ViewDiscover.css'
import { MDBDataTable } from 'mdbreact';

const ViewAddThings = () => {
  const data = {
    columns: [
      {
        label: 'Add Things Id',
        field: 'id',
        sort: 'asc',
        width: 250
      },
      {
        label: 'Activity Name',
        field: 'activityName',
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
        activityName: 'Nixoefefefewferf sefewsfewfwe wefn',
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
        <h3>Add Things Gallery</h3>
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