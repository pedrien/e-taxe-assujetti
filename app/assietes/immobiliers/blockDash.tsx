import React from "react";
import { Button } from "@/components/ui/button";
import { Plus, ArrowRight } from "lucide-react";
import TableImmobiliers from "./tableImmobiliers";
import Link from "next/link";

const BlockDash = () => {
  return (
    <>
      <div className="max-w-[1600px] px-3 mx-auto w-full lg:px-6 mt-4 lg:mt-5">
        <div className="grid grid-cols-12 items-center justify-between gap-3 mb-3 lg:mb-6">
          <div className="col-span-12 lg:col-span-3">
            <h2 className="font-semibold text-[22px]">Immobiliers</h2>
          </div>
          <div className="col-span-12 lg:col-span-6">
            <div className="flex justify-center">
              <ul className="bg-bgCard p-[5px] rounded-full flex">
                <li>
                  <Link href={"#"} className="inline-flex text-sm py-[8px] px-[12px] text- font-medium bg-bgFond rounded-full">Mes immobiliers</Link>
                </li>
                <li>
                  <Link href={"#"} className="inline-flex text-sm py-[8px] px-[12px] text-colorMuted">Mes unités locatives</Link>
                </li>
                <li>
                  <Link href={"#"} className="inline-flex text-sm py-[8px] px-[12px] text-colorMuted">Mes contrats de bails</Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="col-span-12 lg:col-span-3">
            <div className="flex items-center  justify-end gap-2">
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
        </div>
        <TableImmobiliers />
      </div>
    </>
  );
};

export default BlockDash;
