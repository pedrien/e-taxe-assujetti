import React from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

const BannerPage = () => {
  return (
    <div className="banner lg:pt-[40px] lg:pb-[90px] bg-blueDarken relative z-10">
      <div className="container-fluid px-3 lg:px-6 xl:px-6 max-w-[1600px] mx-auto">
        <div className="grid grid-cols-12 items-center">
          <div className="col-span-12 lg:col-span-6">
            <h1 className="text-white lg:text-[34px] font-medium">
              Véhicules
            </h1>
          </div>
          <div className="col-span-12 lg:col-span-6">
            <div className="flex justify-end">
              <Button className="bg-primaryColor rounded-lg cursor-pointer shadow-[0_5px_10px_#00000026]">
                <Plus></Plus> Nouveau véhicule
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BannerPage;
