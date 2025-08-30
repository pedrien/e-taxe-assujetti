import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

import { useDrawer } from "@/app/contexts/drawer/contextDrawer";

const ShowPay = () => {
    const { isDrawerOpen, closeDrawer } = useDrawer();
  return (
    <Sheet open={isDrawerOpen("ShowPay")} onOpenChange={() => closeDrawer("ShowPay")}>
        <SheetContent>
            <SheetHeader>
                <SheetTitle></SheetTitle>
            </SheetHeader>
            <div className="body flex-grow overflow-y-auto p-[16px] pt-0"></div>
            <SheetFooter></SheetFooter>
        </SheetContent>
    </Sheet>
  );
};

export default ShowPay;
