import React, { useState, useEffect } from "react";
import "../../DiscoverGallery/DiscoverGalleryContents/ViewDiscover.css";
import { db } from "../../../../Firebase";
import { collection, onSnapshot,query, doc, deleteDoc, } from "firebase/firestore";
import { MDBDataTable, MDBTable, MDBTableBody, MDBTableHead } from "mdbreact";
import UpdateAddThingsModal from "../../../Modals/UpdateAddThingsModal";
import UpdateDiscoverModal from "../../../Modals/UpdateDiscoverModal";
import { useGuides } from "../../../../Context/GuidesContext";

const ViewTours = () => {
  const [loading, setLoading] = useState(false);
  const [tableData, setTableData] = useState();
  const [error, setError] = useState("");
  const [modalOpened, setModalOpened] = useState(false)
  const [currentItem,setCurrentItem] = useState('')
  const guides = useGuides()

  const setModal =(item)=>{
    setModalOpened(true)
    setCurrentItem(item)
  }

  const deleteItem = async(itemId)=>{
    const item = deleteDoc(doc(db, 'toursGallery', itemId));
    alert("Record Deleted Successfully")
  }

  const columnData = [
    {
      label: "Gallery Id",
      field: "id",
      sort: "asc",
      width: 250,
    },
    {
      label: "Guide Name",
      field: "guideName",
      sort: "asc",
      width: 200,
    },
    {
      label: "Destination",
      field: "destination",
      sort: "asc",
      width: 200,
    },
    {
      label: "District",
      field: "district",
      sort: "asc",
      width: 200,
    },
    {
      label: "Main Image",
      field: "mainImage",
      sort: "asc",
      width: 220,
    },
    {
      label: "Image 1",
      field: "image1",
      sort: "asc",
      width: 220,
    },
    {
      label: "Image 2",
      field: "image2",
      sort: "asc",
      width: 220,
    },
    {
      label: "Image 3",
      field: "image3",
      sort: "asc",
      width: 220,
    },
    {
      label: "Image 4",
      field: "image4",
      sort: "asc",
      width: 220,
    },
    {
      label: "Actions",
      field: "actions",
      sort: "asc",
      width: 130,
    },
  ];

  useEffect(() => {
    const findGuideName = (id) => {
      const guide = guides.find(guide => guide.id === id)
      return guide ? guide.firstName: null
      
    }

    setLoading(true);
    const allData = onSnapshot(
      collection(db, "toursGallery"),
      (snapshot) => {
        let list = [];
        snapshot.docs.forEach((doc) => {
          list.push({
            id: doc.id,
            ...doc.data(),
          });
        });
        list = list.filter((tour)=>tour.status==="Active")
        let rowDataCollection = [];
        list.forEach((item) => {
          const newItem = {
            id: item.id,
            guideName: item.guideId,
            destination: item.destination,
            district: item.district,
            mainImage: <img src = {item.mainImage} style = {{width:180, height: 180}}/>,
            image1:<img src = {item.image1} style = {{width:180, height: 180}}/>, 
            image2:<img src = {item.image2} style = {{width:180, height: 180}}/>,  
            image3:<img src = {item.image3} style = {{width:180, height: 180}}/>,  
            image4:<img src = {item.image4} style = {{width:180, height: 180}}/>,        
            actions: <div className="btnHolder">
              <button onClick = {() => deleteItem(item.id)} className = 'dltBtn'>Delete</button>           
            </div>
            // actions: <div><button onClick = {() => sendData(item)}>Update</button></div>,
          };
          
          rowDataCollection.push(newItem);
        });
        setTableData({
          columns: columnData,
          rows: rowDataCollection,
        });
        setLoading(false);
      },
      (error) => {
        setError(error.message);
      }
    );
    return () => {
      allData();
    };
  }, []);

  return (
    <div className="allDiscoveries">
      <h1>Tours Gallery</h1>
      <MDBDataTable scrollX  striped bordered data={tableData} maxHeight="250px" />
      <UpdateDiscoverModal
        modalOpened={modalOpened}
        setModalOpened={setModalOpened}
        data={currentItem}
      />
    </div>
  );
};

export default ViewTours;