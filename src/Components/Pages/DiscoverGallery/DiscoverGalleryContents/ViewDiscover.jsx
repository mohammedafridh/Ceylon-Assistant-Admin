import React, { useState, useEffect } from "react";
import "../../DiscoverGallery/DiscoverGalleryContents/ViewDiscover.css";
import { db } from "../../../../Firebase";
import { collection, onSnapshot,query, doc, deleteDoc, } from "firebase/firestore";
import { MDBDataTable, MDBTable, MDBTableBody, MDBTableHead } from "mdbreact";
import UpdateAddThingsModal from "../../../Modals/UpdateAddThingsModal";
import UpdateDiscoverModal from "../../../Modals/UpdateDiscoverModal";

const ViewDiscover = ({sendData}) => {
  const [loading, setLoading] = useState(false);
  const [tableData, setTableData] = useState();
  const [error, setError] = useState("");
  const [modalOpened, setModalOpened] = useState(false)
  const [currentItem,setCurrentItem] = useState('')

  const setModal =(item)=>{
    setModalOpened(true)
    setCurrentItem(item)
  }

  const deleteItem = async(itemId)=>{
    const item = deleteDoc(doc(db, 'Discover_Srilanka', itemId));
    alert("Record Deleted Successfully")
  }

  const columnData = [
    {
      label: "Discovery Id",
      field: "id",
      sort: "asc",
      width: 250,
    },
    {
      label: "Image",
      field: "image",
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
      label: "Nickname",
      field: "nickname",
      sort: "asc",
      width: 200,
    },
    {
      label: "Description",
      field: "description",
      sort: "asc",
      width: 200,
    },
    {
      label: "Actions",
      field: "actions",
      sort: "asc",
      width: 130,
    },
  ];

  useEffect(() => {
    setLoading(true);
    const allData = onSnapshot(
      collection(db, "Discover_Srilanka"),
      (snapshot) => {
        let list = [];
        snapshot.docs.forEach((doc) => {
          list.push({
            id: doc.id,
            ...doc.data(),
          });
        });
        let rowDataCollection = [];
        list.forEach((item) => {
          const newItem = {
            id: item.id,
            image:<img src = {item.image} alt="" style = {{width:170, height: 170}}/>,
            destination: item.destination,
            nickname: item.nickname,
            description: item.description,           
            actions: <div className="btnHolder">
              <button onClick = {() => deleteItem(item.id)} className = 'dltBtn'>Delete</button>
              <button onClick = {() => setModal(item)} className = 'updateBtn'>Update</button>             
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
      <MDBDataTable scrollX  striped bordered data={tableData} maxHeight="250px" />
      <UpdateDiscoverModal
        modalOpened={modalOpened}
        setModalOpened={setModalOpened}
        data={currentItem}
      />
    </div>
  );
};

export default ViewDiscover;