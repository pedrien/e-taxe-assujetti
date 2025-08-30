import React from "react";
import { Card } from "@/components/ui/card";
import { Search, Eye, EllipsisVertical } from "lucide-react";
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

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Checkbox } from "@/components/ui/checkbox";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const TableImmobiliers = () => {
  return (
    <div className="grid grid-cols-1">
      <div className="col-span-1">
        <Tabs
          defaultValue="ident"
          className="w-full grid grid-cols-12 gap-3 lg:gap-4"
        >
          <div className="col-span-12 lg:col-span-3">
            <Card className="rounded-[24px] gap-3 shadow-[var(--boxShadowCard)!important] border-0 bg-bgCard lg:p-[18px]">
              <h2 className="font-semibold text-colorTitle">Opérations</h2>
              <TabsList className="flex flex-col w-full h-auto p-0 lg:bg-transparent lg:items-start gap-2">
                <TabsTrigger
                  value="ident"
                  className="w-full justify-start data-[state=active]:bg-[#2d9dd129] data-[state=active]:text-[#2d9dd1] data-[state=active]:shadow-none text-colorMuted hover:text-colorTitle cursor-pointer"
                >
                  <div className="flex items-center justify-between w-full">
                    Indetifiés
                    <span className="text-xs">10</span>
                  </div>
                </TabsTrigger>
                <TabsTrigger
                  value="decl"
                  className="w-full justify-start data-[state=active]:bg-[#2d9dd129] data-[state=active]:text-[#2d9dd1] data-[state=active]:shadow-none text-colorMuted hover:text-colorTitle cursor-pointer"
                >
                  <div className="flex items-center justify-between w-full">
                    Declarés
                    <span className="text-xs">10</span>
                  </div>
                </TabsTrigger>
                <TabsTrigger
                  value="pay"
                  className="w-full justify-start data-[state=active]:bg-[#2d9dd129] data-[state=active]:text-[#2d9dd1] data-[state=active]:shadow-none text-colorMuted hover:text-colorTitle cursor-pointer"
                >
                  <div className="flex items-center justify-between w-full">
                    Payés
                    <span className="text-xs">8</span>
                  </div>
                </TabsTrigger>
                <TabsTrigger
                  value="app"
                  className="w-full justify-start data-[state=active]:bg-[#2d9dd129] data-[state=active]:text-[#2d9dd1] data-[state=active]:shadow-none text-colorMuted hover:text-colorTitle cursor-pointer"
                >
                  <div className="flex items-center justify-between w-full">
                    Appurés
                    <span className="text-xs">0</span>
                  </div>
                </TabsTrigger>
                <TabsTrigger
                  value="imp"
                  className="w-full justify-start data-[state=active]:bg-[#2d9dd129] data-[state=active]:text-[#2d9dd1] data-[state=active]:shadow-none text-colorMuted hover:text-colorTitle cursor-pointer"
                >
                  <div className="flex items-center justify-between w-full">
                    Imprimés des valeurs
                    <span className="text-xs">10</span>
                  </div>
                </TabsTrigger>
                <TabsTrigger
                  value="dd"
                  className="w-full justify-start data-[state=active]:bg-[#2d9dd129] data-[state=active]:text-[#2d9dd1] data-[state=active]:shadow-none text-colorMuted hover:text-colorTitle cursor-pointer"
                >
                  <div className="flex items-center justify-between w-full">
                    Défauts en déclaration
                    <span className="text-xs">10</span>
                  </div>
                </TabsTrigger>
                <TabsTrigger
                  value="dp"
                  className="w-full justify-start data-[state=active]:bg-[#2d9dd129] data-[state=active]:text-[#2d9dd1] data-[state=active]:shadow-none text-colorMuted hover:text-colorTitle cursor-pointer"
                >
                  <div className="flex items-center justify-between w-full">
                    Défauts de paiement
                    <span className="text-xs">10</span>
                  </div>
                </TabsTrigger>
                <TabsTrigger
                  value="fpc"
                  className="w-full justify-start data-[state=active]:bg-[#2d9dd129] data-[state=active]:text-[#2d9dd1] data-[state=active]:shadow-none text-colorMuted hover:text-colorTitle cursor-pointer"
                >
                  <div className="flex items-center justify-between w-full">
                    FPC
                    <span className="text-xs">10</span>
                  </div>
                </TabsTrigger>
                <TabsTrigger
                  value="amr"
                  className="w-full justify-start data-[state=active]:bg-[#2d9dd129] data-[state=active]:text-[#2d9dd1] data-[state=active]:shadow-none text-colorMuted hover:text-colorTitle cursor-pointer"
                >
                  <div className="flex items-center justify-between w-full">
                    AMR
                    <span className="text-xs">10</span>
                  </div>
                </TabsTrigger>
                <TabsTrigger
                  value="pour"
                  className="w-full justify-start data-[state=active]:bg-[#2d9dd129] data-[state=active]:text-[#2d9dd1] data-[state=active]:shadow-none text-colorMuted hover:text-colorTitle cursor-pointer"
                >
                  <div className="flex items-center justify-between w-full">
                    Poursuites
                    <span className="text-xs">10</span>
                  </div>
                </TabsTrigger>
                <TabsTrigger
                  value="cc"
                  className="w-full justify-start data-[state=active]:bg-[#2d9dd129] data-[state=active]:text-[#2d9dd1] data-[state=active]:shadow-none text-colorMuted hover:text-colorTitle cursor-pointer"
                >
                  <div className="flex items-center justify-between w-full">
                    Contrainte et commandement
                    <span className="text-xs">10</span>
                  </div>
                </TabsTrigger>
                <TabsTrigger
                  value="adt"
                  className="w-full justify-start data-[state=active]:bg-[#2d9dd129] data-[state=active]:text-[#2d9dd1] data-[state=active]:shadow-none text-colorMuted hover:text-colorTitle cursor-pointer"
                >
                  <div className="flex items-center justify-between w-full">
                    ATD
                    <span className="text-xs">10</span>
                  </div>
                </TabsTrigger>
                <TabsTrigger
                  value="con"
                  className="w-full justify-start data-[state=active]:bg-[#2d9dd129] data-[state=active]:text-[#2d9dd1] data-[state=active]:shadow-none text-colorMuted hover:text-colorTitle cursor-pointer"
                >
                  <div className="flex items-center justify-between w-full">
                    Contentieux
                    <span className="text-xs">10</span>
                  </div>
                </TabsTrigger>
                <TabsTrigger
                  value="recl"
                  className="w-full justify-start data-[state=active]:bg-[#2d9dd129] data-[state=active]:text-[#2d9dd1] data-[state=active]:shadow-none text-colorMuted hover:text-colorTitle cursor-pointer"
                >
                  <div className="flex items-center justify-between w-full">
                    reclamations
                    <span className="text-xs">10</span>
                  </div>
                </TabsTrigger>
              </TabsList>
            </Card>
          </div>
          <div className="col-span-12 lg:col-span-9">
            <TabsContent value="ident">
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
                          <SelectTrigger className="w-[180px] shadow-none border-0 rounded-none  text-colorTitle">
                            <SelectValue placeholder="Nature" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectGroup>
                              <SelectLabel>Nature</SelectLabel>
                              <SelectItem value="apple">Apple</SelectItem>
                              <SelectItem value="banana">Banana</SelectItem>
                              <SelectItem value="blueberry">
                                Blueberry
                              </SelectItem>
                              <SelectItem value="grapes">Grapes</SelectItem>
                              <SelectItem value="pineapple">
                                Pineapple
                              </SelectItem>
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
                        <th>
                          <Checkbox className="shadow-none data-[state=checked]:bg-primaryColor data-[state=checked]:border-primaryColor" />
                        </th>
                        <th>NIA</th>
                        <th>Dénommination</th>
                        <th>Nature</th>
                        <th>Usage</th>
                        <th>Rang</th>
                        <th>S. bâtie</th>
                        <th>S. non-bâtie</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>
                          <Checkbox className="shadow-none data-[state=checked]:bg-primaryColor data-[state=checked]:border-primaryColor" />
                        </td>
                        <td>
                          <span>2783730092</span>
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
                          <div className="flex items-center gap-2">
                            <Button className="cursor-pointer shadow-none bg-transparent  text-primaryColor  hover:bg-primaryColor hover:text-white text-xs h-auto py-2">
                              Déclarer
                            </Button>
                            <DropdownMenu>
                              <DropdownMenuTrigger className="cursor-pointer bg-bgGray text-colorTitle p-0 w-[28px] flex items-center justify-center rounded-lg h-[28px] hover:bg-[#07192b] hover:text-white">
                                <EllipsisVertical size={18}></EllipsisVertical>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent>
                                <DropdownMenuLabel className="text-colorMuted text-xs">
                                  Actions
                                </DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem className="text-sm text-colorTitle">
                                  Afficher
                                </DropdownMenuItem>
                                <DropdownMenuItem className="text-sm text-colorTitle">
                                  Modifier
                                </DropdownMenuItem>
                                <DropdownMenuItem className="text-sm text-colorTitle">
                                  Supprimer
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </Card>
            </TabsContent>
            <TabsContent value="password">
              Change your password here.
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </div>
  );
};

export default TableImmobiliers;
