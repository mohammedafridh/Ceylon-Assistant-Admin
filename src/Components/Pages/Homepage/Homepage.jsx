import React from "react";
import Charts from "./HomepageContents/Charts";
import FeaturedInfo from "./HomepageContents/FeaturedInfo";
import "./Homepage.css";
import BaseLayout from "../../Layouts/BaseLayout";
import BookingChart from "./HomepageContents/BookingChart";

const Homepage = () => {
  return (
    <BaseLayout>
      <div className="Homepage">
        <FeaturedInfo />
        <Charts />
        <BookingChart/>
      </div>
    </BaseLayout>
  );
};

export default Homepage;
