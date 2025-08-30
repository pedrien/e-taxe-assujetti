import React from "react";;
import { Button } from "@/components/ui/button";
import { Plus, ArrowRight } from "lucide-react";
import TableContratBail from "./tableContratBail";


const BlockDash = () => {
  return (
    <>
      <div className="max-w-[1520px] px-3 mx-auto w-full lg:px-6 mt-4 lg:mt-5">
        <div className="flex items-center justify-between gap-3 mb-3 lg:mb-4">
          <h2 className="font-semibold text-[18px]">Contrats de bail</h2>
          <div className="flex items-center gap-2">
            <Button className="bg-bgCard shadow-none text-colorTitle cursor-pointer hover:bg-bgCard hover:text-primaryColor h-10 rounded-lg">
              Exporter
              <ArrowRight></ArrowRight>
            </Button>
            <Button className="bg-primaryColor shadow-none cursor-pointer hover:bg-primaryColor h-10 rounded-lg">
              <Plus></Plus>
              Ajouter
            </Button>
          </div>
        </div>
        <TableContratBail />
      </div>
    </>
  );
};

export default BlockDash;
