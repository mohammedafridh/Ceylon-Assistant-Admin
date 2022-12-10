import React, { useState, useEffect } from "react";
import "../../DiscoverGallery/DiscoverGalleryContents/ViewDiscover.css";
import { db } from "../../../../Firebase";
import { collection, onSnapshot } from "firebase/firestore";
import { MDBDataTable, MDBTable, MDBTableBody, MDBTableHead } from "mdbreact";

const ViewAddThings = () => {
  const [loading, setLoading] = useState(false);
  const [tableData, setTableData] = useState();
  const [error, setError] = useState("");

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
            image:<img src = {item.image} style = {{width:170, height: 170}}/>,
            actions: <button>Delete</button>,
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
      <MDBDataTable scrollX scrollY striped bordered data={tableData} />
    </div>
  );
};

export default ViewAddThings;