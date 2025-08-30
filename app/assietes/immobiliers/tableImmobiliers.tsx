import React from "react";
import { Card } from "@/components/ui/card";
import { Search, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectValue, SelectTrigger, SelectContent, SelectGroup, SelectLabel, SelectItem } from "@/components/ui/select";

const TableImmobiliers = () => {
  return (
    <div className="grid grid-cols-1">
      <div className="col-span-1">
        <Card className="rounded-[24px] shadow-[var(--boxShadowCard)!important] border-0 bg-bgCard lg:p-[18px]">
          <div className="grid grid-cols-12 gap-3 items-center">
            <div className="col-span-12 lg:col-span-5">
              <h2 className="font-semibold text-colorTitle">
                Liste des immobiliers
              </h2>
            </div>
            <div className="col-span-12 lg:col-span-7">
              <div className="flex lg:justify-end gap-2">
                <div className="block-selects flex border border-borderInput rounded-lg">
                    <Select>
                    <SelectTrigger className="w-[180px] shadow-none border-0 rounded-none border-r border-borderInput text-colorTitle">
                      <SelectValue placeholder="Nature"/>
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
                      <SelectValue placeholder="Rang"/>
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
                  <th>#</th>
                  <th>Dénommination</th>
                  <th>Nature</th>
                  <th>Usage</th>
                  <th>Rang</th>
                  <th>S. bâtie</th>
                  <th>S. non-bâtie</th>
                  <th>Statut</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <span>1</span>
                  </td>
                  <td>
                    <span>Immeuble galerie présidentielle</span>
                  </td>
                  <td>
                    <span>Appartement</span>
                  </td>
                  <td>
                    <span>Commercial</span>
                  </td>
                  <td>
                    <span>2ème</span>
                  </td>
                  <td>
                    <span>250 m2</span>
                  </td>
                  <td>
                    <span>150 m2</span>
                  </td>
                  <td>
                    <span className="inline-flex text-[#feb574] bg-[#feb47423] bg-opacity-50 text-xs font-medium p-1 px-2 rounded-md">
                        Declaré
                    </span>
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
                    <span>Immeuble galerie présidentielle</span>
                  </td>
                  <td>
                    <span>Appartement</span>
                  </td>
                  <td>
                    <span>Commercial</span>
                  </td>
                  <td>
                    <span>2ème</span>
                  </td>
                  <td>
                    <span>250 m2</span>
                  </td>
                  <td>
                    <span>150 m2</span>
                  </td>
                  <td>
                    <span className="inline-flex text-colorTitle bg-bgGray bg-opacity-50 text-xs font-medium p-1 px-2 rounded-md">
                        Identifié
                    </span>
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
                    <span>Immeuble galerie présidentielle</span>
                  </td>
                  <td>
                    <span>Appartement</span>
                  </td>
                  <td>
                    <span>Commercial</span>
                  </td>
                  <td>
                    <span>2ème</span>
                  </td>
                  <td>
                    <span>250 m2</span>
                  </td>
                  <td>
                    <span>150 m2</span>
                  </td>
                  <td>
                    <span className="inline-flex text-[#3cace1] bg-[#3cace123] bg-opacity-50 text-xs font-medium p-1 px-2 rounded-md">
                       Payé
                    </span>
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
                    <span>Immeuble galerie présidentielle</span>
                  </td>
                  <td>
                    <span>Appartement</span>
                  </td>
                  <td>
                    <span>Commercial</span>
                  </td>
                  <td>
                    <span>2ème</span>
                  </td>
                  <td>
                    <span>250 m2</span>
                  </td>
                  <td>
                    <span>150 m2</span>
                  </td>
                  <td>
                    <span className="inline-flex text-[#1abc9b] bg-[#1abc9b23] bg-opacity-50 text-xs font-medium p-1 px-2 rounded-md">
                       Appuré
                    </span>
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
                    <span>Immeuble galerie présidentielle</span>
                  </td>
                  <td>
                    <span>Appartement</span>
                  </td>
                  <td>
                    <span>Commercial</span>
                  </td>
                  <td>
                    <span>2ème</span>
                  </td>
                  <td>
                    <span>250 m2</span>
                  </td>
                  <td>
                    <span>150 m2</span>
                  </td>
                  <td>
                    <span className="inline-flex text-[#f848c7] bg-[#f848c723] bg-opacity-50 text-xs font-medium p-1 px-2 rounded-md">
                       MDD
                    </span>
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
                    <span>Immeuble galerie présidentielle</span>
                  </td>
                  <td>
                    <span>Appartement</span>
                  </td>
                  <td>
                    <span>Commercial</span>
                  </td>
                  <td>
                    <span>2ème</span>
                  </td>
                  <td>
                    <span>250 m2</span>
                  </td>
                  <td>
                    <span>150 m2</span>
                  </td>
                  <td>
                    <span className="inline-flex text-[#ff4343] bg-[#ff434323] bg-opacity-50 text-xs font-medium p-1 px-2 rounded-md">
                       MEP
                    </span>
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
                    <span>Immeuble galerie présidentielle</span>
                  </td>
                  <td>
                    <span>Appartement</span>
                  </td>
                  <td>
                    <span>Commercial</span>
                  </td>
                  <td>
                    <span>2ème</span>
                  </td>
                  <td>
                    <span>250 m2</span>
                  </td>
                  <td>
                    <span>150 m2</span>
                  </td>
                  <td>
                    <span className="inline-flex text-[#bb81f6] bg-[#bb81f623] bg-opacity-50 text-xs font-medium p-1 px-2 rounded-md">
                       MEP
                    </span>
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
                    <span>Immeuble galerie présidentielle</span>
                  </td>
                  <td>
                    <span>Appartement</span>
                  </td>
                  <td>
                    <span>Commercial</span>
                  </td>
                  <td>
                    <span>2ème</span>
                  </td>
                  <td>
                    <span>250 m2</span>
                  </td>
                  <td>
                    <span>150 m2</span>
                  </td>
                  <td>
                    <span className="inline-flex text-[#4567af] bg-[#4567af23] bg-opacity-50 text-xs font-medium p-1 px-2 rounded-md">
                       CC
                    </span>
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
                    <span>Immeuble galerie présidentielle</span>
                  </td>
                  <td>
                    <span>Appartement</span>
                  </td>
                  <td>
                    <span>Commercial</span>
                  </td>
                  <td>
                    <span>2ème</span>
                  </td>
                  <td>
                    <span>250 m2</span>
                  </td>
                  <td>
                    <span>150 m2</span>
                  </td>
                  <td>
                    <span className="inline-flex text-colorTitle bg-bgGray bg-opacity-50 text-xs font-medium p-1 px-2 rounded-md">
                        ATD
                    </span>
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

export default TableImmobiliers;
