import React from "react";
import { Card } from "@/components/ui/card";
import {
  BanknoteArrowUp,
  MoveUp,
  CircleDollarSign,
  Banknote,
  MoveDown,
  AlertCircle,
  Gavel
} from "lucide-react";
import { Button } from "@/components/ui/button";

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
      <div className="content-card relative z-20 lg:mt-[-60px]">
        <div className="container-fluid px-3 lg:px-3 2xl:px-6 text-center">
          <div className="grid grid-cols-12 gap-3 lg:gap-4">
            <div className="col-span-12 lg:col-span-3">
              <Card className="rounded-[24px] shadow-[var(--boxShadowCard)!important] border-0 bg-primaryColor lg:p-[18px]">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="icon w-[50px] h-[50px] rounded-xl bg-bgCard text-colorTitle flex justify-center items-center">
                      <CircleDollarSign size={26} />
                    </div>
                    <h3 className="text-start text-white">Total dû</h3>
                  </div>
                  <div className="indice flex items-center text-xs text-white">
                    <span>+2.5%</span>
                    <MoveUp size={14} />
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <h4 className="text-white font-medium lg:text-[22px]">
                    300.000 CDF
                  </h4>
                  <Button className="bg-[#07192b] text-sm shadow-none rounded-xl cursor-pointer hover:bg-[#07192b]">
                    Payer
                  </Button>
                </div>
              </Card>
            </div>
            <div className="col-span-12 lg:col-span-3">
              <Card className="rounded-[24px] shadow-[var(--boxShadowCard)!important] border-0 bg-bgCard lg:p-[18px]">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="icon w-[50px] h-[50px] rounded-xl bg-[#30a8e024]  text-primaryColor flex justify-center items-center">
                      <Banknote size={26} />
                    </div>
                    <h3 className="text-start text-colorMuted">Principale</h3>
                  </div>
                  <div className="indice flex items-center text-xs text-[#da2d2d]">
                    <span>+2.5%</span>
                    <MoveDown size={14} />
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <h4 className="text-colorTitle font-medium lg:text-[22px]">
                    70.000 CDF
                  </h4>
                </div>
              </Card>
            </div>
            <div className="col-span-12 lg:col-span-3">
              <Card className="rounded-[24px] shadow-[var(--boxShadowCard)!important] border-0 bg-bgCard lg:p-[18px]">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="icon w-[50px] h-[50px] rounded-xl bg-[#ff4b4b21]  text-[#ff4b4b] flex justify-center items-center">
                      <AlertCircle size={26} />
                    </div>
                    <h3 className="text-start text-colorMuted">Pénalités</h3>
                  </div>
                  <div className="indice flex items-center text-xs text-[#2fac71]">
                    <span>+2.5%</span>
                    <MoveUp size={14} />
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <h4 className="text-colorTitle font-medium lg:text-[22px]">
                    100.000 CDF
                  </h4>
                </div>
              </Card>
            </div>
            <div className="col-span-12 lg:col-span-3">
              <Card className="rounded-[24px] shadow-[var(--boxShadowCard)!important] border-0 bg-bgCard lg:p-[18px]">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="icon w-[50px] h-[50px] rounded-xl bg-[#ff754b21] text-[#ff754b] flex justify-center items-center">
                      <Gavel size={26} />
                    </div>
                    <h3 className="text-start text-colorMuted">Amandes</h3>
                  </div>
                  <div className="indice flex items-center text-xs text-[#da2d2d]">
                    <span>+2.5%</span>
                    <MoveDown size={14} />
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <h4 className="text-colorTitle font-medium lg:text-[22px]">
                    130.000 CDF
                  </h4>
                </div>
              </Card>
            </div>
            <div className="col-span-12 lg:col-span-8 2xl:col-span-9">
            <Card className="rounded-[24px] shadow-[var(--boxShadowCard)!important] border-0 bg-bgCard lg:p-[18px]">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="icon w-[50px] h-[50px] rounded-xl bg-[#30a8e030]  text-primaryColor flex justify-center items-center">
                      <Banknote size={26} />
                    </div>
                    <h3 className="text-start text-colorMuted">Principale</h3>
                  </div>
                  <div className="indice flex items-center text-xs text-[#da2d2d]">
                    <span>+2.5%</span>
                    <MoveDown size={14} />
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <h4 className="text-colorTitle font-medium lg:text-[22px]">
                    70.000 CDF
                  </h4>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BlockDash;
