import React, { useMemo } from "react";
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
import { LoadingIndicator } from "@/components/ui/loading-indicator";
import { useNextAuth } from "@/app/contexts/auth/useNextAuth";
import { useTaxpayerActivities } from "@/app/hooks/useTaxpayerActivities";
import { RefreshButton } from "@/components/ui/refresh-button";
import { TableSkeleton } from "@/components/ui/table-skeleton";
import { useDebounce } from "@/app/hooks/useDebounce";

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

  // Fonction utilitaire pour rendre la barre de recherche et de filtres
  const renderSearchAndFilters = (tabKey: string) => (
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
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>
      <div className="col-span-12 lg:col-span-8">
        <div className="flex lg:justify-end gap-2">
          <RefreshButton 
            onRefresh={async () => {
              try {
                await refetch();
              } catch (error) {
                console.error("Erreur lors du rafraîchissement:", error);
              }
            }}
            size="sm"
            variant="outline"
            className="border-borderInput hover:bg-gray-50"
          />
          {renderAppurerButton(tabKey)}
          <div className="block-selects flex border border-borderInput rounded-lg">
            <Select value={filterTypeActive} onValueChange={setFilterTypeActive}>
              <SelectTrigger className="w-[180px] shadow-none border-0 rounded-none border-r border-borderInput text-colorTitle">
                <SelectValue placeholder="Type d'activité" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Type d&apos;activité</SelectLabel>
                  <SelectItem value="all">Tous</SelectItem>
                  {filterOptions.typeActiveOptions.map((option) => (
                    <SelectItem key={option} value={option}>
                      {option}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
            <Select value={filterDimension} onValueChange={setFilterDimension}>
              <SelectTrigger className="w-[180px] shadow-none border-0 rounded-none border-r border-borderInput text-colorTitle">
                <SelectValue placeholder="Dimension" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Dimension</SelectLabel>
                  <SelectItem value="all">Tous</SelectItem>
                  {filterOptions.dimensionOptions.map((option) => (
                    <SelectItem key={option} value={option}>
                      {option}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
            <Select value={filterActivitePrinc} onValueChange={setFilterActivitePrinc}>
              <SelectTrigger className="w-[180px] shadow-none border-0 rounded-none">
                <SelectValue placeholder="Activité principale" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Activité principale</SelectLabel>
                  <SelectItem value="all">Tous</SelectItem>
                  {filterOptions.activitePrincOptions.map((option) => (
                    <SelectItem key={option} value={option}>
                      {option}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
    </div>
  );

  // États pour la recherche et les filtres
  const [searchTerm, setSearchTerm] = useState("");
  const [filterTypeActive, setFilterTypeActive] = useState<string>("all");
  const [filterDimension, setFilterDimension] = useState<string>("all");
  const [filterActivitePrinc, setFilterActivitePrinc] = useState<string>("all");

  // Debounce pour la recherche (300ms de délai)
  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  // Récupération des données réelles
  const { profileId } = useNextAuth();
  const { activities, loading, error, refetch, isInitialLoad } = useTaxpayerActivities(profileId);

  // Fonction utilitaire pour mapper les données d'activité
  const mapActivityData = (activity: unknown, index: number) => {
    const act = activity as Record<string, unknown>;
    return {
      id: (act.taxId as string) ?? String(index),
      typeActive: (act.typeActive as string) ?? "",
      dimension: (act.dimension as string) ?? "",
      activitePrinc: (act.activitePrinc as string) ?? "",
      categorie: (act.nature as string) ?? "", // Renommé de nature à catégorie
      denimination: (act.denomination as string) ?? "",
      lieu: (act.lieu as string) ?? "", // Renommé de commune à lieu
    };
  };

  // Fonction utilitaire pour rendre les lignes de tableau
  const renderTableRows = (tabKey: string) => {
    return filteredItems.map((activity, index) => {
      const row = mapActivityData(activity, index);
      return (
        <tr key={row.id}>
          <td>{renderCheckbox(tabKey, row.id)}</td>
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
            <span>{row.categorie}</span>
          </td>
          <td>
            <span>{row.denimination}</span>
          </td>
          <td>
            <span>{row.lieu}</span>
          </td>
          <td>
            <div className="flex items-center gap-3">
              <Button className="cursor-pointer shadow-none bg-transparent  text-[#5f61e6]  hover:bg-transparent hover:text-[#494be3] text-md h-auto p-0">
                Déclarer
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger className="cursor-pointer bg-bgGray text-colorTitle p-0 w-[28px] flex items-center justify-center rounded-lg h-[28px] hover:bg-[#07192b] hover:text-white">
                  <EllipsisVertical size={18}></EllipsisVertical>
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
      );
    });
  };

  // Options de filtres (calculées une seule fois)
  const filterOptions = useMemo(() => {
    const typeActive = new Set<string>();
    const dimension = new Set<string>();
    const activitePrinc = new Set<string>();
    
    activities.forEach((activity) => {
      if (activity.typeActive) typeActive.add(activity.typeActive);
      if (activity.dimension) dimension.add(activity.dimension);
      if (activity.activitePrinc) activitePrinc.add(activity.activitePrinc);
    });
    
    return {
      typeActiveOptions: Array.from(typeActive).sort((a, b) => a.localeCompare(b)),
      dimensionOptions: Array.from(dimension).sort((a, b) => a.localeCompare(b)),
      activitePrincOptions: Array.from(activitePrinc).sort((a, b) => a.localeCompare(b)),
    };
  }, [activities]);

  // Liste filtrée (optimisée avec debounce)
  const filteredItems = useMemo(() => {
    if (!activities.length) return [];
    
    const q = debouncedSearchTerm.trim().toLowerCase();
    const isTypeActiveFiltered = filterTypeActive !== "all";
    const isDimensionFiltered = filterDimension !== "all";
    const isActivitePrincFiltered = filterActivitePrinc !== "all";
    const hasSearchTerm = q.length > 0;
    
    return activities.filter((activity) => {
      // Filtres par sélection
      if (isTypeActiveFiltered && activity.typeActive !== filterTypeActive) return false;
      if (isDimensionFiltered && activity.dimension !== filterDimension) return false;
      if (isActivitePrincFiltered && activity.activitePrinc !== filterActivitePrinc) return false;
      
      // Recherche textuelle
      if (hasSearchTerm) {
        const searchText = `${activity.typeActive || ''} ${activity.dimension || ''} ${activity.activitePrinc || ''} ${activity.nature || ''} ${activity.denomination || ''} ${activity.lieu || ''}`.toLowerCase();
        if (!searchText.includes(q)) return false;
      }
      
      return true;
    });
  }, [activities, debouncedSearchTerm, filterTypeActive, filterDimension, filterActivitePrinc]);
  // Tous les onglets utilisent les mêmes données filtrées
  // const declItems = filteredItems;
  // const payItems = filteredItems;
  // const appItems = filteredItems;
  // const impItems = filteredItems;
  // const ddItems = filteredItems;
  // const dpItems = filteredItems;
  // const fpcItems = filteredItems;
  // const amrItems = filteredItems;
  // const pourItems = filteredItems;
  // const ccItems = filteredItems;
  // const adtItems = filteredItems;
  // const conItems = filteredItems;
  // const reclItems = filteredItems;

  if (loading) {
    return <LoadingIndicator />;
  }

  if (error) {
    return (
      <div className="text-center py-8">
        <p className="text-red-500">Erreur lors du chargement des activités: {error.message}</p>
      </div>
    );
  }

  // Afficher le skeleton pendant le chargement initial
  if (isInitialLoad) {
    return <TableSkeleton rows={5} columns={6} showSearch={true} showFilters={true} />;
  }

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
                {renderSearchAndFilters("ident")}
                <div className="overflow-x-auto">
                  <table className="table w-full table-bordered">
                    <thead>
                      <tr>
                        <th>
                          {renderCheckbox(
                            "ident",
                            filteredItems.map((_, i) => String(i)),
                            true
                          )}
                        </th>
                        <th>Type d&apos;activité</th>
                        <th>Dimension</th>
                        <th>Activité principale</th>
                        <th>Catégorie</th>
                        <th>Dénomination</th>
                        <th>Lieu</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {renderTableRows("ident")}
                    </tbody>
                  </table>
                </div>
              </Card>
            </TabsContent>
            <TabsContent value="decl">
              <Card className="rounded-[24px] shadow-[var(--boxShadowCard)!important] border-0 bg-bgCard lg:p-[18px]">
                {renderSearchAndFilters("decl")}
                <div className="overflow-x-auto">
                  <table className="table w-full table-bordered">
                    <thead>
                      <tr>
                        <th>
                          {renderCheckbox(
                            "decl",
                            filteredItems.map((_, i) => String(i)),
                            true
                          )}
                        </th>
                        <th>Type d&apos;activité</th>
                        <th>Dimension</th>
                        <th>Activité principale</th>
                        <th>Catégorie</th>
                        <th>Dénomination</th>
                        <th>Lieu</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {renderTableRows("decl")}
                    </tbody>
                  </table>
                </div>
              </Card>
            </TabsContent>
            <TabsContent value="pay">
              <Card className="rounded-[24px] shadow-[var(--boxShadowCard)!important] border-0 bg-bgCard lg:p-[18px]">
                {renderSearchAndFilters("pay")}
                <div className="overflow-x-auto">
                  <table className="table w-full table-bordered">
                    <thead>
                      <tr>
                        <th>
                          {renderCheckbox(
                            "pay",
                            filteredItems.map((_, i) => String(i)),
                            true
                          )}
                        </th>
                        <th>Type d&apos;activité</th>
                        <th>Dimension</th>
                        <th>Activité principale</th>
                        <th>Catégorie</th>
                        <th>Dénomination</th>
                        <th>Lieu</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {renderTableRows("pay")}
                    </tbody>
                  </table>
                </div>
              </Card>
            </TabsContent>
            <TabsContent value="app">
              <Card className="rounded-[24px] shadow-[var(--boxShadowCard)!important] border-0 bg-bgCard lg:p-[18px]">
                {renderSearchAndFilters("app")}
                <div className="overflow-x-auto">
                  <table className="table w-full table-bordered">
                    <thead>
                      <tr>
                        <th>
                          {renderCheckbox(
                            "app",
                            filteredItems.map((_, i) => String(i)),
                            true
                          )}
                        </th>
                        <th>Type d&apos;activité</th>
                        <th>Dimension</th>
                        <th>Activité principale</th>
                        <th>Catégorie</th>
                        <th>Dénomination</th>
                        <th>Lieu</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {renderTableRows("app")}
                    </tbody>
                  </table>
                </div>
              </Card>
            </TabsContent>
            <TabsContent value="imp">
              <Card className="rounded-[24px] shadow-[var(--boxShadowCard)!important] border-0 bg-bgCard lg:p-[18px]">
                {renderSearchAndFilters("imp")}
                <div className="overflow-x-auto">
                  <table className="table w-full table-bordered">
                    <thead>
                      <tr>
                        <th>
                          {renderCheckbox(
                            "imp",
                            filteredItems.map((_, i) => String(i)),
                            true
                          )}
                        </th>
                        <th>Type d&apos;activité</th>
                        <th>Dimension</th>
                        <th>Activité principale</th>
                        <th>Catégorie</th>
                        <th>Dénomination</th>
                        <th>Lieu</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {renderTableRows("imp")}
                    </tbody>
                  </table>
                </div>
              </Card>
            </TabsContent>
            <TabsContent value="dd">
              <Card className="rounded-[24px] shadow-[var(--boxShadowCard)!important] border-0 bg-bgCard lg:p-[18px]">
                {renderSearchAndFilters("dd")}
                <div className="overflow-x-auto">
                  <table className="table w-full table-bordered">
                    <thead>
                      <tr>
                        <th>
                          {renderCheckbox(
                            "dd",
                            filteredItems.map((_, i) => String(i)),
                            true
                          )}
                        </th>
                        <th>Type d&apos;activité</th>
                        <th>Dimension</th>
                        <th>Activité principale</th>
                        <th>Catégorie</th>
                        <th>Dénomination</th>
                        <th>Lieu</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {renderTableRows("dd")}
                    </tbody>
                  </table>
                </div>
              </Card>
            </TabsContent>
            <TabsContent value="dp">
              <Card className="rounded-[24px] shadow-[var(--boxShadowCard)!important] border-0 bg-bgCard lg:p-[18px]">
                {renderSearchAndFilters("dp")}
                <div className="overflow-x-auto">
                  <table className="table w-full table-bordered">
                    <thead>
                      <tr>
                        <th>
                          {renderCheckbox(
                            "dp",
                            filteredItems.map((_, i) => String(i)),
                            true
                          )}
                        </th>
                        <th>Type d&apos;activité</th>
                        <th>Dimension</th>
                        <th>Activité principale</th>
                        <th>Catégorie</th>
                        <th>Dénomination</th>
                        <th>Lieu</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {renderTableRows("dp")}
                    </tbody>
                  </table>
                </div>
              </Card>
            </TabsContent>
            <TabsContent value="fpc">
              <Card className="rounded-[24px] shadow-[var(--boxShadowCard)!important] border-0 bg-bgCard lg:p-[18px]">
                {renderSearchAndFilters("fpc")}
                <div className="overflow-x-auto">
                  <table className="table w-full table-bordered">
                    <thead>
                      <tr>
                        <th>
                          {renderCheckbox(
                            "fpc",
                            filteredItems.map((_, i) => String(i)),
                            true
                          )}
                        </th>
                        <th>Type d&apos;activité</th>
                        <th>Dimension</th>
                        <th>Activité principale</th>
                        <th>Catégorie</th>
                        <th>Dénomination</th>
                        <th>Lieu</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {renderTableRows("fpc")}
                    </tbody>
                  </table>
                </div>
              </Card>
            </TabsContent>
            <TabsContent value="amr">
              <Card className="rounded-[24px] shadow-[var(--boxShadowCard)!important] border-0 bg-bgCard lg:p-[18px]">
                {renderSearchAndFilters("amr")}
                <div className="overflow-x-auto">
                  <table className="table w-full table-bordered">
                    <thead>
                      <tr>
                        <th>
                          {renderCheckbox(
                            "amr",
                            filteredItems.map((_, i) => String(i)),
                            true
                          )}
                        </th>
                        <th>Type d&apos;activité</th>
                        <th>Dimension</th>
                        <th>Activité principale</th>
                        <th>Catégorie</th>
                        <th>Dénomination</th>
                        <th>Lieu</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {renderTableRows("amr")}
                    </tbody>
                  </table>
                </div>
              </Card>
            </TabsContent>
            <TabsContent value="pour">
              <Card className="rounded-[24px] shadow-[var(--boxShadowCard)!important] border-0 bg-bgCard lg:p-[18px]">
                {renderSearchAndFilters("pour")}
                <div className="overflow-x-auto">
                  <table className="table w-full table-bordered">
                    <thead>
                      <tr>
                        <th>
                          {renderCheckbox(
                            "pour",
                            filteredItems.map((_, i) => String(i)),
                            true
                          )}
                        </th>
                        <th>Type d&apos;activité</th>
                        <th>Dimension</th>
                        <th>Activité principale</th>
                        <th>Catégorie</th>
                        <th>Dénomination</th>
                        <th>Lieu</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {renderTableRows("pour")}
                    </tbody>
                  </table>
                </div>
              </Card>
            </TabsContent>
            <TabsContent value="cc">
              <Card className="rounded-[24px] shadow-[var(--boxShadowCard)!important] border-0 bg-bgCard lg:p-[18px]">
                {renderSearchAndFilters("cc")}
                <div className="overflow-x-auto">
                  <table className="table w-full table-bordered">
                    <thead>
                      <tr>
                        <th>
                          {renderCheckbox(
                            "cc",
                            filteredItems.map((_, i) => String(i)),
                            true
                          )}
                        </th>
                        <th>Type d&apos;activité</th>
                        <th>Dimension</th>
                        <th>Activité principale</th>
                        <th>Catégorie</th>
                        <th>Dénomination</th>
                        <th>Lieu</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {renderTableRows("cc")}
                    </tbody>
                  </table>
                </div>
              </Card>
            </TabsContent>
            <TabsContent value="adt">
              <Card className="rounded-[24px] shadow-[var(--boxShadowCard)!important] border-0 bg-bgCard lg:p-[18px]">
                {renderSearchAndFilters("adt")}
                <div className="overflow-x-auto">
                  <table className="table w-full table-bordered">
                    <thead>
                      <tr>
                        <th>
                          {renderCheckbox(
                            "adt",
                            filteredItems.map((_, i) => String(i)),
                            true
                          )}
                        </th>
                        <th>Type d&apos;activité</th>
                        <th>Dimension</th>
                        <th>Activité principale</th>
                        <th>Catégorie</th>
                        <th>Dénomination</th>
                        <th>Lieu</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {renderTableRows("adt")}
                    </tbody>
                  </table>
                </div>
              </Card>
            </TabsContent>
            <TabsContent value="con">
              <Card className="rounded-[24px] shadow-[var(--boxShadowCard)!important] border-0 bg-bgCard lg:p-[18px]">
                {renderSearchAndFilters("con")}
                <div className="overflow-x-auto">
                  <table className="table w-full table-bordered">
                    <thead>
                      <tr>
                        <th>
                          {renderCheckbox(
                            "con",
                            filteredItems.map((_, i) => String(i)),
                            true
                          )}
                        </th>
                        <th>Type d&apos;activité</th>
                        <th>Dimension</th>
                        <th>Activité principale</th>
                        <th>Catégorie</th>
                        <th>Dénomination</th>
                        <th>Lieu</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {renderTableRows("con")}
                    </tbody>
                  </table>
                </div>
              </Card>
            </TabsContent>
            <TabsContent value="recl">
              <Card className="rounded-[24px] shadow-[var(--boxShadowCard)!important] border-0 bg-bgCard lg:p-[18px]">
                {renderSearchAndFilters("recl")}
                <div className="overflow-x-auto">
                  <table className="table w-full table-bordered">
                    <thead>
                      <tr>
                        <th>
                          {renderCheckbox(
                            "recl",
                            filteredItems.map((_, i) => String(i)),
                            true
                          )}
                        </th>
                        <th>Type d&apos;activité</th>
                        <th>Dimension</th>
                        <th>Activité principale</th>
                        <th>Catégorie</th>
                        <th>Dénomination</th>
                        <th>Lieu</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {renderTableRows("recl")}
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
