import React, { useState, useEffect } from "react";
import "../../DiscoverGallery/DiscoverGalleryContents/ViewDiscover.css";
import { db } from "../../../../Firebase";
import { collection, onSnapshot, doc, deleteDoc, } from "firebase/firestore";
import { MDBDataTable, MDBTable, MDBTableBody, MDBTableHead } from "mdbreact";
import UpdateFaqModal from "../../../Modals/UpdateFaqModal";
import { toast } from "react-hot-toast";

const ViewFaq = () => {
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
    const item = deleteDoc(doc(db, 'faq', itemId));
    toast.success('FAQ Deleted Successfully!')
  }

  const columnData = [
    {
      label: "Faq Id",
      field: "id",
      sort: "asc",
      width: 270,
    },
    {
      label: "Question",
      field: "question",
      sort: "asc",
      width: 250,
    },
    {
      label: "Answer",
      field: "answer",
      sort: "asc",
      width: 250,
    },
    {
      label: "Actions",
      field: "actions",
      sort: "asc",
      width: 240,
    },
  ];

  useEffect(() => {
    setLoading(true);
    const allData = onSnapshot(
      collection(db, "faq"),
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
            question: item.question,
            answer: item.answer,
            actions: <div className="btnHolder" style={{marginLeft:10}}>
              <button onClick = {() => deleteItem(item.id)} className = 'dltBtn'>Delete</button>
              <button onClick = {() => setModal(item)} className = 'updateBtn'>Update</button> 
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
      <MDBDataTable scrollX striped bordered data={tableData} maxHeight="200px"/>
      <UpdateFaqModal
        modalOpened={modalOpened}
        setModalOpened={setModalOpened}
        data={currentItem}
      />
    </div>
  );
};

export default ViewFaq;