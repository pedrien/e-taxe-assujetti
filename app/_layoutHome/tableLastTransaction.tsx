import React from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Eye, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useDrawer } from "@/app/contexts/drawer/contextDrawer";


const TableLastTransaction = () => {
  const { openDrawer } = useDrawer();
  return (
    <>
        <Card className="rounded-[24px] shadow-[var(--boxShadowCard)!important] border-0 bg-bgCard lg:p-[18px]">
      <div className="grid grid-cols-12 gap-3 items-center">
        <div className="col-span-12 lg:col-span-5">
          <h2 className="font-semibold text-colorTitle text-start">
            Dernières transactions
          </h2>
        </div>
        <div className="col-span-12 lg:col-span-7">
          <div className="flex lg:justify-end gap-2">
            <div className="block-search relative flex items-center">
              <div className="icon absolute left-2 text-colorTitle">
                <Search size={18} />
              </div>
              <Input
                type="text"
                className="shadow-none h-10 pl-8 rounded-lg border-borderInput placeholder:text-colorMuted placeholder:opacity-70"
                placeholder="Recherche"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="table w-full table-bordered">
          <thead>
            <tr>
              <th>#</th>
              <th>Opération</th>
              <th>Débit</th>
              <th>Crédit</th>
              <th>Solde</th>
              <th>Date</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <span>1</span>
              </td>
              <td>
                <span>Opération-289309202</span>
              </td>
              <td>
                <span>2 000 USD</span>
              </td>
              <td>
                <span>0.000 USD</span>
              </td>
              <td>
                <span>162 000 USD</span>
              </td>
              <td>
                <span>30/08/2025</span>
              </td>
              <td>
                <div className="flex items-center gap-1">
                  <Button className="cursor-pointer bg-bgGray text-colorTitle p-0 w-[32px] h-[32px] hover:bg-[#07192b] hover:text-white">
                    <Eye></Eye>
                  </Button>
                </div>
              </td>
            </tr>
            <tr>
              <td>
                <span>1</span>
              </td>
              <td>
                <span>Opération-289309202</span>
              </td>
              <td>
                <span>2 000 USD</span>
              </td>
              <td>
                <span>0.000 USD</span>
              </td>
              <td>
                <span>162 000 USD</span>
              </td>
              <td>
                <span>30/08/2025</span>
              </td>
              <td>
                <div className="flex items-center gap-1">
                  <Button
                    className="cursor-pointer bg-bgGray text-colorTitle p-0 w-[32px] h-[32px] hover:bg-[#07192b] hover:text-white"
                    onClick={() => {
                      openDrawer("ShowPay");
                    }}
                  >
                    <Eye></Eye>
                  </Button>
                </div>
              </td>
            </tr>
            <tr>
              <td>
                <span>1</span>
              </td>
              <td>
                <span>Opération-289309202</span>
              </td>
              <td>
                <span>2 000 USD</span>
              </td>
              <td>
                <span>0.000 USD</span>
              </td>
              <td>
                <span>162 000 USD</span>
              </td>
              <td>
                <span>30/08/2025</span>
              </td>
              <td>
                <div className="flex items-center gap-1">
                  <Button className="cursor-pointer bg-bgGray text-colorTitle p-0 w-[32px] h-[32px] hover:bg-[#07192b] hover:text-white">
                    <Eye></Eye>
                  </Button>
                </div>
              </td>
            </tr>
            <tr>
              <td>
                <span>1</span>
              </td>
              <td>
                <span>Opération-289309202</span>
              </td>
              <td>
                <span>2 000 USD</span>
              </td>
              <td>
                <span>0.000 USD</span>
              </td>
              <td>
                <span>162 000 USD</span>
              </td>
              <td>
                <span>30/08/2025</span>
              </td>
              <td>
                <div className="flex items-center gap-1">
                  <Button className="cursor-pointer bg-bgGray text-colorTitle p-0 w-[32px] h-[32px] hover:bg-[#07192b] hover:text-white">
                    <Eye></Eye>
                  </Button>
                </div>
              </td>
            </tr>
            <tr>
              <td>
                <span>1</span>
              </td>
              <td>
                <span>Opération-289309202</span>
              </td>
              <td>
                <span>2 000 USD</span>
              </td>
              <td>
                <span>0.000 USD</span>
              </td>
              <td>
                <span>162 000 USD</span>
              </td>
              <td>
                <span>30/08/2025</span>
              </td>
              <td>
                <div className="flex items-center gap-1">
                  <Button className="cursor-pointer bg-bgGray text-colorTitle p-0 w-[32px] h-[32px] hover:bg-[#07192b] hover:text-white">
                    <Eye></Eye>
                  </Button>
                </div>
              </td>
            </tr>
            <tr>
              <td>
                <span>1</span>
              </td>
              <td>
                <span>Opération-289309202</span>
              </td>
              <td>
                <span>2 000 USD</span>
              </td>
              <td>
                <span>0.000 USD</span>
              </td>
              <td>
                <span>162 000 USD</span>
              </td>
              <td>
                <span>30/08/2025</span>
              </td>
              <td>
                <div className="flex items-center gap-1">
                  <Button className="cursor-pointer bg-bgGray text-colorTitle p-0 w-[32px] h-[32px] hover:bg-[#07192b] hover:text-white">
                    <Eye></Eye>
                  </Button>
                </div>
              </td>
            </tr>
            <tr>
              <td>
                <span>1</span>
              </td>
              <td>
                <span>Opération-289309202</span>
              </td>
              <td>
                <span>2 000 USD</span>
              </td>
              <td>
                <span>0.000 USD</span>
              </td>
              <td>
                <span>162 000 USD</span>
              </td>
              <td>
                <span>30/08/2025</span>
              </td>
              <td>
                <div className="flex items-center gap-1">
                  <Button className="cursor-pointer bg-bgGray text-colorTitle p-0 w-[32px] h-[32px] hover:bg-[#07192b] hover:text-white">
                    <Eye></Eye>
                  </Button>
                </div>
              </td>
            </tr>
            <tr>
              <td>
                <span>1</span>
              </td>
              <td>
                <span>Opération-289309202</span>
              </td>
              <td>
                <span>2 000 USD</span>
              </td>
              <td>
                <span>0.000 USD</span>
              </td>
              <td>
                <span>162 000 USD</span>
              </td>
              <td>
                <span>30/08/2025</span>
              </td>
              <td>
                <div className="flex items-center gap-1">
                  <Button className="cursor-pointer bg-bgGray text-colorTitle p-0 w-[32px] h-[32px] hover:bg-[#07192b] hover:text-white">
                    <Eye></Eye>
                  </Button>
                </div>
              </td>
            </tr>
            <tr>
              <td>
                <span>1</span>
              </td>
              <td>
                <span>Opération-289309202</span>
              </td>
              <td>
                <span>2 000 USD</span>
              </td>
              <td>
                <span>0.000 USD</span>
              </td>
              <td>
                <span>162 000 USD</span>
              </td>
              <td>
                <span>30/08/2025</span>
              </td>
              <td>
                <div className="flex items-center gap-1">
                  <Button className="cursor-pointer bg-bgGray text-colorTitle p-0 w-[32px] h-[32px] hover:bg-[#07192b] hover:text-white">
                    <Eye></Eye>
                  </Button>
                </div>
              </td>
            </tr>
            <tr>
              <td>
                <span>1</span>
              </td>
              <td>
                <span>Opération-289309202</span>
              </td>
              <td>
                <span>2 000 USD</span>
              </td>
              <td>
                <span>0.000 USD</span>
              </td>
              <td>
                <span>162 000 USD</span>
              </td>
              <td>
                <span>30/08/2025</span>
              </td>
              <td>
                <div className="flex items-center gap-1">
                  <Button className="cursor-pointer bg-bgGray text-colorTitle p-0 w-[32px] h-[32px] hover:bg-[#07192b] hover:text-white">
                    <Eye></Eye>
                  </Button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </Card>
    </>
  );
};

export default TableLastTransaction;
