import React, { useState, useEffect } from "react";
import "../../DiscoverGallery/DiscoverGalleryContents/ViewDiscover.css";
import { db } from "../../../../Firebase";
import { collection, onSnapshot } from "firebase/firestore";
import { MDBDataTable, MDBTable, MDBTableBody, MDBTableHead } from "mdbreact";
import UpdateAddThingsModal from "../../../Modals/UpdateAddThingsModal";

const ViewAddThings = ({sendData}) => {
  const [loading, setLoading] = useState(false);
  const [tableData, setTableData] = useState();
  const [error, setError] = useState("");
  const [modalOpened, setModalOpened] = useState(false)
  const [currentItem,setCurrentItem] = useState('')

  const setModal =(item)=>{
    setModalOpened(true)
    setCurrentItem(item)
  }

  const columnData = [
    {
      label: "Add Things Id",
      field: "id",
      sort: "asc",
      width: 250,
    },
    {
      label: "Activity",
      field: "activity",
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
      label: "Description",
      field: "descriptionTwo",
      sort: "asc",
      width: 200,
    },
    {
      label: "Image",
      field: "image",
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

  const updateClick = (id) => {
    console.log(id);
  }
  useEffect(() => {
    setLoading(true);
    const allData = onSnapshot(
      collection(db, "ThingsToDoSrilanka"),
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
            activity: item.Activity,
            description: item.description,
            descriptionTwo: item.description,
            image:<img src = {item.image} alt="" style = {{width:170, height: 170}}/>,
            actions: <div><button onClick = {() => setModal(item)}>Update</button></div>,
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
      <UpdateAddThingsModal
        modalOpened={modalOpened}
        setModalOpened={setModalOpened}
        data={currentItem}
      />
    </div>
  );
};

export default ViewAddThings;