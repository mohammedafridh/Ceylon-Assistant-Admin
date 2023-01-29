import React, { useContext } from "react";
import { useState } from "react";
import "./AllBookings.css";
import { MDBDataTable } from "mdbreact";
import { db } from "../../../../Firebase";
import { useEffect } from "react";
import { collection, onSnapshot,query,doc,updateDoc } from "firebase/firestore";
import { useGuides } from "../../../../Context/GuidesContext";
import { toast } from "react-hot-toast";

const AllBookings = () => {
  const [tableData, setTableData] = useState();
  const {guides} = useGuides()
  const {tourists} = useGuides()
  const columnData = [
    {
      label: "Tour Id",
      field: "id",
      sort: "asc",
      width: 250,
    },
    {
      label: "Guide Email",
      field: "email",
      sort: "asc",
      width: 200,
    },
    {
      label: "Tourist Email",
      field: "touristEmail",
      sort: "asc",
      width: 200,
    },
    {
      label: "Contact Number",
      field: "contact",
      sort: "asc",
      width: 150,
    },
    {
      label: "Tour Destination",
      field: "tourDestination",
      sort: "asc",
      width: 150,
    },
    {
      label: "Pick-up Destination",
      field: "pickupDestination",
      sort: "asc",
      width: 200,
    },
    {
      label: "From",
      field: "from",
      sort: "asc",
      width: 150,
    },
    {
      label: "To",
      field: "to",
      sort: "asc",
      width: 150,
    },
    {
      label: "Tour Time.",
      field: "time",
      sort: "asc",
      width: 150,
    },
    {
      label: "Status",
      field: "status",
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
    const findGuideEmail = (id) => {
      const guide = guides.find(guide => guide.id === id)
      return guide ? guide.email : null   
    }

    const findGuideNumber = (id) => {
      const guide = guides.find(guide => guide.id === id)
      return guide ? guide.contactNumber : null   
    }

    const findTouristEmail = (id) => {
      const tourist = tourists.find(tourist => tourist.id === id)
      return tourist ? tourist.email : null   
    }
    
    const bookingData = onSnapshot(
      collection(db, "pending_booking"),
      (snapshot) => {
        let list = [];
        snapshot.docs.forEach((doc) => {
          list.push({
            id: doc.id,
            ...doc.data(),
          });
        });
        list = list.filter((booking)=>booking.status==="Active")
        let rowDataCollection = [];
        list.forEach((item) => {
          const newItem = {
            id: item.id,
            email: findGuideEmail(item.guide),
            touristEmail:findTouristEmail(item.tourist),
            contact: findGuideNumber(item.guide),
            tourDestination: item.destination,
            pickupDestination: item.location,
            from: item.startData,
            to: item.endDate,
            time: item.time,
            status: item.status,
            actions: (
              <div>
                <button 
                // style = {{color:'white', backgroundColor:'red', padding:6, border:'none'}}
                className='dltBtn'
                onClick = {()=>cancelBooking(item.id)}>Cancel</button>
              </div>
            ),
          };
          rowDataCollection.push(newItem);
        });
        setTableData({
          columns: columnData,
          rows: rowDataCollection,
        });
      }
    );

    return () => {
      bookingData();
    };
  }, [guides]);

  const cancelBooking = async(itemId)=>{
    const bookingCancel = query(doc(db,'pending_booking',itemId));
     await updateDoc(bookingCancel, {
      status: 'inactive'
     });
     toast.success("Booking Cancelled Successfully!")
  }

  return (
    <div className="allBookings">
      <h3>All Bookings</h3>
      <MDBDataTable scrollX striped bordered data={tableData} maxHeight="200px"/>
    </div>
  );
};

export default AllBookings;