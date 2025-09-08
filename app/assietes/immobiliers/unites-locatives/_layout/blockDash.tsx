import React from "react";
import { Button } from "@/components/ui/button";
import { Plus, ArrowRight } from "lucide-react";
import TableImmobiliers from "./tableImmobiliers";
import Link from "next/link";
import BannerPage from "@/components/features/immobiliers/bannerPage/bannerPage";

const BlockDash = () => {
  return (
    <>
      <BannerPage />
      <div className="relative z-20 mb-8 py-[50px] bg-bgFond rounded-4xl lg:mt-[-30px] ">
        <div className="container-fluid px-3 lg:px-3 2xl:px-6 max-w-[1600px] lg:mt-[-74px] mx-auto">
          <div className="grid grid-cols-12 items-center justify-between gap-3 mb-3 lg:mb-6">
           
            <div className="col-span-12">
              <div className="flex justify-center">
                <ul className="bg-bgCard p-[5px] rounded-full flex">
                  <li>
                    <Link
                      href={"/assietes/immobiliers"}
                      className="inline-flex text-sm py-[8px] px-[12px] text-colorMuted  rounded-full hover:text-colorTitle"
                    >
                      Mes immobiliers
                    </Link>
                  </li>
                  <li>
                    <Link
                      href={"/assietes/immobiliers/unites-locatives"}
                      className="inline-flex text-sm py-[8px] px-[12px] text-white bg-[#07192b] font-medium rounded-full  "
                    >
                      Mes unités locatives
                    </Link>
                  </li>
                  <li>
                    <Link
                      href={"/assietes/immobiliers/contrat-bail"}
                      className="inline-flex text-sm py-[8px] px-[12px] text-colorMuted hover:text-colorTitle"
                    >
                      Mes contrats de bails
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
            
          </div>
          <TableImmobiliers />
        </div>
      </div>
    </>
  );
};

export default BlockDash;
