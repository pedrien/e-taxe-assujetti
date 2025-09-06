import { useDrawer } from "@/app/contexts/drawer/contextDrawer";
import { StatisticsChart } from "@/components/features/charts/statisticsChart";
import { Card } from "@/components/ui/card";

const CardStat = () => {
  const { openDrawer } = useDrawer();
  return (
    <>
      <Card className="rounded-[24px] shadow-[var(--boxShadowCard)!important] border-0 bg-bgCard lg:p-[18px]">
        <StatisticsChart />
      </Card>
    </>
  );
};

export default CardStat;
