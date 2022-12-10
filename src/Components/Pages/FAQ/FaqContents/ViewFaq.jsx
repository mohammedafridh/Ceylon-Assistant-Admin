import React, { useState, useEffect } from "react";
import "../../DiscoverGallery/DiscoverGalleryContents/ViewDiscover.css";
import { db } from "../../../../Firebase";
import { collection, onSnapshot } from "firebase/firestore";
import { MDBDataTable, MDBTable, MDBTableBody, MDBTableHead } from "mdbreact";

const ViewFaq = () => {
  const [loading, setLoading] = useState(false);
  const [tableData, setTableData] = useState();
  const [error, setError] = useState("");

  const columnData = [
    {
      label: "Faq Id",
      field: "id",
      sort: "asc",
      width: 250,
    },
    {
      label: "Question",
      field: "question",
      sort: "asc",
      width: 200,
    },
    {
      label: "Answer",
      field: "answer",
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
            actions: <div><button>Delete</button><button>Update</button></div>
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
      <MDBDataTable scrollX striped bordered data={tableData} />
    </div>
  );
};

export default ViewFaq;