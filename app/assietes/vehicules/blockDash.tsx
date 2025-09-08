import React from "react";
import TableVehicules from "./tableVehicules";
import BannerPage from "@/components/features/vehicule/bannerPage/bannerPage";

const BlockDash = () => {
  return (
    <>
      <BannerPage />
      <div className="relative z-20 mb-8 py-[50px] bg-bgFond rounded-4xl lg:mt-[-30px] ">
        <div className="container-fluid px-3 lg:px-3 2xl:px-6 max-w-[1600px] lg:mt-[-74px] mx-auto">
          <TableVehicules />
        </div>
      </div>
    </>
  );
};

export default BlockDash;
