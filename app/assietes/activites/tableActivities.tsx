import React from "react";
import { Card } from "@/components/ui/card";
import { Search,  EllipsisVertical } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import {
  Select,
  SelectValue,
  SelectTrigger,
  SelectContent,
  SelectGroup,
  SelectLabel,
  SelectItem,
} from "@/components/ui/select";

import { Checkbox } from "@/components/ui/checkbox";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const TableActivities = () => {
  // États pour gérer les checkboxes de chaque onglet
  const [checkedItems, setCheckedItems] = useState<{ [key: string]: string[] }>(
    {
      ident: [],
      decl: [],
      pay: [],
      app: [],
      imp: [],
      dd: [],
      dp: [],
      fpc: [],
      amr: [],
      pour: [],
      cc: [],
      adt: [],
      con: [],
      recl: [],
    }
  );
  // Fonction pour gérer la sélection/désélection des checkboxes
  const handleCheckboxChange = (
    tabKey: string,
    itemId: string,
    checked: boolean
  ) => {
    setCheckedItems((prev) => ({
      ...prev,
      [tabKey]: checked
        ? [...prev[tabKey], itemId]
        : prev[tabKey].filter((id) => id !== itemId),
    }));
  };

  // Fonction pour gérer la sélection/désélection de tous les éléments
  const handleSelectAll = (
    tabKey: string,
    allItemIds: string[],
    checked: boolean
  ) => {
    setCheckedItems((prev) => ({
      ...prev,
      [tabKey]: checked ? allItemIds : [],
    }));
  };

  // Fonction pour appurer les éléments sélectionnés
  const handleAppurer = (tabKey: string) => {
    const selectedItems = checkedItems[tabKey];
    console.log(
      `Appurer les éléments sélectionnés pour ${tabKey}:`,
      selectedItems
    );
    // Ici vous pouvez ajouter la logique pour appurer les éléments
    // Par exemple, appeler une API ou mettre à jour l'état
  };

  // Fonction utilitaire pour créer le bouton Appurer
  const renderAppurerButton = (tabKey: string) => {
    if (checkedItems[tabKey].length > 0) {
      return (
        <Button
          onClick={() => handleAppurer(tabKey)}
          className="bg-primaryColor hover:bg-primaryColor/90 rounded-lg text-white text-xs h-auto py-2 px-4"
        >
          Appurer ({checkedItems[tabKey].length})
        </Button>
      );
    }
    return null;
  };

  // Fonction utilitaire pour créer les checkboxes
  const renderCheckbox = (
    tabKey: string,
    itemIdsOrOne: string | string[],
    isHeader: boolean = false
  ) => {
    if (isHeader) {
      const allIds = Array.isArray(itemIdsOrOne)
        ? itemIdsOrOne
        : [itemIdsOrOne];
      const allSelected =
        allIds.length > 0 && checkedItems[tabKey].length === allIds.length;
      return (
        <Checkbox
          className="shadow-none w-[18px] h-[18px] cursor-pointer data-[state=checked]:bg-[#494be3] data-[state=checked]:border-[#494be3]"
          checked={allSelected}
          onCheckedChange={(checked) =>
            handleSelectAll(tabKey, allIds, checked as boolean)
          }
        />
      );
    }
    const itemId = itemIdsOrOne as string;
    return (
      <Checkbox
        className="shadow-none w-[18px] h-[18px] cursor-pointer data-[state=checked]:bg-[#494be3] data-[state=checked]:border-[#494be3]"
        checked={checkedItems[tabKey].includes(itemId)}
        onCheckedChange={(checked) =>
          handleCheckboxChange(tabKey, itemId, checked as boolean)
        }
      />
    );
  };
  const identItems = [
    {
      id: "2783730092",
      typeActive: "Commercial",
      dimension: "Petit",
      activitePrinc: "Grossiste",
      nature: "Restaurant",
      denimination: "Kin Resto",
      commune: "Ngaliema",
    },
    {
      id: "2783730092-2",
      typeActive: "Commercial",
      dimension: "Petit",
      activitePrinc: "Grossiste",
      nature: "Restaurant",
      denimination: "Kin Resto",
      commune: "Ngaliema",
    },
  ];
  const declItems = [
    {
      id: "2783730092",
      typeActive: "Commercial",
      dimension: "Petit",
      activitePrinc: "Grossiste",
      nature: "Restaurant",
      denimination: "Kin Resto",
      commune: "Ngaliema",
    },
    {
      id: "2783730092-2",
      typeActive: "Commercial",
      dimension: "Petit",
      activitePrinc: "Grossiste",
      nature: "Restaurant",
      denimination: "Kin Resto",
      commune: "Ngaliema",
    },
  ];
  const payItems = [
    {
      id: "2783730092",
      typeActive: "Commercial",
      dimension: "Petit",
      activitePrinc: "Grossiste",
      nature: "Restaurant",
      denimination: "Kin Resto",
      commune: "Ngaliema",
    },
    {
      id: "2783730092-2",
      typeActive: "Commercial",
      dimension: "Petit",
      activitePrinc: "Grossiste",
      nature: "Restaurant",
      denimination: "Kin Resto",
      commune: "Ngaliema",
    },
  ];
  const appItems = [
    {
      id: "2783730092",
      typeActive: "Commercial",
      dimension: "Petit",
      activitePrinc: "Grossiste",
      nature: "Restaurant",
      denimination: "Kin Resto",
      commune: "Ngaliema",
    },
    {
      id: "2783730092-2",
      typeActive: "Commercial",
      dimension: "Petit",
      activitePrinc: "Grossiste",
      nature: "Restaurant",
      denimination: "Kin Resto",
      commune: "Ngaliema",
    },
  ];
  const impItems = [
    {
      id: "2783730092",
      typeActive: "Commercial",
      dimension: "Petit",
      activitePrinc: "Grossiste",
      nature: "Restaurant",
      denimination: "Kin Resto",
      commune: "Ngaliema",
    },
    {
      id: "2783730092-2",
      typeActive: "Commercial",
      dimension: "Petit",
      activitePrinc: "Grossiste",
      nature: "Restaurant",
      denimination: "Kin Resto",
      commune: "Ngaliema",
    },
  ];
  const ddItems = [
    {
      id: "2783730092",
      typeActive: "Commercial",
      dimension: "Petit",
      activitePrinc: "Grossiste",
      nature: "Restaurant",
      denimination: "Kin Resto",
      commune: "Ngaliema",
    },
    {
      id: "2783730092-2",
      typeActive: "Commercial",
      dimension: "Petit",
      activitePrinc: "Grossiste",
      nature: "Restaurant",
      denimination: "Kin Resto",
      commune: "Ngaliema",
    },
  ];
  const dpItems = [
    {
      id: "2783730092",
      typeActive: "Commercial",
      dimension: "Petit",
      activitePrinc: "Grossiste",
      nature: "Restaurant",
      denimination: "Kin Resto",
      commune: "Ngaliema",
    },
    {
      id: "2783730092-2",
      typeActive: "Commercial",
      dimension: "Petit",
      activitePrinc: "Grossiste",
      nature: "Restaurant",
      denimination: "Kin Resto",
      commune: "Ngaliema",
    },
  ];
  const fpcItems = [
    {
      id: "2783730092",
      typeActive: "Commercial",
      dimension: "Petit",
      activitePrinc: "Grossiste",
      nature: "Restaurant",
      denimination: "Kin Resto",
      commune: "Ngaliema",
    },
    {
      id: "2783730092-2",
      typeActive: "Commercial",
      dimension: "Petit",
      activitePrinc: "Grossiste",
      nature: "Restaurant",
      denimination: "Kin Resto",
      commune: "Ngaliema",
    },
  ];
  const amrItems = [
    {
      id: "2783730092",
      typeActive: "Commercial",
      dimension: "Petit",
      activitePrinc: "Grossiste",
      nature: "Restaurant",
      denimination: "Kin Resto",
      commune: "Ngaliema",
    },
    {
      id: "2783730092-2",
      typeActive: "Commercial",
      dimension: "Petit",
      activitePrinc: "Grossiste",
      nature: "Restaurant",
      denimination: "Kin Resto",
      commune: "Ngaliema",
    },
  ];
  const pourItems = [
    {
      id: "2783730092",
      typeActive: "Commercial",
      dimension: "Petit",
      activitePrinc: "Grossiste",
      nature: "Restaurant",
      denimination: "Kin Resto",
      commune: "Ngaliema",
    },
    {
      id: "2783730092-2",
      typeActive: "Commercial",
      dimension: "Petit",
      activitePrinc: "Grossiste",
      nature: "Restaurant",
      denimination: "Kin Resto",
      commune: "Ngaliema",
    },
  ];
  const ccItems = [
    {
      id: "2783730092",
      typeActive: "Commercial",
      dimension: "Petit",
      activitePrinc: "Grossiste",
      nature: "Restaurant",
      denimination: "Kin Resto",
      commune: "Ngaliema",
    },
    {
      id: "2783730092-2",
      typeActive: "Commercial",
      dimension: "Petit",
      activitePrinc: "Grossiste",
      nature: "Restaurant",
      denimination: "Kin Resto",
      commune: "Ngaliema",
    },
  ];
  const adtItems = [
    {
      id: "2783730092",
      typeActive: "Commercial",
      dimension: "Petit",
      activitePrinc: "Grossiste",
      nature: "Restaurant",
      denimination: "Kin Resto",
      commune: "Ngaliema",
    },
    {
      id: "2783730092-2",
      typeActive: "Commercial",
      dimension: "Petit",
      activitePrinc: "Grossiste",
      nature: "Restaurant",
      denimination: "Kin Resto",
      commune: "Ngaliema",
    },
  ];
  const conItems = [
    {
      id: "2783730092",
      typeActive: "Commercial",
      dimension: "Petit",
      activitePrinc: "Grossiste",
      nature: "Restaurant",
      denimination: "Kin Resto",
      commune: "Ngaliema",
    },
    {
      id: "2783730092-2",
      typeActive: "Commercial",
      dimension: "Petit",
      activitePrinc: "Grossiste",
      nature: "Restaurant",
      denimination: "Kin Resto",
      commune: "Ngaliema",
    },
  ];
  const reclItems = [
    {
      id: "2783730092",
      typeActive: "Commercial",
      dimension: "Petit",
      activitePrinc: "Grossiste",
      nature: "Restaurant",
      denimination: "Kin Resto",
      commune: "Ngaliema",
    },
    {
      id: "2783730092-2",
      typeActive: "Commercial",
      dimension: "Petit",
      activitePrinc: "Grossiste",
      nature: "Restaurant",
      denimination: "Kin Resto",
      commune: "Ngaliema",
    },
  ];
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
                  className="w-full justify-start data-[state=active]:bg-[#5f61e614] data-[state=active]:text-[#5f61e6] data-[state=active]:shadow-none text-colorMuted hover:text-colorTitle cursor-pointer"
                >
                  <div className="flex items-center justify-between w-full">
                    Identifiés
                    <span className="text-xs">10</span>
                  </div>
                </TabsTrigger>
                <TabsTrigger
                  value="decl"
                  className="w-full justify-start data-[state=active]:bg-[#5f61e614] data-[state=active]:text-[#5f61e6] data-[state=active]:shadow-none text-colorMuted hover:text-colorTitle cursor-pointer"
                >
                  <div className="flex items-center justify-between w-full">
                    Declarés
                    <span className="text-xs">10</span>
                  </div>
                </TabsTrigger>
                <TabsTrigger
                  value="pay"
                  className="w-full justify-start data-[state=active]:bg-[#5f61e614] data-[state=active]:text-[#5f61e6] data-[state=active]:shadow-none text-colorMuted hover:text-colorTitle cursor-pointer"
                >
                  <div className="flex items-center justify-between w-full">
                    Payés
                    <span className="text-xs">8</span>
                  </div>
                </TabsTrigger>
                <TabsTrigger
                  value="app"
                  className="w-full justify-start data-[state=active]:bg-[#5f61e614] data-[state=active]:text-[#5f61e6] data-[state=active]:shadow-none text-colorMuted hover:text-colorTitle cursor-pointer"
                >
                  <div className="flex items-center justify-between w-full">
                    Appurés
                    <span className="text-xs">0</span>
                  </div>
                </TabsTrigger>
                <TabsTrigger
                  value="imp"
                  className="w-full justify-start data-[state=active]:bg-[#5f61e614] data-[state=active]:text-[#5f61e6] data-[state=active]:shadow-none text-colorMuted hover:text-colorTitle cursor-pointer"
                >
                  <div className="flex items-center justify-between w-full">
                    Imprimés des valeurs
                    <span className="text-xs">10</span>
                  </div>
                </TabsTrigger>
                <TabsTrigger
                  value="dd"
                  className="w-full justify-start data-[state=active]:bg-[#5f61e614] data-[state=active]:text-[#5f61e6] data-[state=active]:shadow-none text-colorMuted hover:text-colorTitle cursor-pointer"
                >
                  <div className="flex items-center justify-between w-full">
                    Défauts en déclaration
                    <span className="text-xs">10</span>
                  </div>
                </TabsTrigger>
                <TabsTrigger
                  value="dp"
                  className="w-full justify-start data-[state=active]:bg-[#5f61e614] data-[state=active]:text-[#5f61e6] data-[state=active]:shadow-none text-colorMuted hover:text-colorTitle cursor-pointer"
                >
                  <div className="flex items-center justify-between w-full">
                    Défauts de paiement
                    <span className="text-xs">10</span>
                  </div>
                </TabsTrigger>
                <TabsTrigger
                  value="fpc"
                  className="w-full justify-start data-[state=active]:bg-[#5f61e614] data-[state=active]:text-[#5f61e6] data-[state=active]:shadow-none text-colorMuted hover:text-colorTitle cursor-pointer"
                >
                  <div className="flex items-center justify-between w-full">
                    FPC
                    <span className="text-xs">10</span>
                  </div>
                </TabsTrigger>
                <TabsTrigger
                  value="amr"
                  className="w-full justify-start data-[state=active]:bg-[#5f61e614] data-[state=active]:text-[#5f61e6] data-[state=active]:shadow-none text-colorMuted hover:text-colorTitle cursor-pointer"
                >
                  <div className="flex items-center justify-between w-full">
                    AMR
                    <span className="text-xs">10</span>
                  </div>
                </TabsTrigger>
                <TabsTrigger
                  value="pour"
                  className="w-full justify-start data-[state=active]:bg-[#5f61e614] data-[state=active]:text-[#5f61e6] data-[state=active]:shadow-none text-colorMuted hover:text-colorTitle cursor-pointer"
                >
                  <div className="flex items-center justify-between w-full">
                    Poursuites
                    <span className="text-xs">10</span>
                  </div>
                </TabsTrigger>
                <TabsTrigger
                  value="cc"
                  className="w-full justify-start data-[state=active]:bg-[#5f61e614] data-[state=active]:text-[#5f61e6] data-[state=active]:shadow-none text-colorMuted hover:text-colorTitle cursor-pointer"
                >
                  <div className="flex items-center justify-between w-full">
                    Contrainte et commandement
                    <span className="text-xs">10</span>
                  </div>
                </TabsTrigger>
                <TabsTrigger
                  value="adt"
                  className="w-full justify-start data-[state=active]:bg-[#5f61e614] data-[state=active]:text-[#5f61e6] data-[state=active]:shadow-none text-colorMuted hover:text-colorTitle cursor-pointer"
                >
                  <div className="flex items-center justify-between w-full">
                    ATD
                    <span className="text-xs">10</span>
                  </div>
                </TabsTrigger>
                <TabsTrigger
                  value="con"
                  className="w-full justify-start data-[state=active]:bg-[#5f61e614] data-[state=active]:text-[#5f61e6] data-[state=active]:shadow-none text-colorMuted hover:text-colorTitle cursor-pointer"
                >
                  <div className="flex items-center justify-between w-full">
                    Contentieux
                    <span className="text-xs">10</span>
                  </div>
                </TabsTrigger>
                <TabsTrigger
                  value="recl"
                  className="w-full justify-start data-[state=active]:bg-[#5f61e614] data-[state=active]:text-[#5f61e6] data-[state=active]:shadow-none text-colorMuted hover:text-colorTitle cursor-pointer"
                >
                  <div className="flex items-center justify-between w-full">
                    Reclamations
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
                  <div className="col-span-12 lg:col-span-4">
                    <div className="block-search w-[320px] max-w-full relative flex items-center">
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
                  <div className="col-span-12 lg:col-span-8">
                    <div className="flex lg:justify-end gap-2">
                      {renderAppurerButton("ident")}
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
                        <Select>
                          <SelectTrigger className="w-[180px] shadow-none border-0 rounded-none border-r border-borderInput text-colorTitle">
                            <SelectValue placeholder="Rang" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectGroup>
                              <SelectLabel>Rang</SelectLabel>
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
                        <Select>
                          <SelectTrigger className="w-[180px] shadow-none border-0 rounded-none">
                            <SelectValue placeholder="Statut" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectGroup>
                              <SelectLabel>Statut</SelectLabel>
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
                    </div>
                  </div>
                </div>
                <div className="overflow-x-auto">
                  <table className="table w-full table-bordered">
                    <thead>
                      <tr>
                        <th>
                          {renderCheckbox(
                            "ident",
                            identItems.map((i) => i.id),
                            true
                          )}
                        </th>
                        <th>Type d&apos;activité</th>
                        <th>Dimension</th>
                        <th>Activité principale</th>
                        <th>Nature</th>
                        <th>Dénomination</th>
                        <th>Commune</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {identItems.map((row) => (
                        <tr key={row.id}>
                          <td>{renderCheckbox("ident", row.id)}</td>
                          <td>
                            <span>{row.typeActive}</span>
                          </td>
                          <td>
                            <span>{row.dimension}</span>
                          </td>
                          <td>
                            <span>{row.activitePrinc}</span>
                          </td>
                          <td>
                            <span>{row.nature}</span>
                          </td>
                          <td>
                            <span>{row.denimination}</span>
                          </td>
                          <td>
                            <span>{row.commune}</span>
                          </td>
                          <td>
                            <div className="flex items-center gap-3">
                              <Button className="cursor-pointer shadow-none bg-transparent  text-[#5f61e6]  hover:bg-transparent hover:text-[#494be3] text-md h-auto p-0">
                                Déclarer
                              </Button>
                              <DropdownMenu>
                                <DropdownMenuTrigger className="cursor-pointer bg-bgGray text-colorTitle p-0 w-[28px] flex items-center justify-center rounded-lg h-[28px] hover:bg-[#07192b] hover:text-white">
                                  <EllipsisVertical
                                    size={18}
                                  ></EllipsisVertical>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent className="border-0 shadow-[var(--boxShadowCard)!important]">
                                  <DropdownMenuLabel className="text-colorMuted text-xs opacity-70">
                                    Actions
                                  </DropdownMenuLabel>
                                  <DropdownMenuSeparator />
                                  <DropdownMenuItem className="text-sm text-colorMuted">
                                    Afficher
                                  </DropdownMenuItem>
                                  <DropdownMenuItem className="text-sm text-colorMuted">
                                    Modifier
                                  </DropdownMenuItem>
                                  <DropdownMenuItem className="text-sm text-colorMuted">
                                    Supprimer
                                  </DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </Card>
            </TabsContent>
            <TabsContent value="decl">
              <Card className="rounded-[24px] shadow-[var(--boxShadowCard)!important] border-0 bg-bgCard lg:p-[18px]">
                <div className="grid grid-cols-12 gap-3 items-center">
                  <div className="col-span-12 lg:col-span-4">
                    <div className="block-search w-[320px] max-w-full relative flex items-center">
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
                  <div className="col-span-12 lg:col-span-8">
                    <div className="flex lg:justify-end gap-2">
                      {renderAppurerButton("decl")}
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
                        <Select>
                          <SelectTrigger className="w-[180px] shadow-none border-0 rounded-none border-r border-borderInput text-colorTitle">
                            <SelectValue placeholder="Rang" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectGroup>
                              <SelectLabel>Rang</SelectLabel>
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
                        <Select>
                          <SelectTrigger className="w-[180px] shadow-none border-0 rounded-none">
                            <SelectValue placeholder="Statut" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectGroup>
                              <SelectLabel>Statut</SelectLabel>
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
                    </div>
                  </div>
                </div>
                <div className="overflow-x-auto">
                  <table className="table w-full table-bordered">
                    <thead>
                      <tr>
                        <th>
                          {renderCheckbox(
                            "decl",
                            declItems.map((i) => i.id),
                            true
                          )}
                        </th>
                        <th>Type d&apos;activité</th>
                        <th>Dimension</th>
                        <th>Activité principale</th>
                        <th>Nature</th>
                        <th>Dénomination</th>
                        <th>Commune</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {declItems.map((row) => (
                        <tr key={row.id}>
                          <td>{renderCheckbox("decl", row.id)}</td>
                          <td>
                            <span>{row.typeActive}</span>
                          </td>
                          <td>
                            <span>{row.dimension}</span>
                          </td>
                          <td>
                            <span>{row.activitePrinc}</span>
                          </td>
                          <td>
                            <span>{row.nature}</span>
                          </td>
                          <td>
                            <span>{row.denimination}</span>
                          </td>
                          <td>
                            <span>{row.commune}</span>
                          </td>
                          <td>
                            <div className="flex items-center gap-3">
                              <Button className="cursor-pointer shadow-none bg-transparent  text-[#5f61e6]  hover:bg-transparent hover:text-[#494be3] text-md h-auto p-0">
                                Déclarer
                              </Button>
                              <DropdownMenu>
                                <DropdownMenuTrigger className="cursor-pointer bg-bgGray text-colorTitle p-0 w-[28px] flex items-center justify-center rounded-lg h-[28px] hover:bg-[#07192b] hover:text-white">
                                  <EllipsisVertical
                                    size={18}
                                  ></EllipsisVertical>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent className="border-0 shadow-[var(--boxShadowCard)!important]">
                                  <DropdownMenuLabel className="text-colorMuted text-xs opacity-70">
                                    Actions
                                  </DropdownMenuLabel>
                                  <DropdownMenuSeparator />
                                  <DropdownMenuItem className="text-sm text-colorMuted">
                                    Afficher
                                  </DropdownMenuItem>
                                  <DropdownMenuItem className="text-sm text-colorMuted">
                                    Modifier
                                  </DropdownMenuItem>
                                  <DropdownMenuItem className="text-sm text-colorMuted">
                                    Supprimer
                                  </DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </Card>
            </TabsContent>
            <TabsContent value="pay">
              <Card className="rounded-[24px] shadow-[var(--boxShadowCard)!important] border-0 bg-bgCard lg:p-[18px]">
                <div className="grid grid-cols-12 gap-3 items-center">
                  <div className="col-span-12 lg:col-span-4">
                    <div className="block-search w-[320px] max-w-full relative flex items-center">
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
                  <div className="col-span-12 lg:col-span-8">
                    <div className="flex lg:justify-end gap-2">
                      {renderAppurerButton("pay")}
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
                        <Select>
                          <SelectTrigger className="w-[180px] shadow-none border-0 rounded-none border-r border-borderInput text-colorTitle">
                            <SelectValue placeholder="Rang" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectGroup>
                              <SelectLabel>Rang</SelectLabel>
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
                        <Select>
                          <SelectTrigger className="w-[180px] shadow-none border-0 rounded-none">
                            <SelectValue placeholder="Statut" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectGroup>
                              <SelectLabel>Statut</SelectLabel>
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
                    </div>
                  </div>
                </div>
                <div className="overflow-x-auto">
                  <table className="table w-full table-bordered">
                    <thead>
                      <tr>
                        <th>
                          {renderCheckbox(
                            "pay",
                            payItems.map((i) => i.id),
                            true
                          )}
                        </th>
                        <th>Type d&apos;activité</th>
                        <th>Dimension</th>
                        <th>Activité principale</th>
                        <th>Nature</th>
                        <th>Dénomination</th>
                        <th>Commune</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {payItems.map((row) => (
                        <tr key={row.id}>
                          <td>{renderCheckbox("pay", row.id)}</td>
                          <td>
                            <span>{row.typeActive}</span>
                          </td>
                          <td>
                            <span>{row.dimension}</span>
                          </td>
                          <td>
                            <span>{row.activitePrinc}</span>
                          </td>
                          <td>
                            <span>{row.nature}</span>
                          </td>
                          <td>
                            <span>{row.denimination}</span>
                          </td>
                          <td>
                            <span>{row.commune}</span>
                          </td>
                          <td>
                            <div className="flex items-center gap-3">
                              <Button className="cursor-pointer shadow-none bg-transparent  text-[#5f61e6]  hover:bg-transparent hover:text-[#494be3] text-md h-auto p-0">
                                Déclarer
                              </Button>
                              <DropdownMenu>
                                <DropdownMenuTrigger className="cursor-pointer bg-bgGray text-colorTitle p-0 w-[28px] flex items-center justify-center rounded-lg h-[28px] hover:bg-[#07192b] hover:text-white">
                                  <EllipsisVertical
                                    size={18}
                                  ></EllipsisVertical>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent className="border-0 shadow-[var(--boxShadowCard)!important]">
                                  <DropdownMenuLabel className="text-colorMuted text-xs opacity-70">
                                    Actions
                                  </DropdownMenuLabel>
                                  <DropdownMenuSeparator />
                                  <DropdownMenuItem className="text-sm text-colorMuted">
                                    Afficher
                                  </DropdownMenuItem>
                                  <DropdownMenuItem className="text-sm text-colorMuted">
                                    Modifier
                                  </DropdownMenuItem>
                                  <DropdownMenuItem className="text-sm text-colorMuted">
                                    Supprimer
                                  </DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </Card>
            </TabsContent>
            <TabsContent value="app">
              <Card className="rounded-[24px] shadow-[var(--boxShadowCard)!important] border-0 bg-bgCard lg:p-[18px]">
                <div className="grid grid-cols-12 gap-3 items-center">
                  <div className="col-span-12 lg:col-span-4">
                    <div className="block-search w-[320px] max-w-full relative flex items-center">
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
                  <div className="col-span-12 lg:col-span-8">
                    <div className="flex lg:justify-end gap-2">
                      {renderAppurerButton("app")}
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
                        <Select>
                          <SelectTrigger className="w-[180px] shadow-none border-0 rounded-none border-r border-borderInput text-colorTitle">
                            <SelectValue placeholder="Rang" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectGroup>
                              <SelectLabel>Rang</SelectLabel>
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
                        <Select>
                          <SelectTrigger className="w-[180px] shadow-none border-0 rounded-none">
                            <SelectValue placeholder="Statut" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectGroup>
                              <SelectLabel>Statut</SelectLabel>
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
                    </div>
                  </div>
                </div>
                <div className="overflow-x-auto">
                  <table className="table w-full table-bordered">
                    <thead>
                      <tr>
                        <th>
                          {renderCheckbox(
                            "app",
                            appItems.map((i) => i.id),
                            true
                          )}
                        </th>
                        <th>Type d&apos;activité</th>
                        <th>Dimension</th>
                        <th>Activité principale</th>
                        <th>Nature</th>
                        <th>Dénomination</th>
                        <th>Commune</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {appItems.map((row) => (
                        <tr key={row.id}>
                          <td>{renderCheckbox("app", row.id)}</td>
                          <td>
                            <span>{row.typeActive}</span>
                          </td>
                          <td>
                            <span>{row.dimension}</span>
                          </td>
                          <td>
                            <span>{row.activitePrinc}</span>
                          </td>
                          <td>
                            <span>{row.nature}</span>
                          </td>
                          <td>
                            <span>{row.denimination}</span>
                          </td>
                          <td>
                            <span>{row.commune}</span>
                          </td>
                          <td>
                            <div className="flex items-center gap-3">
                              <Button className="cursor-pointer shadow-none bg-transparent  text-[#5f61e6]  hover:bg-transparent hover:text-[#494be3] text-md h-auto p-0">
                                Déclarer
                              </Button>
                              <DropdownMenu>
                                <DropdownMenuTrigger className="cursor-pointer bg-bgGray text-colorTitle p-0 w-[28px] flex items-center justify-center rounded-lg h-[28px] hover:bg-[#07192b] hover:text-white">
                                  <EllipsisVertical
                                    size={18}
                                  ></EllipsisVertical>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent className="border-0 shadow-[var(--boxShadowCard)!important]">
                                  <DropdownMenuLabel className="text-colorMuted text-xs opacity-70">
                                    Actions
                                  </DropdownMenuLabel>
                                  <DropdownMenuSeparator />
                                  <DropdownMenuItem className="text-sm text-colorMuted">
                                    Afficher
                                  </DropdownMenuItem>
                                  <DropdownMenuItem className="text-sm text-colorMuted">
                                    Modifier
                                  </DropdownMenuItem>
                                  <DropdownMenuItem className="text-sm text-colorMuted">
                                    Supprimer
                                  </DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </Card>
            </TabsContent>
            <TabsContent value="imp">
              <Card className="rounded-[24px] shadow-[var(--boxShadowCard)!important] border-0 bg-bgCard lg:p-[18px]">
                <div className="grid grid-cols-12 gap-3 items-center">
                  <div className="col-span-12 lg:col-span-4">
                    <div className="block-search w-[320px] max-w-full relative flex items-center">
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
                  <div className="col-span-12 lg:col-span-8">
                    <div className="flex lg:justify-end gap-2">
                      {renderAppurerButton("imp")}
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
                        <Select>
                          <SelectTrigger className="w-[180px] shadow-none border-0 rounded-none border-r border-borderInput text-colorTitle">
                            <SelectValue placeholder="Rang" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectGroup>
                              <SelectLabel>Rang</SelectLabel>
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
                        <Select>
                          <SelectTrigger className="w-[180px] shadow-none border-0 rounded-none">
                            <SelectValue placeholder="Statut" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectGroup>
                              <SelectLabel>Statut</SelectLabel>
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
                    </div>
                  </div>
                </div>
                <div className="overflow-x-auto">
                  <table className="table w-full table-bordered">
                    <thead>
                      <tr>
                        <th>
                          {renderCheckbox(
                            "imp",
                            impItems.map((i) => i.id),
                            true
                          )}
                        </th>
                        <th>Type d&apos;activité</th>
                        <th>Dimension</th>
                        <th>Activité principale</th>
                        <th>Nature</th>
                        <th>Dénomination</th>
                        <th>Commune</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {impItems.map((row) => (
                        <tr key={row.id}>
                          <td>{renderCheckbox("imp", row.id)}</td>
                          <td>
                            <span>{row.typeActive}</span>
                          </td>
                          <td>
                            <span>{row.dimension}</span>
                          </td>
                          <td>
                            <span>{row.activitePrinc}</span>
                          </td>
                          <td>
                            <span>{row.nature}</span>
                          </td>
                          <td>
                            <span>{row.denimination}</span>
                          </td>
                          <td>
                            <span>{row.commune}</span>
                          </td>
                          <td>
                            <div className="flex items-center gap-3">
                              <Button className="cursor-pointer shadow-none bg-transparent  text-[#5f61e6]  hover:bg-transparent hover:text-[#494be3] text-md h-auto p-0">
                                Déclarer
                              </Button>
                              <DropdownMenu>
                                <DropdownMenuTrigger className="cursor-pointer bg-bgGray text-colorTitle p-0 w-[28px] flex items-center justify-center rounded-lg h-[28px] hover:bg-[#07192b] hover:text-white">
                                  <EllipsisVertical
                                    size={18}
                                  ></EllipsisVertical>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent className="border-0 shadow-[var(--boxShadowCard)!important]">
                                  <DropdownMenuLabel className="text-colorMuted text-xs opacity-70">
                                    Actions
                                  </DropdownMenuLabel>
                                  <DropdownMenuSeparator />
                                  <DropdownMenuItem className="text-sm text-colorMuted">
                                    Afficher
                                  </DropdownMenuItem>
                                  <DropdownMenuItem className="text-sm text-colorMuted">
                                    Modifier
                                  </DropdownMenuItem>
                                  <DropdownMenuItem className="text-sm text-colorMuted">
                                    Supprimer
                                  </DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </Card>
            </TabsContent>
            <TabsContent value="dd">
              <Card className="rounded-[24px] shadow-[var(--boxShadowCard)!important] border-0 bg-bgCard lg:p-[18px]">
                <div className="grid grid-cols-12 gap-3 items-center">
                  <div className="col-span-12 lg:col-span-4">
                    <div className="block-search w-[320px] max-w-full relative flex items-center">
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
                  <div className="col-span-12 lg:col-span-8">
                    <div className="flex lg:justify-end gap-2">
                      {renderAppurerButton("dd")}
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
                        <Select>
                          <SelectTrigger className="w-[180px] shadow-none border-0 rounded-none border-r border-borderInput text-colorTitle">
                            <SelectValue placeholder="Rang" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectGroup>
                              <SelectLabel>Rang</SelectLabel>
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
                        <Select>
                          <SelectTrigger className="w-[180px] shadow-none border-0 rounded-none">
                            <SelectValue placeholder="Statut" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectGroup>
                              <SelectLabel>Statut</SelectLabel>
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
                    </div>
                  </div>
                </div>
                <div className="overflow-x-auto">
                  <table className="table w-full table-bordered">
                    <thead>
                      <tr>
                        <th>
                          {renderCheckbox(
                            "dd",
                            ddItems.map((i) => i.id),
                            true
                          )}
                        </th>
                        <th>Type d&apos;activité</th>
                        <th>Dimension</th>
                        <th>Activité principale</th>
                        <th>Nature</th>
                        <th>Dénomination</th>
                        <th>Commune</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {ddItems.map((row) => (
                        <tr key={row.id}>
                          <td>{renderCheckbox("dd", row.id)}</td>
                          <td>
                            <span>{row.typeActive}</span>
                          </td>
                          <td>
                            <span>{row.dimension}</span>
                          </td>
                          <td>
                            <span>{row.activitePrinc}</span>
                          </td>
                          <td>
                            <span>{row.nature}</span>
                          </td>
                          <td>
                            <span>{row.denimination}</span>
                          </td>
                          <td>
                            <span>{row.commune}</span>
                          </td>
                          <td>
                            <div className="flex items-center gap-3">
                              <Button className="cursor-pointer shadow-none bg-transparent  text-[#5f61e6]  hover:bg-transparent hover:text-[#494be3] text-md h-auto p-0">
                                Déclarer
                              </Button>
                              <DropdownMenu>
                                <DropdownMenuTrigger className="cursor-pointer bg-bgGray text-colorTitle p-0 w-[28px] flex items-center justify-center rounded-lg h-[28px] hover:bg-[#07192b] hover:text-white">
                                  <EllipsisVertical
                                    size={18}
                                  ></EllipsisVertical>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent className="border-0 shadow-[var(--boxShadowCard)!important]">
                                  <DropdownMenuLabel className="text-colorMuted text-xs opacity-70">
                                    Actions
                                  </DropdownMenuLabel>
                                  <DropdownMenuSeparator />
                                  <DropdownMenuItem className="text-sm text-colorMuted">
                                    Afficher
                                  </DropdownMenuItem>
                                  <DropdownMenuItem className="text-sm text-colorMuted">
                                    Modifier
                                  </DropdownMenuItem>
                                  <DropdownMenuItem className="text-sm text-colorMuted">
                                    Supprimer
                                  </DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </Card>
            </TabsContent>
            <TabsContent value="dp">
              <Card className="rounded-[24px] shadow-[var(--boxShadowCard)!important] border-0 bg-bgCard lg:p-[18px]">
                <div className="grid grid-cols-12 gap-3 items-center">
                  <div className="col-span-12 lg:col-span-4">
                    <div className="block-search w-[320px] max-w-full relative flex items-center">
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
                  <div className="col-span-12 lg:col-span-8">
                    <div className="flex lg:justify-end gap-2">
                      {renderAppurerButton("dp")}
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
                        <Select>
                          <SelectTrigger className="w-[180px] shadow-none border-0 rounded-none border-r border-borderInput text-colorTitle">
                            <SelectValue placeholder="Rang" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectGroup>
                              <SelectLabel>Rang</SelectLabel>
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
                        <Select>
                          <SelectTrigger className="w-[180px] shadow-none border-0 rounded-none">
                            <SelectValue placeholder="Statut" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectGroup>
                              <SelectLabel>Statut</SelectLabel>
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
                    </div>
                  </div>
                </div>
                <div className="overflow-x-auto">
                  <table className="table w-full table-bordered">
                    <thead>
                      <tr>
                        <th>
                          {renderCheckbox(
                            "dp",
                            dpItems.map((i) => i.id),
                            true
                          )}
                        </th>
                        <th>Type d&apos;activité</th>
                        <th>Dimension</th>
                        <th>Activité principale</th>
                        <th>Nature</th>
                        <th>Dénomination</th>
                        <th>Commune</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {dpItems.map((row) => (
                        <tr key={row.id}>
                          <td>{renderCheckbox("dp", row.id)}</td>
                          <td>
                            <span>{row.typeActive}</span>
                          </td>
                          <td>
                            <span>{row.dimension}</span>
                          </td>
                          <td>
                            <span>{row.activitePrinc}</span>
                          </td>
                          <td>
                            <span>{row.nature}</span>
                          </td>
                          <td>
                            <span>{row.denimination}</span>
                          </td>
                          <td>
                            <span>{row.commune}</span>
                          </td>
                          <td>
                            <div className="flex items-center gap-3">
                              <Button className="cursor-pointer shadow-none bg-transparent  text-[#5f61e6]  hover:bg-transparent hover:text-[#494be3] text-md h-auto p-0">
                                Déclarer
                              </Button>
                              <DropdownMenu>
                                <DropdownMenuTrigger className="cursor-pointer bg-bgGray text-colorTitle p-0 w-[28px] flex items-center justify-center rounded-lg h-[28px] hover:bg-[#07192b] hover:text-white">
                                  <EllipsisVertical
                                    size={18}
                                  ></EllipsisVertical>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent className="border-0 shadow-[var(--boxShadowCard)!important]">
                                  <DropdownMenuLabel className="text-colorMuted text-xs opacity-70">
                                    Actions
                                  </DropdownMenuLabel>
                                  <DropdownMenuSeparator />
                                  <DropdownMenuItem className="text-sm text-colorMuted">
                                    Afficher
                                  </DropdownMenuItem>
                                  <DropdownMenuItem className="text-sm text-colorMuted">
                                    Modifier
                                  </DropdownMenuItem>
                                  <DropdownMenuItem className="text-sm text-colorMuted">
                                    Supprimer
                                  </DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </Card>
            </TabsContent>
            <TabsContent value="fpc">
              <Card className="rounded-[24px] shadow-[var(--boxShadowCard)!important] border-0 bg-bgCard lg:p-[18px]">
                <div className="grid grid-cols-12 gap-3 items-center">
                  <div className="col-span-12 lg:col-span-4">
                    <div className="block-search w-[320px] max-w-full relative flex items-center">
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
                  <div className="col-span-12 lg:col-span-8">
                    <div className="flex lg:justify-end gap-2">
                      {renderAppurerButton("fpc")}
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
                        <Select>
                          <SelectTrigger className="w-[180px] shadow-none border-0 rounded-none border-r border-borderInput text-colorTitle">
                            <SelectValue placeholder="Rang" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectGroup>
                              <SelectLabel>Rang</SelectLabel>
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
                        <Select>
                          <SelectTrigger className="w-[180px] shadow-none border-0 rounded-none">
                            <SelectValue placeholder="Statut" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectGroup>
                              <SelectLabel>Statut</SelectLabel>
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
                    </div>
                  </div>
                </div>
                <div className="overflow-x-auto">
                  <table className="table w-full table-bordered">
                    <thead>
                      <tr>
                        <th>
                          {renderCheckbox(
                            "fpc",
                            fpcItems.map((i) => i.id),
                            true
                          )}
                        </th>
                        <th>Type d&apos;activité</th>
                        <th>Dimension</th>
                        <th>Activité principale</th>
                        <th>Nature</th>
                        <th>Dénomination</th>
                        <th>Commune</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {fpcItems.map((row) => (
                        <tr key={row.id}>
                          <td>{renderCheckbox("fpc", row.id)}</td>
                          <td>
                            <span>{row.typeActive}</span>
                          </td>
                          <td>
                            <span>{row.dimension}</span>
                          </td>
                          <td>
                            <span>{row.activitePrinc}</span>
                          </td>
                          <td>
                            <span>{row.nature}</span>
                          </td>
                          <td>
                            <span>{row.denimination}</span>
                          </td>
                          <td>
                            <span>{row.commune}</span>
                          </td>
                          <td>
                            <div className="flex items-center gap-3">
                              <Button className="cursor-pointer shadow-none bg-transparent  text-[#5f61e6]  hover:bg-transparent hover:text-[#494be3] text-md h-auto p-0">
                                Déclarer
                              </Button>
                              <DropdownMenu>
                                <DropdownMenuTrigger className="cursor-pointer bg-bgGray text-colorTitle p-0 w-[28px] flex items-center justify-center rounded-lg h-[28px] hover:bg-[#07192b] hover:text-white">
                                  <EllipsisVertical
                                    size={18}
                                  ></EllipsisVertical>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent className="border-0 shadow-[var(--boxShadowCard)!important]">
                                  <DropdownMenuLabel className="text-colorMuted text-xs opacity-70">
                                    Actions
                                  </DropdownMenuLabel>
                                  <DropdownMenuSeparator />
                                  <DropdownMenuItem className="text-sm text-colorMuted">
                                    Afficher
                                  </DropdownMenuItem>
                                  <DropdownMenuItem className="text-sm text-colorMuted">
                                    Modifier
                                  </DropdownMenuItem>
                                  <DropdownMenuItem className="text-sm text-colorMuted">
                                    Supprimer
                                  </DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </Card>
            </TabsContent>
            <TabsContent value="amr">
              <Card className="rounded-[24px] shadow-[var(--boxShadowCard)!important] border-0 bg-bgCard lg:p-[18px]">
                <div className="grid grid-cols-12 gap-3 items-center">
                  <div className="col-span-12 lg:col-span-4">
                    <div className="block-search w-[320px] max-w-full relative flex items-center">
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
                  <div className="col-span-12 lg:col-span-8">
                    <div className="flex lg:justify-end gap-2">
                      {renderAppurerButton("amr")}
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
                        <Select>
                          <SelectTrigger className="w-[180px] shadow-none border-0 rounded-none border-r border-borderInput text-colorTitle">
                            <SelectValue placeholder="Rang" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectGroup>
                              <SelectLabel>Rang</SelectLabel>
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
                        <Select>
                          <SelectTrigger className="w-[180px] shadow-none border-0 rounded-none">
                            <SelectValue placeholder="Statut" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectGroup>
                              <SelectLabel>Statut</SelectLabel>
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
                    </div>
                  </div>
                </div>
                <div className="overflow-x-auto">
                  <table className="table w-full table-bordered">
                    <thead>
                      <tr>
                        <th>
                          {renderCheckbox(
                            "amr",
                            amrItems.map((i) => i.id),
                            true
                          )}
                        </th>
                        <th>Type d&apos;activité</th>
                        <th>Dimension</th>
                        <th>Activité principale</th>
                        <th>Nature</th>
                        <th>Dénomination</th>
                        <th>Commune</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {amrItems.map((row) => (
                        <tr key={row.id}>
                          <td>{renderCheckbox("amr", row.id)}</td>
                          <td>
                            <span>{row.typeActive}</span>
                          </td>
                          <td>
                            <span>{row.dimension}</span>
                          </td>
                          <td>
                            <span>{row.activitePrinc}</span>
                          </td>
                          <td>
                            <span>{row.nature}</span>
                          </td>
                          <td>
                            <span>{row.denimination}</span>
                          </td>
                          <td>
                            <span>{row.commune}</span>
                          </td>
                          <td>
                            <div className="flex items-center gap-3">
                              <Button className="cursor-pointer shadow-none bg-transparent  text-[#5f61e6]  hover:bg-transparent hover:text-[#494be3] text-md h-auto p-0">
                                Déclarer
                              </Button>
                              <DropdownMenu>
                                <DropdownMenuTrigger className="cursor-pointer bg-bgGray text-colorTitle p-0 w-[28px] flex items-center justify-center rounded-lg h-[28px] hover:bg-[#07192b] hover:text-white">
                                  <EllipsisVertical
                                    size={18}
                                  ></EllipsisVertical>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent className="border-0 shadow-[var(--boxShadowCard)!important]">
                                  <DropdownMenuLabel className="text-colorMuted text-xs opacity-70">
                                    Actions
                                  </DropdownMenuLabel>
                                  <DropdownMenuSeparator />
                                  <DropdownMenuItem className="text-sm text-colorMuted">
                                    Afficher
                                  </DropdownMenuItem>
                                  <DropdownMenuItem className="text-sm text-colorMuted">
                                    Modifier
                                  </DropdownMenuItem>
                                  <DropdownMenuItem className="text-sm text-colorMuted">
                                    Supprimer
                                  </DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </Card>
            </TabsContent>
            <TabsContent value="pour">
              <Card className="rounded-[24px] shadow-[var(--boxShadowCard)!important] border-0 bg-bgCard lg:p-[18px]">
                <div className="grid grid-cols-12 gap-3 items-center">
                  <div className="col-span-12 lg:col-span-4">
                    <div className="block-search w-[320px] max-w-full relative flex items-center">
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
                  <div className="col-span-12 lg:col-span-8">
                    <div className="flex lg:justify-end gap-2">
                      {renderAppurerButton("pour")}
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
                        <Select>
                          <SelectTrigger className="w-[180px] shadow-none border-0 rounded-none border-r border-borderInput text-colorTitle">
                            <SelectValue placeholder="Rang" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectGroup>
                              <SelectLabel>Rang</SelectLabel>
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
                        <Select>
                          <SelectTrigger className="w-[180px] shadow-none border-0 rounded-none">
                            <SelectValue placeholder="Statut" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectGroup>
                              <SelectLabel>Statut</SelectLabel>
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
                    </div>
                  </div>
                </div>
                <div className="overflow-x-auto">
                  <table className="table w-full table-bordered">
                    <thead>
                      <tr>
                        <th>
                          {renderCheckbox(
                            "pour",
                            pourItems.map((i) => i.id),
                            true
                          )}
                        </th>
                        <th>Type d&apos;activité</th>
                        <th>Dimension</th>
                        <th>Activité principale</th>
                        <th>Nature</th>
                        <th>Dénomination</th>
                        <th>Commune</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {pourItems.map((row) => (
                        <tr key={row.id}>
                          <td>{renderCheckbox("pour", row.id)}</td>
                          <td>
                            <span>{row.typeActive}</span>
                          </td>
                          <td>
                            <span>{row.dimension}</span>
                          </td>
                          <td>
                            <span>{row.activitePrinc}</span>
                          </td>
                          <td>
                            <span>{row.nature}</span>
                          </td>
                          <td>
                            <span>{row.denimination}</span>
                          </td>
                          <td>
                            <span>{row.commune}</span>
                          </td>
                          <td>
                            <div className="flex items-center gap-3">
                              <Button className="cursor-pointer shadow-none bg-transparent  text-[#5f61e6]  hover:bg-transparent hover:text-[#494be3] text-md h-auto p-0">
                                Déclarer
                              </Button>
                              <DropdownMenu>
                                <DropdownMenuTrigger className="cursor-pointer bg-bgGray text-colorTitle p-0 w-[28px] flex items-center justify-center rounded-lg h-[28px] hover:bg-[#07192b] hover:text-white">
                                  <EllipsisVertical
                                    size={18}
                                  ></EllipsisVertical>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent className="border-0 shadow-[var(--boxShadowCard)!important]">
                                  <DropdownMenuLabel className="text-colorMuted text-xs opacity-70">
                                    Actions
                                  </DropdownMenuLabel>
                                  <DropdownMenuSeparator />
                                  <DropdownMenuItem className="text-sm text-colorMuted">
                                    Afficher
                                  </DropdownMenuItem>
                                  <DropdownMenuItem className="text-sm text-colorMuted">
                                    Modifier
                                  </DropdownMenuItem>
                                  <DropdownMenuItem className="text-sm text-colorMuted">
                                    Supprimer
                                  </DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </Card>
            </TabsContent>
            <TabsContent value="cc">
              <Card className="rounded-[24px] shadow-[var(--boxShadowCard)!important] border-0 bg-bgCard lg:p-[18px]">
                <div className="grid grid-cols-12 gap-3 items-center">
                  <div className="col-span-12 lg:col-span-4">
                    <div className="block-search w-[320px] max-w-full relative flex items-center">
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
                  <div className="col-span-12 lg:col-span-8">
                    <div className="flex lg:justify-end gap-2">
                      {renderAppurerButton("cc")}
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
                        <Select>
                          <SelectTrigger className="w-[180px] shadow-none border-0 rounded-none border-r border-borderInput text-colorTitle">
                            <SelectValue placeholder="Rang" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectGroup>
                              <SelectLabel>Rang</SelectLabel>
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
                        <Select>
                          <SelectTrigger className="w-[180px] shadow-none border-0 rounded-none">
                            <SelectValue placeholder="Statut" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectGroup>
                              <SelectLabel>Statut</SelectLabel>
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
                    </div>
                  </div>
                </div>
                <div className="overflow-x-auto">
                  <table className="table w-full table-bordered">
                    <thead>
                      <tr>
                        <th>
                          {renderCheckbox(
                            "cc",
                            ccItems.map((i) => i.id),
                            true
                          )}
                        </th>
                        <th>Type d&apos;activité</th>
                        <th>Dimension</th>
                        <th>Activité principale</th>
                        <th>Nature</th>
                        <th>Dénomination</th>
                        <th>Commune</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {ccItems.map((row) => (
                        <tr key={row.id}>
                          <td>{renderCheckbox("cc", row.id)}</td>
                          <td>
                            <span>{row.typeActive}</span>
                          </td>
                          <td>
                            <span>{row.dimension}</span>
                          </td>
                          <td>
                            <span>{row.activitePrinc}</span>
                          </td>
                          <td>
                            <span>{row.nature}</span>
                          </td>
                          <td>
                            <span>{row.denimination}</span>
                          </td>
                          <td>
                            <span>{row.commune}</span>
                          </td>
                          <td>
                            <div className="flex items-center gap-3">
                              <Button className="cursor-pointer shadow-none bg-transparent  text-[#5f61e6]  hover:bg-transparent hover:text-[#494be3] text-md h-auto p-0">
                                Déclarer
                              </Button>
                              <DropdownMenu>
                                <DropdownMenuTrigger className="cursor-pointer bg-bgGray text-colorTitle p-0 w-[28px] flex items-center justify-center rounded-lg h-[28px] hover:bg-[#07192b] hover:text-white">
                                  <EllipsisVertical
                                    size={18}
                                  ></EllipsisVertical>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent className="border-0 shadow-[var(--boxShadowCard)!important]">
                                  <DropdownMenuLabel className="text-colorMuted text-xs opacity-70">
                                    Actions
                                  </DropdownMenuLabel>
                                  <DropdownMenuSeparator />
                                  <DropdownMenuItem className="text-sm text-colorMuted">
                                    Afficher
                                  </DropdownMenuItem>
                                  <DropdownMenuItem className="text-sm text-colorMuted">
                                    Modifier
                                  </DropdownMenuItem>
                                  <DropdownMenuItem className="text-sm text-colorMuted">
                                    Supprimer
                                  </DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </Card>
            </TabsContent>
            <TabsContent value="adt">
              <Card className="rounded-[24px] shadow-[var(--boxShadowCard)!important] border-0 bg-bgCard lg:p-[18px]">
                <div className="grid grid-cols-12 gap-3 items-center">
                  <div className="col-span-12 lg:col-span-4">
                    <div className="block-search w-[320px] max-w-full relative flex items-center">
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
                  <div className="col-span-12 lg:col-span-8">
                    <div className="flex lg:justify-end gap-2">
                      {renderAppurerButton("adt")}
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
                        <Select>
                          <SelectTrigger className="w-[180px] shadow-none border-0 rounded-none border-r border-borderInput text-colorTitle">
                            <SelectValue placeholder="Rang" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectGroup>
                              <SelectLabel>Rang</SelectLabel>
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
                        <Select>
                          <SelectTrigger className="w-[180px] shadow-none border-0 rounded-none">
                            <SelectValue placeholder="Statut" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectGroup>
                              <SelectLabel>Statut</SelectLabel>
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
                    </div>
                  </div>
                </div>
                <div className="overflow-x-auto">
                  <table className="table w-full table-bordered">
                    <thead>
                      <tr>
                        <th>
                          {renderCheckbox(
                            "adt",
                            adtItems.map((i) => i.id),
                            true
                          )}
                        </th>
                        <th>Type d&apos;activité</th>
                        <th>Dimension</th>
                        <th>Activité principale</th>
                        <th>Nature</th>
                        <th>Dénomination</th>
                        <th>Commune</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {adtItems.map((row) => (
                        <tr key={row.id}>
                          <td>{renderCheckbox("adt", row.id)}</td>
                          <td>
                            <span>{row.typeActive}</span>
                          </td>
                          <td>
                            <span>{row.dimension}</span>
                          </td>
                          <td>
                            <span>{row.activitePrinc}</span>
                          </td>
                          <td>
                            <span>{row.nature}</span>
                          </td>
                          <td>
                            <span>{row.denimination}</span>
                          </td>
                          <td>
                            <span>{row.commune}</span>
                          </td>
                          <td>
                            <div className="flex items-center gap-3">
                              <Button className="cursor-pointer shadow-none bg-transparent  text-[#5f61e6]  hover:bg-transparent hover:text-[#494be3] text-md h-auto p-0">
                                Déclarer
                              </Button>
                              <DropdownMenu>
                                <DropdownMenuTrigger className="cursor-pointer bg-bgGray text-colorTitle p-0 w-[28px] flex items-center justify-center rounded-lg h-[28px] hover:bg-[#07192b] hover:text-white">
                                  <EllipsisVertical
                                    size={18}
                                  ></EllipsisVertical>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent className="border-0 shadow-[var(--boxShadowCard)!important]">
                                  <DropdownMenuLabel className="text-colorMuted text-xs opacity-70">
                                    Actions
                                  </DropdownMenuLabel>
                                  <DropdownMenuSeparator />
                                  <DropdownMenuItem className="text-sm text-colorMuted">
                                    Afficher
                                  </DropdownMenuItem>
                                  <DropdownMenuItem className="text-sm text-colorMuted">
                                    Modifier
                                  </DropdownMenuItem>
                                  <DropdownMenuItem className="text-sm text-colorMuted">
                                    Supprimer
                                  </DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </Card>
            </TabsContent>
            <TabsContent value="con">
              <Card className="rounded-[24px] shadow-[var(--boxShadowCard)!important] border-0 bg-bgCard lg:p-[18px]">
                <div className="grid grid-cols-12 gap-3 items-center">
                  <div className="col-span-12 lg:col-span-4">
                    <div className="block-search w-[320px] max-w-full relative flex items-center">
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
                  <div className="col-span-12 lg:col-span-8">
                    <div className="flex lg:justify-end gap-2">
                      {renderAppurerButton("con")}
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
                        <Select>
                          <SelectTrigger className="w-[180px] shadow-none border-0 rounded-none border-r border-borderInput text-colorTitle">
                            <SelectValue placeholder="Rang" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectGroup>
                              <SelectLabel>Rang</SelectLabel>
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
                        <Select>
                          <SelectTrigger className="w-[180px] shadow-none border-0 rounded-none">
                            <SelectValue placeholder="Statut" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectGroup>
                              <SelectLabel>Statut</SelectLabel>
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
                    </div>
                  </div>
                </div>
                <div className="overflow-x-auto">
                  <table className="table w-full table-bordered">
                    <thead>
                      <tr>
                        <th>
                          {renderCheckbox(
                            "con",
                            conItems.map((i) => i.id),
                            true
                          )}
                        </th>
                        <th>Type d&apos;activité</th>
                        <th>Dimension</th>
                        <th>Activité principale</th>
                        <th>Nature</th>
                        <th>Dénomination</th>
                        <th>Commune</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {conItems.map((row) => (
                        <tr key={row.id}>
                          <td>{renderCheckbox("con", row.id)}</td>
                          <td>
                            <span>{row.typeActive}</span>
                          </td>
                          <td>
                            <span>{row.dimension}</span>
                          </td>
                          <td>
                            <span>{row.activitePrinc}</span>
                          </td>
                          <td>
                            <span>{row.nature}</span>
                          </td>
                          <td>
                            <span>{row.denimination}</span>
                          </td>
                          <td>
                            <span>{row.commune}</span>
                          </td>
                          <td>
                            <div className="flex items-center gap-3">
                              <Button className="cursor-pointer shadow-none bg-transparent  text-[#5f61e6]  hover:bg-transparent hover:text-[#494be3] text-md h-auto p-0">
                                Déclarer
                              </Button>
                              <DropdownMenu>
                                <DropdownMenuTrigger className="cursor-pointer bg-bgGray text-colorTitle p-0 w-[28px] flex items-center justify-center rounded-lg h-[28px] hover:bg-[#07192b] hover:text-white">
                                  <EllipsisVertical
                                    size={18}
                                  ></EllipsisVertical>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent className="border-0 shadow-[var(--boxShadowCard)!important]">
                                  <DropdownMenuLabel className="text-colorMuted text-xs opacity-70">
                                    Actions
                                  </DropdownMenuLabel>
                                  <DropdownMenuSeparator />
                                  <DropdownMenuItem className="text-sm text-colorMuted">
                                    Afficher
                                  </DropdownMenuItem>
                                  <DropdownMenuItem className="text-sm text-colorMuted">
                                    Modifier
                                  </DropdownMenuItem>
                                  <DropdownMenuItem className="text-sm text-colorMuted">
                                    Supprimer
                                  </DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </Card>
            </TabsContent>
            <TabsContent value="recl">
              <Card className="rounded-[24px] shadow-[var(--boxShadowCard)!important] border-0 bg-bgCard lg:p-[18px]">
                <div className="grid grid-cols-12 gap-3 items-center">
                  <div className="col-span-12 lg:col-span-4">
                    <div className="block-search w-[320px] max-w-full relative flex items-center">
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
                  <div className="col-span-12 lg:col-span-8">
                    <div className="flex lg:justify-end gap-2">
                      {renderAppurerButton("recl")}
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
                        <Select>
                          <SelectTrigger className="w-[180px] shadow-none border-0 rounded-none border-r border-borderInput text-colorTitle">
                            <SelectValue placeholder="Rang" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectGroup>
                              <SelectLabel>Rang</SelectLabel>
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
                        <Select>
                          <SelectTrigger className="w-[180px] shadow-none border-0 rounded-none">
                            <SelectValue placeholder="Statut" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectGroup>
                              <SelectLabel>Statut</SelectLabel>
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
                    </div>
                  </div>
                </div>
                <div className="overflow-x-auto">
                  <table className="table w-full table-bordered">
                    <thead>
                      <tr>
                        <th>
                          {renderCheckbox(
                            "recl",
                            reclItems.map((i) => i.id),
                            true
                          )}
                        </th>
                        <th>Type d&apos;activité</th>
                        <th>Dimension</th>
                        <th>Activité principale</th>
                        <th>Nature</th>
                        <th>Dénomination</th>
                        <th>Commune</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {reclItems.map((row) => (
                        <tr key={row.id}>
                          <td>{renderCheckbox("recl", row.id)}</td>
                          <td>
                            <span>{row.typeActive}</span>
                          </td>
                          <td>
                            <span>{row.dimension}</span>
                          </td>
                          <td>
                            <span>{row.activitePrinc}</span>
                          </td>
                          <td>
                            <span>{row.nature}</span>
                          </td>
                          <td>
                            <span>{row.denimination}</span>
                          </td>
                          <td>
                            <span>{row.commune}</span>
                          </td>
                          <td>
                            <div className="flex items-center gap-3">
                              <Button className="cursor-pointer shadow-none bg-transparent  text-[#5f61e6]  hover:bg-transparent hover:text-[#494be3] text-md h-auto p-0">
                                Déclarer
                              </Button>
                              <DropdownMenu>
                                <DropdownMenuTrigger className="cursor-pointer bg-bgGray text-colorTitle p-0 w-[28px] flex items-center justify-center rounded-lg h-[28px] hover:bg-[#07192b] hover:text-white">
                                  <EllipsisVertical
                                    size={18}
                                  ></EllipsisVertical>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent className="border-0 shadow-[var(--boxShadowCard)!important]">
                                  <DropdownMenuLabel className="text-colorMuted text-xs opacity-70">
                                    Actions
                                  </DropdownMenuLabel>
                                  <DropdownMenuSeparator />
                                  <DropdownMenuItem className="text-sm text-colorMuted">
                                    Afficher
                                  </DropdownMenuItem>
                                  <DropdownMenuItem className="text-sm text-colorMuted">
                                    Modifier
                                  </DropdownMenuItem>
                                  <DropdownMenuItem className="text-sm text-colorMuted">
                                    Supprimer
                                  </DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </Card>
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </div>
  );
};

export default TableActivities;
