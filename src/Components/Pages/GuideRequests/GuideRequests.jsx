import React, { useState, useEffect } from "react";
import "../DiscoverGallery/DiscoverGalleryContents/ViewDiscover.css";
import { db } from "../../../Firebase";
import { collection, onSnapshot, doc, deleteDoc, setDoc, query, updateDoc } from "firebase/firestore";
import { MDBDataTable, MDBTable, MDBTableBody, MDBTableHead } from "mdbreact";
import { useUserAuth } from "../../../Context/Context";

const GuideRequests = () => {
  const [loading, setLoading] = useState(false);
  const [tableData, setTableData] = useState();
  const [error, setError] = useState("");
  const [modalOpened, setModalOpened] = useState(false)
  const [currentItem,setCurrentItem] = useState('')
  const current = new Date();
  const addDate = `${current.getDate()}/${current.getMonth()+1}/${current.getFullYear()}`;
  const signUp = useUserAuth()

  const setModal = async (item) => {
    try {
        signUp(item.email, item.password)
          .then((data) => {
            const addDetails = doc(db, "Guides", data.user.uid);
            
            const details = {
                email:item.email,
                firstName:item.firstName,
                lastName:item.lastName,
                contactNumber: item.contactNumber,
                nicNumber: item.nicNumber,
                address: item.address,
                district: item.district,
                guideType : item.guideType,
                languages: item.languages,
                guideRate: item.guideRate,
                vehicleType:item.vehicleType,
                model: item.model,
                maxPassengers:item.maxPassengers,
                perKmRate: item.perKmRate,
                image: item.image,
                nicImage: item.nicImage,
                email: item.email,
                registeredDate:addDate,
                status: 'Active'
            };
            setDoc(addDetails, details)
            .then(async()=>{
                const cancelItem = query(doc(db,'toursGallery',item.id));
                await updateDoc(cancelItem, {
                status: 'inactive'
       });
            })
          })
          .catch((error) => {
            console.log(error);
          });
      } catch (err) {
        setError(err.message);
        console.log(err);
      }

}

  const deleteItem = async(itemId)=>{
    const item = deleteDoc(doc(db, 'faq', itemId));
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
        width: 300,
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
        label: "Actions",
        field: "actions",
        sort: "asc",
        width: 250,
      },
    ];

  useEffect(() => {
    setLoading(true);
    const allData = onSnapshot(
      collection(db, "guideRequests"),
      (snapshot) => {
        let list = [];
        snapshot.docs.forEach((doc) => {
          list.push({
            id: doc.id,
            ...doc.data(),
          });
        });
        list = list.filter((guide)=>guide.status === "Active")
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
            perKmRate: item.perKmRate,
            maxPassengers: item.maxPassengers,
            actions: <div className="btnHolder">
              <button onClick = {() => deleteItem(item.id)} className = 'dltBtn' style = {{width:100}}>Reject</button>
              <button onClick = {() => setModal(item)} className = 'updateBtn' style = {{width:100}}>Accept</button> 
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
        <h1>Guide Requests</h1>
      <MDBDataTable scrollX striped bordered data={tableData} maxHeight="200px"/>
      {/* <UpdateFaqModal
        modalOpened={modalOpened}
        setModalOpened={setModalOpened}
        data={currentItem}
      /> */}
    </div>
  );
};

export default GuideRequests;