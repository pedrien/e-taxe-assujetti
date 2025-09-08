import React from "react";
import TableActivities from "./tableActivities";
import BannerPage from "@/components/features/activite/bannerPage/bannerPage";

const BlockDash = () => {
  return (
    <>
      <BannerPage />
      <div className="relative z-20 mb-8 py-[50px] bg-bgFond rounded-4xl lg:mt-[-30px]">
        <div className="container-fluid px-3 lg:px-3 2xl:px-6 max-w-[1600px] lg:mt-[-74px] mx-auto">
          <TableActivities />
        </div>
      </div>
    </>
  );
};

export default BlockDash;
