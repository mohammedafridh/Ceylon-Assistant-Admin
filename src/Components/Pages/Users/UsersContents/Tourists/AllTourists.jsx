import React, { useState, useEffect } from "react";
import '../AllUsers.css'
import { db } from "../../../../../Firebase";
import { collection, onSnapshot, doc, updateDoc, query } from "firebase/firestore";
import { MDBDataTable, MDBTable, MDBTableBody, MDBTableHead } from "mdbreact";
import UpdateTouristModal from "../../../../Modals/UpdateTouristModal";
// import UpdateFaqModal from "../../../Modals/UpdateFaqModal";

const AllTourists = () => {
  const [loading, setLoading] = useState(false);
  const [tableData, setTableData] = useState();
  const [error, setError] = useState("");
  const [modalOpened, setModalOpened] = useState(false)
  const[bookModalOpened,setBookModalOpened] = useState(false)
  const [currentItem,setCurrentItem] = useState('')

  const setModal =(item)=>{
    setModalOpened(true)
    setCurrentItem(item)
  }

  const deleteItem = async(itemId)=>{
    const item = query(doc(db, 'Tourist', itemId));
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
      label: "Profile",
      field: "profile",
      sort: "asc",
      width: 220,
    },
    {
      label: "Email Address",
      field: "email",
      sort: "asc",
      width: 220,
    },
    {
      label: "First Name",
      field: "firstName",
      sort: "asc",
      width: 200,
    },
    {
      label: "Last Name",
      field: "lastName",
      sort: "asc",
      width: 200,
    },
    {
      label: "Contact Number",
      field: "contactNumber",
      sort: "asc",
      width: 200,
    },
    {
      label: "Passport Number",
      field: "passportNumber",
      sort: "asc",
      width: 200,
    },
    {
      label: "Passport Image",
      field: "passportImage",
      sort: "asc",
      width: 230,
    },
    {
      label: "Actions",
      field: "actions",
      sort: "asc",
      width: 250,
    },
  ];

  useEffect(() => {
    setLoading(true);
    const allData = onSnapshot(
      collection(db, "Tourist"),
      (snapshot) => {
        let list = [];
        snapshot.docs.forEach((doc) => {
          list.push({
            id: doc.id,
            ...doc.data(),
          });
        });
        list = list.filter((tourist)=>tourist.status === "Active")
        let rowDataCollection = [];
        list.forEach((item) => {
          const newItem = {
            id: item.id,
            profile:<img src = {item.image} style={{width:180, height:180, marginLeft:0}}/>,
            email:item.email,
            firstName: item.firstName,
            lastName: item.lastName,
            contactNumber: item.contactNumber,
            passportNumber: item.passportNumber,
            passportImage: <img src = {item.passPortImage} style={{width:180, height:180, marginLeft:0}} />, 
            actions: <div className="btnHolder">
              <button onClick = {() => deleteItem(item.id)} className = 'dltBtn' style = {{width:100}}>Delete</button>
              <button onClick = {() => setModal(item)} className = 'updateBtn' style = {{width:100}}>Update</button>
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
      <h1>All Tourists</h1>
      <MDBDataTable scrollX striped bordered data={tableData} maxHeight="200px"/>
      <UpdateTouristModal
        modalOpened={modalOpened}
        setModalOpened={setModalOpened}
        data={currentItem}
      />
    </div>
  );
};

export default AllTourists;