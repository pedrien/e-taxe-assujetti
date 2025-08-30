import React from "react";
import { Card } from "@/components/ui/card";
import { Search, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectValue,
  SelectTrigger,
  SelectContent,
  SelectGroup,
  SelectLabel,
  SelectItem,
} from "@/components/ui/select";
import Image from "next/image";

const TableContratBail = () => {
  return (
    <div className="grid grid-cols-1">
      <div className="col-span-1">
        <Card className="rounded-[24px] shadow-[var(--boxShadowCard)!important] border-0 bg-bgCard lg:p-[18px]">
          <div className="grid grid-cols-12 gap-3 items-center">
            <div className="col-span-12 lg:col-span-5">
              <h2 className="font-semibold text-colorTitle">
                Liste des contrats de bail
              </h2>
            </div>
            <div className="col-span-12 lg:col-span-7">
              <div className="flex lg:justify-end gap-2">
                <div className="block-selects flex border border-borderInput rounded-lg">
                  <Select>
                    <SelectTrigger className="w-[180px] shadow-none border-0 rounded-none border-r border-borderInput text-colorTitle">
                      <SelectValue placeholder="Nature" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Nature</SelectLabel>
                        <SelectItem value="apple">Apple</SelectItem>
                        <SelectItem value="banana">Banana</SelectItem>
                        <SelectItem value="blueberry">Blueberry</SelectItem>
                        <SelectItem value="grapes">Grapes</SelectItem>
                        <SelectItem value="pineapple">Pineapple</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                  <Select>
                    <SelectTrigger className="w-[180px] shadow-none border-0 rounded-none border-r border-borderInput text-colorTitle">
                      <SelectValue placeholder="Rang" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Rang</SelectLabel>
                        <SelectItem value="apple">Apple</SelectItem>
                        <SelectItem value="banana">Banana</SelectItem>
                        <SelectItem value="blueberry">Blueberry</SelectItem>
                        <SelectItem value="grapes">Grapes</SelectItem>
                        <SelectItem value="pineapple">Pineapple</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                  <Select>
                    <SelectTrigger className="w-[180px] shadow-none border-0 rounded-none">
                      <SelectValue placeholder="Statut" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Statut</SelectLabel>
                        <SelectItem value="apple">Apple</SelectItem>
                        <SelectItem value="banana">Banana</SelectItem>
                        <SelectItem value="blueberry">Blueberry</SelectItem>
                        <SelectItem value="grapes">Grapes</SelectItem>
                        <SelectItem value="pineapple">Pineapple</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
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
                  <th>Unité ID</th>
                  <th>Immobilier</th>
                  <th>Bailleur</th>
                  <th>Locataire</th>
                  <th>Loyer</th>
                  <th>
                    {"Date d'entrée"}
                  </th>
                  <th>Date de sortie</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <div className="flex items-center gap-1">
                      <Image src={'/images/icones/pdf.png'} alt="logo" width={0} height={0} layout="responsive" className="w-[32px!important]"/>
                      <span>0892973</span>
                    </div>
                  </td>
                  <td>
                    <span>Immeuble galerie présidentielle</span>
                  </td>
                  <td>
                    <span>Crispin Mugisho</span>
                  </td>
                  <td>
                    <span>Maria Lutumba </span>
                  </td>
                  <td>
                    <span>300$</span>
                  </td>
                  <td>
                    <span>12/03/2022</span>
                  </td>
                  <td>
                    <span>20/08/2023</span>
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
                    <div className="flex items-center gap-1">
                      <Image src={'/images/icones/pdf.png'} alt="logo" width={0} height={0} layout="responsive" className="w-[32px!important]"/>
                      <span>0892973</span>
                    </div>
                  </td>
                  <td>
                    <span>Immeuble galerie présidentielle</span>
                  </td>
                  <td>
                    <span>Crispin Mugisho</span>
                  </td>
                  <td>
                    <span>Maria Lutumba </span>
                  </td>
                  <td>
                    <span>300$</span>
                  </td>
                  <td>
                    <span>12/03/2022</span>
                  </td>
                  <td>
                    <span>20/08/2023</span>
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
                    <div className="flex items-center gap-1">
                      <Image src={'/images/icones/pdf.png'} alt="logo" width={0} height={0} layout="responsive" className="w-[32px!important]"/>
                      <span>0892973</span>
                    </div>
                  </td>
                  <td>
                    <span>Immeuble galerie présidentielle</span>
                  </td>
                  <td>
                    <span>Crispin Mugisho</span>
                  </td>
                  <td>
                    <span>Maria Lutumba </span>
                  </td>
                  <td>
                    <span>300$</span>
                  </td>
                  <td>
                    <span>12/03/2022</span>
                  </td>
                  <td>
                    <span>20/08/2023</span>
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
                    <div className="flex items-center gap-1">
                      <Image src={'/images/icones/pdf.png'} alt="logo" width={0} height={0} layout="responsive" className="w-[32px!important]"/>
                      <span>0892973</span>
                    </div>
                  </td>
                  <td>
                    <span>Immeuble galerie présidentielle</span>
                  </td>
                  <td>
                    <span>Crispin Mugisho</span>
                  </td>
                  <td>
                    <span>Maria Lutumba </span>
                  </td>
                  <td>
                    <span>300$</span>
                  </td>
                  <td>
                    <span>12/03/2022</span>
                  </td>
                  <td>
                    <span>20/08/2023</span>
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
                    <div className="flex items-center gap-1">
                      <Image src={'/images/icones/pdf.png'} alt="logo" width={0} height={0} layout="responsive" className="w-[32px!important]"/>
                      <span>0892973</span>
                    </div>
                  </td>
                  <td>
                    <span>Immeuble galerie présidentielle</span>
                  </td>
                  <td>
                    <span>Crispin Mugisho</span>
                  </td>
                  <td>
                    <span>Maria Lutumba </span>
                  </td>
                  <td>
                    <span>300$</span>
                  </td>
                  <td>
                    <span>12/03/2022</span>
                  </td>
                  <td>
                    <span>20/08/2023</span>
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
                    <div className="flex items-center gap-1">
                      <Image src={'/images/icones/pdf.png'} alt="logo" width={0} height={0} layout="responsive" className="w-[32px!important]"/>
                      <span>0892973</span>
                    </div>
                  </td>
                  <td>
                    <span>Immeuble galerie présidentielle</span>
                  </td>
                  <td>
                    <span>Crispin Mugisho</span>
                  </td>
                  <td>
                    <span>Maria Lutumba </span>
                  </td>
                  <td>
                    <span>300$</span>
                  </td>
                  <td>
                    <span>12/03/2022</span>
                  </td>
                  <td>
                    <span>20/08/2023</span>
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
                    <div className="flex items-center gap-1">
                      <Image src={'/images/icones/pdf.png'} alt="logo" width={0} height={0} layout="responsive" className="w-[32px!important]"/>
                      <span>0892973</span>
                    </div>
                  </td>
                  <td>
                    <span>Immeuble galerie présidentielle</span>
                  </td>
                  <td>
                    <span>Crispin Mugisho</span>
                  </td>
                  <td>
                    <span>Maria Lutumba </span>
                  </td>
                  <td>
                    <span>300$</span>
                  </td>
                  <td>
                    <span>12/03/2022</span>
                  </td>
                  <td>
                    <span>20/08/2023</span>
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
      </div>
    </div>
  );
};

export default TableContratBail;
