import React from "react";
import { useNextAuth } from "@/app/contexts/auth/useNextAuth";
import { useTaxpayerCounts } from "@/app/hooks/useTaxpayerCounts";
import { useProfileData } from "@/app/hooks/useProfileData";
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
import CardStat from "./cardStat";
import CardCompte from "./cardCompte";
import ShowPay from "@/components/features/showPay/showPay";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";
import { RefreshButton } from "@/components/ui/refresh-button";
import { RefetchDebug } from "@/components/debug/refetch-debug";

const BlockDash = () => {
  const { profileId } = useNextAuth();
  const { counts, loading, refetch } = useTaxpayerCounts(profileId);
  const { immovables: immovablesCount, vehicles: vehiclesCount, activities: activitiesCount } = counts;
  
  // Récupérer les informations du profil pour le nom de l'utilisateur
  const { payerProfile } = useProfileData(profileId || null);
  const userName = payerProfile?.givenName || "Utilisateur";

  return (
    <>
      <div className="banner-home lg:pt-[40px] lg:pb-[150px] bg-blueDarken relative z-10">
        <div className="container-fluid px-3 lg:px-6 xl:px-6 max-w-[1600px] mx-auto">
          <div className="grid grid-cols-12 items-center">
            <div className="col-span-12 lg:col-span-6">
              <h1 className="text-white lg:text-[34px] font-medium">
                Salut, {userName} !
              </h1>
              <p className="text-white opacity-80 text-sm lg:text-[16px]">
                Bienvenu sur votre tableau de bord
              </p>
            </div>
            <div className="col-span-12 lg:col-span-6">
              <div className="flex justify-end items-center gap-3">
                <RefreshButton 
                  onRefresh={async () => {
                    try {
                      if (refetch && typeof refetch === 'function') {
                        await refetch();
                      } else {
                        console.warn("Fonction refetch non disponible dans le dashboard");
                      }
                    } catch (error) {
                      console.error("Erreur lors du rafraîchissement:", error);
                    }
                  }}
                  size="md"
                  variant="outline"
                  className="bg-white/10 hover:bg-white/20 border-white/20 text-white hover:text-white"
                />
                <Button className="bg-primaryColor rounded-lg cursor-pointer shadow-[0_5px_10px_#00000026]">
                  Actions rapides
                  <ChevronDown></ChevronDown>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="content-card relative z-20 mb-8 py-[50px] bg-bgFond rounded-4xl lg:mt-[-30px] ">
        <div className="container-fluid px-3 lg:px-3 2xl:px-6 max-w-[1600px] lg:mt-[-110px] mx-auto">
          <div className="grid lg:grid-cols-5 gap-3 lg:gap-4 lg:mt-[-30px]">
            <div className="col-span-12 lg:col-span-1">
              <Card className="rounded-[24px] shadow-[var(--boxShadowCard)!important] border-0 bg-bgCard lg:p-[18px]">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="icon w-[46px] h-[46px] rounded-xl bg-[#5f61e6] text-[#ffffff] flex justify-center items-center">
                      <Home size={24} />
                    </div>
                    <h3 className="text-start text-sm text-colorMuted">
                      Immobiliers
                    </h3>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <h4 className="text-colorTitle font-medium lg:text-[22px]">
                    {loading ? "—" : immovablesCount}
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
                    <div className="icon w-[46px] h-[46px] rounded-xl bg-[#e65fa5] text-[#ffffff] flex justify-center items-center">
                      <FileText size={24} />
                    </div>
                    <h3 className="text-start text-colorMuted text-sm">
                      Unités locatives
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
                    <div className="icon w-[46px] h-[46px] rounded-xl bg-[#5fb3e6]  text-[#ffffff] flex justify-center items-center">
                      <Car size={24} />
                    </div>
                    <h3 className="text-start text-sm text-colorMuted">
                      Véhicules
                    </h3>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <h4 className="text-colorTitle font-medium lg:text-[22px]">
                    {loading ? "—" : vehiclesCount}
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
                    <div className="icon w-[46px] h-[46px] rounded-xl bg-[#f7843f] text-[#ffffff] flex justify-center items-center">
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
                    <div className="icon w-[46px] h-[46px] rounded-xl bg-[#ee5252]  text-[#ffffff] flex justify-center items-center">
                      <BarChart3 size={24} />
                    </div>
                    <h3 className="text-start text-colorMuted text-sm">
                      Activités économiques
                    </h3>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <h4 className="text-colorTitle font-medium lg:text-[22px]">
                    {loading ? "—" : activitiesCount}
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
            <div className="col-span-12 lg:col-span-8">
              <CardStat />
            </div>
            <div className="col-span-12 lg:col-span-4">
              <CardCompte />
            </div>
            <div className="col-span-12">
              <TableLastTransaction />
            </div>
          </div>
        </div>
      </div>
      <ShowPay />
      <RefetchDebug refetch={refetch} componentName="BlockDash" />
    </>
  );
};

export default BlockDash;
