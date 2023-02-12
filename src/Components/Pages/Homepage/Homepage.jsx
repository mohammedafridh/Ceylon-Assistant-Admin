import React from "react";
import Charts from "./HomepageContents/Charts";
import FeaturedInfo from "./HomepageContents/FeaturedInfo";
import "./Homepage.css";
import WidgetLg from "./HomepageContents/WidgetLg";
import BaseLayout from "../../Layouts/BaseLayout";

const Homepage = () => {
  return (
    <BaseLayout>
      <div className="Homepage">
        <FeaturedInfo />
        <Charts />
        <WidgetLg />
      </div>
    </BaseLayout>
  );
};

export default Homepage;
