import React, { useState, useEffect } from "react";
import '../AllUsers.css'
import { db } from "../../../../../Firebase";
import { collection, onSnapshot, doc, updateDoc, query } from "firebase/firestore";
import { MDBDataTable, MDBTable, MDBTableBody, MDBTableHead } from "mdbreact";
import UpdateGuideModal from "../../../../Modals/UpdateGuideModal";
import BookGuideModal from "../../../../Modals/BookGuideModal";
// import UpdateFaqModal from "../../../Modals/UpdateFaqModal";

const AllGuides = () => {
  const [loading, setLoading] = useState(false);
  const [tableData, setTableData] = useState();
  const [error, setError] = useState("");
  const [modalOpened, setModalOpened] = useState(false)
  const[bookModalOpened,setBookModalOpened] = useState(false)
  const [currentItem,setCurrentItem] = useState('')
  const[selectedGuide,setSelectedGuide] = useState({})

  const updateGuide =(item)=>{
    setModalOpened(true)
    setCurrentItem(item)
  }

  const inactivateItem = async(itemId)=>{
    const item = query(doc(db, 'Guides', itemId));
    await updateDoc(item, {
      status:'inactive'
    })
  }

  const activateItem = async(itemId)=>{
    const item = query(doc(db, 'Guides', itemId));
    await updateDoc(item, {
      status:'Active'
    })
  }

  const makeBooking = (item)=>{
    setSelectedGuide(item)
    setBookModalOpened(true)
  }

  const columnData = [
    {
      label: "Id",
      field: "id",
      sort: "asc",
      width: 300,
    },
    {
      label: "Email",
      field: "email",
      sort: "asc",
      width: 250,
    },
    {
      label: "Profile",
      field: "profile",
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
      label: "NIC Number",
      field: "nicNumber",
      sort: "asc",
      width: 200,
    },
    {
      label: "NIC Image",
      field: "nicImage",
      sort: "asc",
      width: 230,
    },

    {
      label: "District",
      field: "district",
      sort: "asc",
      width: 130,
    },
    {
      label: "Guide Type",
      field: "guideType",
      sort: "asc",
      width: 150,
    },
    {
      label: "Guide Rate",
      field: "guideRate",
      sort: "asc",
      width: 200,
    },
    {
      label: "Languages",
      field: "languages",
      sort: "asc",
      width: 350,
    },
    {
      label: "Vehicle",
      field: "vehicle",
      sort: "asc",
      width: 150,
    },
    {
      label: "Vehicle Model",
      field: "vehicleModel",
      sort: "asc",
      width: 200,
    },
    {
      label: "Per Km Rate",
      field: "perKmRate",
      sort: "asc",
      width: 200,
    },
    {
      label: "Max passengers",
      field: "maxPassengers",
      sort: "asc",
      width: 200,
    },
    {
      label: "Availability",
      field: "availability",
      sort: "asc",
      width: 120,
    },
    {
      label: "Status",
      field: "status",
      sort: "asc",
      width: 120,
    },
    {
      label: "Actions",
      field: "actions",
      sort: "asc",
      width: 440,
    },
  ];

  useEffect(() => {
    setLoading(true);
    const allData = onSnapshot(
      collection(db, "Guides"),
      (snapshot) => {
        let list = [];
        snapshot.docs.forEach((doc) => {
          list.push({
            id: doc.id,
            ...doc.data(),
          });
        });
        // list = list.filter((guide)=>guide.status === "Active")
        let rowDataCollection = [];
        list.forEach((item) => {
          const newItem = {
            id: item.id,
            email:item.email,
            profile:<img src = {item.image} style={{width:180, height:180, marginLeft:0}}/>,
            firstName: item.firstName,
            lastName: item.lastName,
            contactNumber: item.contactNumber,
            nicNumber: item.nicNumber,
            nicImage: <img src = {item.nicImage} style={{width:180, height:180, marginLeft:0}} />, 
            district: item.district,
            guideType: item.guideType,
            guideRate: item.guideRate,
            languages: item.languages,
            vehicle: item.vehicleType,  
            vehicleModel:item.model,         
            perKmRate: item.perKmRate,
            maxPassengers: item.maxPassengers,
            availability:item.availability,
            status:item.status,
            actions: <div className="btnHolder">
              <button onClick = {() => inactivateItem(item.id)} className = 'dltBtn' style = {{backgroundColor:'#BC0E18',width:100}}>Inactive</button>
              <button onClick = {() => activateItem(item.id)} className = 'actBtn' style = {{backgroundColor:'#1A73C7',width:100}}>Active</button>
              <button onClick = {() => updateGuide(item)} className = 'updateBtn' style = {{backgroundColor:'#013E77',width:100}}>Update</button> 
              <button onClick = {() => makeBooking(item)} className = 'updateBtn' style = {{backgroundColor:'#2E185E', width:100}}>Book</button> 
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
      <h1>All Guides</h1>
      <MDBDataTable scrollX striped bordered data={tableData} maxHeight="200px"/>
      <UpdateGuideModal
        modalOpened={modalOpened}
        setModalOpened={setModalOpened}
        data={currentItem}
      />
      <BookGuideModal
        modalOpened={bookModalOpened}
        setModalOpened={setBookModalOpened}
        guide={selectedGuide}
      />
    </div>
  );
};

export default AllGuides;