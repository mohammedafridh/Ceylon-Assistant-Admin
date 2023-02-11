import React, { useState, useEffect } from "react";
import '../Users/UsersContents/AllUsers.css'
import { db } from "../../../Firebase";
import { collection, onSnapshot, doc, updateDoc, query,deleteDoc } from "firebase/firestore";
import { MDBDataTable, MDBTable, MDBTableBody, MDBTableHead } from "mdbreact";
import { toast } from "react-hot-toast";

const AllReviews = () => {
  const [loading, setLoading] = useState(false);
  const [tableData, setTableData] = useState();
  const [error, setError] = useState("");


  const inactivateItem = async(itemId)=>{
    const item = deleteDoc(doc(db, 'ratings', itemId));
    toast.success("Review Deleted Successfully")
  }

  const activateItem = async(itemId)=>{
    const item = query(doc(db, 'ratings', itemId));
    await updateDoc(item, {
      status:'Active'
    })
    toast.success('Review Activated')
  }

  const publishItem = async(itemId)=>{
    const item = query(doc(db, 'ratings', itemId));
    await updateDoc(item, {
      status:'Published'
    })
    toast.success('Review Published')
  }

  const columnData = [
    {
      label: "Guide Id",
      field: "guideId",
      sort: "asc",
      width: 300,
    },
    {
      label: "Tourist Id",
      field: "touristId",
      sort: "asc",
      width: 300,
    },
    {
      label: "Review",
      field: "review",
      sort: "asc",
      width: 300,
    },
    {
      label: "Ratings",
      field: "ratings",
      sort: "asc",
      width: 100,
    },
    {
      label: "status",
      field: "status",
      sort: "asc",
      width: 100,
    },
    {
      label: "Actions",
      field: "actions",
      sort: "asc",
      width: 380,
    },
  ];

  useEffect(() => {
    setLoading(true);
    const allData = onSnapshot(
      collection(db, "ratings"),
      (snapshot) => {
        let list = [];
        snapshot.docs.forEach((doc) => {
          list.push({
            id: doc.id,
            ...doc.data(),
          });
        });
        // list = list.filter((tourist)=>tourist.status === "Active")
        let rowDataCollection = [];
        list.forEach((item) => {
          const newItem = {
            guideId: item.guide,
            touristId:item.tourist,
            review:item.review,
            ratings: item.rating,
            status:item.status,
            actions: <div className="btnHolder">
              {/* <button onClick = {() => deleteItem(item.id)} className = 'dltBtn' style = {{width:100}}>Delete</button> */}
              <button onClick = {() => inactivateItem(item.id)} className = 'dltBtn' style = {{backgroundColor:'#BC0E18',width:100}}>Delete</button>
              <button onClick = {() => activateItem(item.id)} className = 'actBtn' style = {{backgroundColor:'#1A73C7',width:100}}>Active</button>
              <button onClick = {() => publishItem(item.id)} className = 'updateBtn' style = {{backgroundColor:'#013E77',width:100}}>Publish</button> 
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
      <h1>All Reviews</h1>
      <MDBDataTable scrollX striped bordered data={tableData} maxHeight="200px"/>
    </div>
  );
};

export default AllReviews;