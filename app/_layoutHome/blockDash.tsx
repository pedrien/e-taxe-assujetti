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
      <div className="banner-home lg:pt-[60px] lg:pb-[120px] bg-blueDarken">
        <div className="container-fluid px-3 lg:px-3 2xl:px-6">
          <h1 className="text-white lg:text-[32px] font-medium">
            Salut, Pedrien !
          </h1>
          <p className="text-white opacity-80 text-sm">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quo illo
            velit fuga.
          </p>
        </div>
      </div>
      <div className="content-card relative z-20 lg:mt-[-60px] mb-8 lg:mb-10">
        <div className="container-fluid px-3 lg:px-3 2xl:px-6 text-center">
          <div className="grid lg:grid-cols-5 gap-3 lg:gap-4">
            <div className="col-span-12 lg:col-span-1">
              <Card className="rounded-[24px] shadow-[var(--boxShadowCard)!important] border-0 bg-bgCard lg:p-[18px]">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="icon w-[46px] h-[46px] rounded-xl bg-[#2dcad2] text-white flex justify-center items-center">
                      <Home size={24} />
                    </div>
                    <h3 className="text-start text-sm text-colorMuted">
                      Immobiliers
                    </h3>
                  </div>
                  <div className="indice flex items-center text-xs text-[#2fac71]">
                    <span>+2.5%</span>
                    <MoveUp size={14} />
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <h4 className="text-colorTitle font-medium lg:text-[22px]">
                    10
                  </h4>
                </div>
              </Card>
            </div>
            <div className="col-span-12 lg:col-span-1">
              <Card className="rounded-[24px] shadow-[var(--boxShadowCard)!important] border-0 bg-bgCard lg:p-[18px]">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="icon w-[46px] h-[46px] rounded-xl bg-[#e0a430] text-[#ffffff] flex justify-center items-center">
                      <FileText size={24} />
                    </div>
                    <h3 className="text-start text-colorMuted text-sm">
                      Contrats de bail
                    </h3>
                  </div>
                  <div className="indice flex items-center text-xs text-[#da2d2d]">
                    <span>+2.5%</span>
                    <MoveDown size={14} />
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <h4 className="text-colorTitle font-medium lg:text-[22px]">
                    12
                  </h4>
                </div>
              </Card>
            </div>
            <div className="col-span-12 lg:col-span-1">
              <Card className="rounded-[24px] shadow-[var(--boxShadowCard)!important] border-0 bg-bgCard lg:p-[18px]">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="icon w-[46px] h-[46px] rounded-xl bg-primaryColor  text-white flex justify-center items-center">
                      <Car size={24} />
                    </div>
                    <h3 className="text-start text-sm text-colorMuted">
                      Véhicules
                    </h3>
                  </div>
                  <div className="indice flex items-center text-xs text-[#da2d2d]">
                    <span>+2.5%</span>
                    <MoveDown size={14} />
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <h4 className="text-colorTitle font-medium lg:text-[22px]">
                    3
                  </h4>
                </div>
              </Card>
            </div>

            <div className="col-span-12 lg:col-span-1">
              <Card className="rounded-[24px] shadow-[var(--boxShadowCard)!important] border-0 bg-bgCard lg:p-[18px]">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="icon w-[46px] h-[46px] rounded-xl bg-[#e07a30] text-[#ffffff] flex justify-center items-center">
                      <FileSignature size={24} />
                    </div>
                    <h3 className="text-start text-colorMuted text-sm">
                      Contrats de travail
                    </h3>
                  </div>
                  <div className="indice flex items-center text-xs text-[#da2d2d]">
                    <span>+2.5%</span>
                    <MoveDown size={14} />
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <h4 className="text-colorTitle font-medium lg:text-[22px]">
                    6
                  </h4>
                </div>
              </Card>
            </div>
            <div className="col-span-12 lg:col-span-1">
              <Card className="rounded-[24px] shadow-[var(--boxShadowCard)!important] border-0 bg-bgCard lg:p-[18px]">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="icon w-[46px] h-[46px] rounded-xl bg-[#308ee0]  text-[#ffffff] flex justify-center items-center">
                      <BarChart3 size={24} />
                    </div>
                    <h3 className="text-start text-colorMuted text-sm">
                      Activités économiques
                    </h3>
                  </div>
                  <div className="indice flex items-center text-xs text-[#2fac71]">
                    <span>+2.5%</span>
                    <MoveUp size={14} />
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <h4 className="text-colorTitle font-medium lg:text-[22px]">
                    9
                  </h4>
                </div>
              </Card>
            </div>
          </div>
          <div className="grid grid-cols-12 mt-3 lg:mt-4 gap-3 lg:gap-4">
            <div className="col-span-12 lg:col-span-4">
              <CardCompte/>
            </div>
            <div className="col-span-12 lg:col-span-8">
              <TableLastTransaction/>
            </div>
          </div>
        </div>
      </div>
      <ShowPay/>
    </>
  );
};

export default BlockDash;
