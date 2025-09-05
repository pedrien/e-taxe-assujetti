import React from "react";
import { Card } from "@/components/ui/card";
import {
  MoveUp,
  MoveDown,
  Home,
  Car,
  FileSignature,
  FileText,
  BarChart3,
} from "lucide-react";
import TableLastTransaction from "./tableLastTransaction";
import CardCompte from "./cardCompte";
import ShowPay from "@/components/features/showPay/showPay";

const BlockDash = () => {
  return (
    <>
      <div className="banner-home lg:pt-[60px] lg:pb-[150px] bg-blueDarken">
        <div className="container-fluid px-3 lg:px-3 2xl:px-6 max-w-[1600px] mx-auto">
          <h1 className="text-white lg:text-[34px] font-medium">
            Salut, Pedrien !
          </h1>
          <p className="text-white opacity-80 text-sm lg:text-[16px]">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quo illo
            velit fuga.
          </p>
        </div>
      </div>
      <div className="content-card relative z-20 mb-8 py-[50px] bg-bgFond rounded-4xl lg:mt-[-30px] ">
        <div className="container-fluid px-3 lg:px-3 2xl:px-6 max-w-[1600px] lg:mt-[-100px] mx-auto">
          <div className="grid lg:grid-cols-5 gap-3 lg:gap-4 lg:mt-[-30px]">
            <div className="col-span-12 lg:col-span-1">
              <Card className="rounded-[24px] shadow-[var(--boxShadowCard)!important] border-0 bg-bgCard lg:p-[18px]">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="icon w-[46px] h-[46px] rounded-xl bg-[#2dcad221] text-[#2dcad2] flex justify-center items-center">
                      <Home size={24} />
                    </div>
                    <h3 className="text-start text-sm text-colorMuted">
                      Immobiliers
                    </h3>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <h4 className="text-colorTitle font-medium lg:text-[22px]">
                    10
                  </h4>
                  <div className="indice flex items-center text-xs text-[#2fac71]">
                    <span>+2.5%</span>
                    <MoveUp size={14} />
                  </div>
                </div>
              </Card>
            </div>
            <div className="col-span-12 lg:col-span-1">
              <Card className="rounded-[24px] shadow-[var(--boxShadowCard)!important] border-0 bg-bgCard lg:p-[18px]">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="icon w-[46px] h-[46px] rounded-xl bg-[#f4ae2721] text-[#f4ae27] flex justify-center items-center">
                      <FileText size={24} />
                    </div>
                    <h3 className="text-start text-colorMuted text-sm">
                      Contrats de bail
                    </h3>
                  </div>
                  
                </div>
                <div className="flex items-center justify-between">
                  <h4 className="text-colorTitle font-medium lg:text-[22px]">
                    12
                  </h4>
                  <div className="indice flex items-center text-xs text-[#da2d2d]">
                    <span>+2.5%</span>
                    <MoveDown size={14} />
                  </div>
                </div>
              </Card>
            </div>
            <div className="col-span-12 lg:col-span-1">
              <Card className="rounded-[24px] shadow-[var(--boxShadowCard)!important] border-0 bg-bgCard lg:p-[18px]">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="icon w-[46px] h-[46px] rounded-xl bg-[#168fe621]  text-[#168fe6] flex justify-center items-center">
                      <Car size={24} />
                    </div>
                    <h3 className="text-start text-sm text-colorMuted">
                      Véhicules
                    </h3>
                  </div>
                  
                </div>
                <div className="flex items-center justify-between">
                  <h4 className="text-colorTitle font-medium lg:text-[22px]">
                    3
                  </h4>
                  <div className="indice flex items-center text-xs text-[#da2d2d]">
                    <span>+2.5%</span>
                    <MoveDown size={14} />
                  </div>
                </div>
              </Card>
            </div>

            <div className="col-span-12 lg:col-span-1">
              <Card className="rounded-[24px] shadow-[var(--boxShadowCard)!important] border-0 bg-bgCard lg:p-[18px]">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="icon w-[46px] h-[46px] rounded-xl bg-[#f08e3721] text-[#f08e37] flex justify-center items-center">
                      <FileSignature size={24} />
                    </div>
                    <h3 className="text-start text-colorMuted text-sm">
                      Contrats de travail
                    </h3>
                  </div>
                 
                </div>
                <div className="flex items-center justify-between">
                  <h4 className="text-colorTitle font-medium lg:text-[22px]">
                    6
                  </h4>
                  <div className="indice flex items-center text-xs text-[#da2d2d]">
                    <span>+2.5%</span>
                    <MoveDown size={14} />
                  </div>
                </div>
              </Card>
            </div>
            <div className="col-span-12 lg:col-span-1">
              <Card className="rounded-[24px] shadow-[var(--boxShadowCard)!important] border-0 bg-bgCard lg:p-[18px]">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="icon w-[46px] h-[46px] rounded-xl bg-[#7038ea21]  text-[#7038ea] flex justify-center items-center">
                      <BarChart3 size={24} />
                    </div>
                    <h3 className="text-start text-colorMuted text-sm">
                      Activités économiques
                    </h3>
                  </div>
                 
                </div>
                <div className="flex items-center justify-between">
                  <h4 className="text-colorTitle font-medium lg:text-[22px]">
                    9
                  </h4>
                  <div className="indice flex items-center text-xs text-[#2fac71]">
                    <span>+2.5%</span>
                    <MoveUp size={14} />
                  </div>
                </div>
              </Card>
            </div>
          </div>
          <div className="grid grid-cols-12 mt-3 lg:mt-4 gap-3 lg:gap-4">
            <div className="col-span-12 lg:col-span-4">
              <CardCompte />
            </div>
            <div className="col-span-12 lg:col-span-8">
              <TableLastTransaction />
            </div>
          </div>
        </div>
      </div>
      <ShowPay />
    </>
  );
};

export default BlockDash;
