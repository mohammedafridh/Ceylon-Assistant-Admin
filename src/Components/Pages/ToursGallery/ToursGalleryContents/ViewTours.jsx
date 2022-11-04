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
        label: 'Guide Name',
        field: 'guideName',
        sort: 'asc',
        width: 200
      },
      {
        label: 'Destination',
        field: 'destination',
        sort: 'asc',
        width: 200
      },
      {
        label: 'District',
        field: 'district',
        sort: 'asc',
        width: 400
      },
      {
        label: 'Main Image',
        field: 'mainImage',
        sort: 'asc',
        width: 200
      },
      {
        label: 'Image 1',
        field: 'image1',
        sort: 'asc',
        width: 200
      },
      {
        label: 'Image 2',
        field: 'image2',
        sort: 'asc',
        width: 200
      },
      {
        label: 'Image 3',
        field: 'image3',
        sort: 'asc',
        width: 200
      },
      {
        label: 'Image 4',
        field: 'image4',
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
        guideName: 'Nixoefefefewferf sefewsfewfwe wefn',
        destination: 'dgergregergergertger erg retger te4rter ter tert re tre tretg re tgretgsgrg ',
        district: 'sefwefeffweffr w43erwrw4rw4rw 4rf 4rsdfsefr esfewfe dfffefe efsfsf erferfewfewfewfewf',
        mainImage: <img src = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQcOPp23EQaDtQApexyIVNHGNST2LcHkLQ0mQ&usqp=CAU' alt = '' style={{width:180, height:180}} />,
        image1: <img src = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQcOPp23EQaDtQApexyIVNHGNST2LcHkLQ0mQ&usqp=CAU' alt = '' style={{width:180, height:180}} />,
        image2: <img src = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQcOPp23EQaDtQApexyIVNHGNST2LcHkLQ0mQ&usqp=CAU' alt = '' style={{width:180, height:180}} />,
        image3: <img src = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQcOPp23EQaDtQApexyIVNHGNST2LcHkLQ0mQ&usqp=CAU' alt = '' style={{width:180, height:180}} />,
        image4: <img src = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQcOPp23EQaDtQApexyIVNHGNST2LcHkLQ0mQ&usqp=CAU' alt = '' style={{width:180, height:180}} />,
        status: 'active',
        actions: <button 
            style = {{backgroundColor:'red', color:'white', padding:5, borderRadius:6, width:100, border:'none'}}>
            Delete</button>

      }
    ]
  };

  return (
    <div className="allDiscoveries">
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

export default ViewAddThings;