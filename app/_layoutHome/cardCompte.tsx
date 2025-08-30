import React from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Eye, Search, MoveUp, MoveDown } from "lucide-react";

const CardCompte = () => {
  return (
    <Card className="rounded-[24px] shadow-[var(--boxShadowCard)!important] border-0 bg-bgCard lg:p-[18px]">
      <div className="flex justify-between items-center">
        <h2 className="font-semibold text-colorTitle text-start">
          Montant dûs
        </h2>
        <Button className="bg-[#2c9bd029] text-primaryColor text-xs h-auto py-2 shadow-none cursor-pointer hover:bg-primaryColor hover:text-white rounded-lg">
          Payer
        </Button>
      </div>
      <div className="flex flex-col gap-3">
        <div className="card p-3 rounded-xl border border-borderTr border-dashed">
          <div className="flex justify-between items-center gap-2">
            <p className="text-colorMuted text-sm">Principale</p>
            <div className="flex items-center gap-1">
              <h6 className="text-colorTitle font-medium">100000 CDF</h6>
              <div className="indice flex items-center text-xs text-[#2fac71]">
                <span>+2.5%</span>
                <MoveUp size={14} />
              </div>
            </div>
          </div>
        </div>
        <div className="card p-3 rounded-xl border border-borderTr border-dashed">
          <div className="flex justify-between items-center gap-2">
            <p className="text-colorMuted text-sm">Pénalités</p>
            <div className="flex items-center gap-1">
              <h6 className="text-colorTitle font-medium">200000 CDF</h6>
              <div className="indice flex items-center text-xs text-[#da2d2d]">
                <span>+2.5%</span>
                <MoveDown size={14} />
              </div>
            </div>
          </div>
        </div>
        <div className="card p-3 rounded-xl border border-borderTr border-dashed">
          <div className="flex justify-between items-center gap-2">
            <p className="text-colorMuted text-sm">Amendes</p>
            <div className="flex items-center gap-1">
              <h6 className="text-colorTitle font-medium">300000 CDF</h6>
              <div className="indice flex items-center text-xs text-[#2fac71]">
                <span>+2.5%</span>
                <MoveUp size={14} />
              </div>  
            </div>
          </div>
        </div>
        <hr className="border-borderTr"/>
        <div className="flex items-center justify-between gap-2">
          <p className="text-colorTitle text-sm font-medium">Total</p>
          <h6 className="text-colorTitle text-[18px] font-medium">600000 CDF</h6>
        </div>
      </div>
    </Card>
  );
};

export default CardCompte;
