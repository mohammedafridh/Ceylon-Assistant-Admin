import React, { useState, useEffect } from "react";
import '../AllUsers.css'
import { db } from "../../../../../Firebase";
import { collection, onSnapshot, doc, updateDoc, query } from "firebase/firestore";
import { MDBDataTable, MDBTable, MDBTableBody, MDBTableHead } from "mdbreact";
import UpdateGuideModal from "../../../../Modals/UpdateGuideModal";
import BookGuideModal from "../../../../Modals/BookGuideModal";
// import UpdateFaqModal from "../../../Modals/UpdateFaqModal";

const AllAdmins = () => {
  const [loading, setLoading] = useState(false);
  const [tableData, setTableData] = useState();
  const [error, setError] = useState("");
  const [modalOpened, setModalOpened] = useState(false)
  const [currentItem,setCurrentItem] = useState('')

  const deleteItem = async(itemId)=>{
    const item = query(doc(db, 'Admin', itemId));
    await updateDoc(item, {
      status:'Inactive'
    })
  }

  const columnData = [
    {
      label: "Id",
      field: "id",
      sort: "asc",
      width: 300,
    },
    {
      label: "Email Address",
      field: "email",
      sort: "asc",
      width: 300,
    },
    {
      label: "Actions",
      field: "actions",
      sort: "asc",
      width: 200,
    },
  ];

  useEffect(() => {
    setLoading(true);
    const allData = onSnapshot(
      collection(db, "Admin"),
      (snapshot) => {
        let list = [];
        snapshot.docs.forEach((doc) => {
          list.push({
            id: doc.id,
            ...doc.data(),
          });
        });
        list = list.filter((admin)=>admin.status === "Active")
        let rowDataCollection = [];
        list.forEach((item) => {
          const newItem = {
            id: item.id,
            email:item.email,
            actions: <div className="btnHolder">
              <button onClick = {() => deleteItem(item.id)} className = 'dltBtn' style = {{width:100}}>Delete</button>            
            </div>
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
      <h1>All Admins</h1>
      <MDBDataTable scrollX striped bordered data={tableData} maxHeight="200px"/>
    </div>
  );
};

export default AllAdmins;