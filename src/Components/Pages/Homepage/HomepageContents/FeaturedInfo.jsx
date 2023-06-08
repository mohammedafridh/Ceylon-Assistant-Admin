import React, { useState, useEffect } from "react";
import { ArrowDownward, ArrowUpward } from "@mui/icons-material";
import "./FeaturedInfo.css";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../../../../Firebase";

const FeaturedInfo = () => {
  const [bookings, setBookings] = useState([]);
  const [tourists, setTourists] = useState([]);
  const [tourGuides, setTourGuides] = useState([])
  const [tours, setTours] = useState([]);
  const [error,setError] = useState('')


  const compareBookings = () => {
    // get the current month
    const currentMonth = new Date().getMonth();

    // get the previous month
    const previousMonth = currentMonth - 1;

//current month
    // get the bookings for the current month
    const currentMonthBookings = bookings.filter((booking) => {
      const bookingMonth = new Date(booking.date).getMonth();
      return bookingMonth === currentMonth;
    });

    // get the tours for the current month
    const currentMonthTours = tours.filter((tour) => {
        const tourMonth = new Date(tour.date).getMonth();
        return tourMonth === currentMonth;
      });

       // get the tourist register for the current month
    const currentMonthtourist = tourists.filter((tourist) => {
        const touristMonth = new Date(tourist.date).getMonth();
        return touristMonth === currentMonth;
      });
  
      // get the tour guide register for the current month
      const currentMonthTourGuide = tourGuides.filter((tourGuide) => {
          const tourGuideMonth = new Date(tourGuide.date).getMonth();
          return tourGuideMonth === currentMonth;
        });

//previous month
    // get the bookings for the previous month
    const previousMonthBookings = bookings.filter((booking) => {
      const bookingMonth = new Date(booking.date).getMonth();
      return bookingMonth === previousMonth;
    });

    // get the bookings for the previous month
    const previousMonthTours = tours.filter((tour) => {
        const tourMonth = new Date(tour.date).getMonth();
        return tourMonth === previousMonth;
      });

    // get the tourist for the previous month
    const previousMonthTourists = tourists.filter((tourist) => {
        const touristMonth = new Date(tourist.date).getMonth();
        return touristMonth === previousMonth;
      });
  
      // get the tour guide for the previous month
      const previousMonthTourGuides = tourGuides.filter((tourGuide) => {
          const tourGuideMonth = new Date(tourGuide.date).getMonth();
          return tourGuideMonth === previousMonth;
        });
    
    // compare the two bookings
    const comparedBookings = currentMonthBookings.length - previousMonthBookings.length;

    const compareBookingsDifference = () => {
        if (comparedBookings > 0) {
            return <ArrowUpward className="featuringIcon positive" />
        } else if (comparedBookings < 0) {
            return <ArrowDownward className="featuringIcon" />
        } else {
            return <ArrowDownward className="featuringIcon" />
        }   
    }

    // compare the two tours
    const comparedTours = currentMonthTours.length - previousMonthTours.length;

    const compareToursDifference = () => {
        if (comparedTours > 0) {
            return <ArrowUpward className="featuringIcon positive" />
        } else if (comparedTours < 0) {
            return <ArrowDownward className="featuringIcon" />
        } else {
            return <ArrowDownward className="featuringIcon" />
        }   
    }

    // compare the two tourists
    const comparedTourists = currentMonthtourist.length - previousMonthTourists.length;

    const compareTouristDifference = () => {
        if (currentMonthtourist.length > previousMonthTourists.length) {
            return <ArrowUpward className="featuringIcon positive" />
        } else if (currentMonthtourist.length < previousMonthTourists.length) {
            return <ArrowDownward className="featuringIcon" />
        } else {
            return <ArrowDownward className="featuringIcon" />
        }   
    }

    // compare the two tours
    const comparedTourGuides = currentMonthTourGuide.length - previousMonthTourGuides.length;

    const compareTourGuidesDifference = () => {
        if (comparedTourGuides > 0) {
            return <ArrowUpward className="featuringIcon positive" />
        } else if (comparedTourGuides < 0) {
            return <ArrowDownward className="featuringIcon" />
        } else {
            return <ArrowDownward className="featuringIcon" />
        }   
    }

    return {comparedBookings, compareBookingsDifference, comparedTours, compareToursDifference,
        comparedTourists, compareTouristDifference, comparedTourGuides, compareTourGuidesDifference};
  }

  // get compare Bookings from the function
    const {comparedBookings, compareBookingsDifference} = compareBookings();

    // get compare Tours from the function
    const {comparedTours, compareToursDifference} = compareBookings();

    // get compare Tourists from the function
    const {comparedTourists, compareTouristDifference} = compareBookings();

    // get compare Tours from the function
    const {comparedTourGuides, compareTourGuidesDifference} = compareBookings();

//get Bookings from db
  useEffect(() => {
    const bookingData = onSnapshot(collection(db, "pending_booking"), (snapshot) => {
      let list = [];
      snapshot.docs.forEach((doc) => {
        list.push({
          docId: doc.id,
          ...doc.data(),
        });
      });
      setBookings(list);
    },
    (error) => {
        setError(error.message);
      })
    return () => {
      bookingData();
    };
  }, []);

  //get Tours from db
  useEffect(() => {
    const tourData = onSnapshot(collection(db, "tours"), (snapshot) => {
      let list = [];
      snapshot.docs.forEach((doc) => {
        list.push({
          docId: doc.id,
          ...doc.data(),
        });
      });
      setTours(list);
    },
    (error) => {
        console.log(error.message);
      })
    return () => {
      tourData();
    };
  }, []);

  //get Tourists from db
  useEffect(() => {
    const touristData = onSnapshot(collection(db, "Tourist"), (snapshot) => {
      let list = [];
      snapshot.docs.forEach((doc) => {
        list.push({
          docId: doc.id,
          ...doc.data(),
        });
      });
      setTourists(list);
    },
    (error) => {
        console.log(error.message);
      })
    return () => {
        touristData();
    };
  }, []);

  //get Tours from db
  useEffect(() => {
    const tourGuideData = onSnapshot(collection(db, "Guides"), (snapshot) => {
      let list = [];
      snapshot.docs.forEach((doc) => {
        list.push({
          docId: doc.id,
          ...doc.data(),
        });
      });
      setTourGuides(list);
    },
    (error) => {
        console.log(error.message);
      })
    return () => {
        tourGuideData();
    };
  }, []);

  return (
    <div className="featured">
      <div className="featuredItem">
        <span className="featuredTitle">Tourists Register</span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney">{tourists.length}</span>
          <span className="featuredMoneyRate">
            {comparedTourists}
            {compareTouristDifference()}
          </span>
        </div>
        <span className="featuredSub">Compared to last month</span>
      </div>

      <div className="featuredItem">
        <span className="featuredTitle">Tour Guide Register</span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney">{tourGuides.length}</span>
          <span className="featuredMoneyRate">
            {comparedTourGuides}
            {compareTourGuidesDifference()}
          </span>
        </div>
        <span className="featuredSub">Compared to last month</span>
      </div>

      <div className="featuredItem">
        <span className="featuredTitle">Bookings</span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney">{bookings.length}</span>
          <span className="featuredMoneyRate">
            {comparedBookings}
            {compareBookingsDifference()}
          </span>
        </div>
        <span className="featuredSub">Compared to last month</span>
      </div>

      <div className="featuredItem">
        <span className="featuredTitle">Tours</span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney">{tours.length}</span>
          <span className="featuredMoneyRate">
            {comparedTours}
            {compareToursDifference()}
          </span>
        </div>
        <span className="featuredSub">Compared to last month</span>
      </div>
    </div>
  );
};

export default FeaturedInfo;