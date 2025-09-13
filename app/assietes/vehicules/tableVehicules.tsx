import { useMemo, useState } from "react";
import { Card } from "@/components/ui/card";
import { Search, EllipsisVertical } from "lucide-react";
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
import { useNextAuth } from "@/app/contexts/auth/useNextAuth";
import { useTaxpayerVehicles } from "@/app/hooks/useTaxpayerVehicles";
// import { LoadingIndicator } from "@/components/ui/loading-indicator";
import { RefreshIndicator } from "@/components/ui/refresh-indicator";
import { RefreshButton } from "@/components/ui/refresh-button";
import { TableSkeleton } from "@/components/ui/table-skeleton";

const TableVehicules = () => {
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
  const { profileId } = useNextAuth();
  const { vehicles, loading, refetch, isInitialLoad } = useTaxpayerVehicles(profileId);

  // Fonction utilitaire pour mapper les données de véhicule
  const mapVehicleData = (vehicle: unknown, index: number) => {
    const veh = vehicle as Record<string, unknown>;
    return {
      id: (veh.taxId as string) ?? String(index),
      matricule: (veh.registration as string) ?? "",
      chassis: (veh.chassisNumber as string) ?? "",
      annee: (veh.circYear as string) ?? "",
      poids: (veh.weight as string) ?? "",
      moteur: (veh.power as string) ?? "",
      marque: (veh.mark as string) ?? "",
      modele: (veh.model as string) ?? "",
      carrosserie: (veh.calender as string) ?? "",
      couleur: (veh.color as string) ?? "",
    };
  };

  // Etats recherche + filtres (onglet Identifiés)
  const [searchIdent, setSearchIdent] = useState("");
  const [filterMarque, setFilterMarque] = useState<string | undefined>();
  const [filterModele, setFilterModele] = useState<string | undefined>();
  const [filterCarrosserie, setFilterCarrosserie] = useState<string | undefined>();

  // Options de filtres (calculées une seule fois)
  const filterOptions = useMemo(() => {
    const marques = new Set<string>();
    const modeles = new Set<string>();
    const carrosseries = new Set<string>();
    
    vehicles.forEach((vehicle) => {
      if (vehicle.mark) marques.add(vehicle.mark);
      if (vehicle.model) modeles.add(vehicle.model);
      if (vehicle.calender) carrosseries.add(vehicle.calender);
    });
    
    return {
      marquesOptions: Array.from(marques).sort((a, b) => a.localeCompare(b)),
      modelesOptions: Array.from(modeles).sort((a, b) => a.localeCompare(b)),
      carrosseriesOptions: Array.from(carrosseries).sort((a, b) => a.localeCompare(b)),
    };
  }, [vehicles]);

  // Liste filtrée (optimisée)
  const filteredItems = useMemo(() => {
    if (!vehicles.length) return [];
    
    const q = searchIdent.trim().toLowerCase();
    const isMarqueFiltered = filterMarque !== undefined;
    const isModeleFiltered = filterModele !== undefined;
    const isCarrosserieFiltered = filterCarrosserie !== undefined;
    const hasSearchTerm = q.length > 0;
    
    return vehicles.filter((vehicle) => {
      // Filtres par sélection
      if (isMarqueFiltered && vehicle.mark !== filterMarque) return false;
      if (isModeleFiltered && vehicle.model !== filterModele) return false;
      if (isCarrosserieFiltered && vehicle.calender !== filterCarrosserie) return false;
      
      // Recherche textuelle
      if (hasSearchTerm) {
        const searchText = `${vehicle.registration || ''} ${vehicle.chassisNumber || ''} ${vehicle.circYear || ''} ${vehicle.weight || ''} ${vehicle.power || ''} ${vehicle.mark || ''} ${vehicle.model || ''} ${vehicle.calender || ''} ${vehicle.color || ''}`.toLowerCase();
        if (!searchText.includes(q)) return false;
      }
      
      return true;
    });
  }, [vehicles, searchIdent, filterMarque, filterModele, filterCarrosserie]);

  // Fonction utilitaire pour rendre les lignes de tableau
  const renderTableRows = (tabKey: string) => {
    return filteredItems.map((vehicle, index) => {
      const row = mapVehicleData(vehicle, index);
      return (
        <tr key={row.id}>
          <td>{renderCheckbox(tabKey, row.id)}</td>
          <td>
            <span>{row.matricule}</span>
          </td>
          <td>
            <span>{row.chassis}</span>
          </td>
          <td>
            <span>{row.annee}</span>
          </td>
          <td>
            <span>{row.poids}</span>
          </td>
          <td>
            <span>{row.moteur}</span>
          </td>
          <td>
            <span>{row.marque}</span>
          </td>
          <td>
            <span>{row.modele}</span>
          </td>
          <td>
            <span>{row.carrosserie}</span>
          </td>
          <td>
            <span>{row.couleur}</span>
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
  
  // Affichage d'un loader pendant le chargement des véhicules
  if (loading) {
    return (
      <Card className="rounded-[24px] shadow-[var(--boxShadowCard)!important] border-0 bg-bgCard p-6 min-h-[300px] flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="animate-spin rounded-full h-10 w-10 border-2 border-primaryColor border-t-transparent"></div>
          <p className="text-colorMuted text-sm">Chargement des vehicules...</p>
        </div>
      </Card>
    );
  }
  // Variables inutilisées supprimées pour éviter les warnings

  // Afficher le skeleton pendant le chargement initial
  if (isInitialLoad) {
    return <TableSkeleton rows={5} columns={7} showSearch={true} showFilters={true} />;
  }

  return (
    <>
      <RefreshIndicator isVisible={loading} />
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
                  className="w-full justify-start data-[state=active]:bg-[#494be314] data-[state=active]:text-[#494be3] data-[state=active]:shadow-none text-colorMuted hover:text-colorTitle cursor-pointer"
                >
                  <div className="flex items-center justify-between w-full">
                    Indetifiés
                    <span className="text-xs">10</span>
                  </div>
                </TabsTrigger>
                <TabsTrigger
                  value="decl"
                  className="w-full justify-start data-[state=active]:bg-[#494be314] data-[state=active]:text-[#494be3] data-[state=active]:shadow-none text-colorMuted hover:text-colorTitle cursor-pointer"
                >
                  <div className="flex items-center justify-between w-full">
                    Declarés
                    <span className="text-xs">10</span>
                  </div>
                </TabsTrigger>
                <TabsTrigger
                  value="pay"
                  className="w-full justify-start data-[state=active]:bg-[#494be314] data-[state=active]:text-[#494be3] data-[state=active]:shadow-none text-colorMuted hover:text-colorTitle cursor-pointer"
                >
                  <div className="flex items-center justify-between w-full">
                    Payés
                    <span className="text-xs">8</span>
                  </div>
                </TabsTrigger>
                <TabsTrigger
                  value="app"
                  className="w-full justify-start data-[state=active]:bg-[#494be314] data-[state=active]:text-[#494be3] data-[state=active]:shadow-none text-colorMuted hover:text-colorTitle cursor-pointer"
                >
                  <div className="flex items-center justify-between w-full">
                    Appurés
                    <span className="text-xs">0</span>
                  </div>
                </TabsTrigger>
                <TabsTrigger
                  value="imp"
                  className="w-full justify-start data-[state=active]:bg-[#494be314] data-[state=active]:text-[#494be3] data-[state=active]:shadow-none text-colorMuted hover:text-colorTitle cursor-pointer"
                >
                  <div className="flex items-center justify-between w-full">
                    Imprimés des valeurs
                    <span className="text-xs">10</span>
                  </div>
                </TabsTrigger>
                <TabsTrigger
                  value="dd"
                  className="w-full justify-start data-[state=active]:bg-[#494be314] data-[state=active]:text-[#494be3] data-[state=active]:shadow-none text-colorMuted hover:text-colorTitle cursor-pointer"
                >
                  <div className="flex items-center justify-between w-full">
                    Défauts en déclaration
                    <span className="text-xs">10</span>
                  </div>
                </TabsTrigger>
                <TabsTrigger
                  value="dp"
                  className="w-full justify-start data-[state=active]:bg-[#494be314] data-[state=active]:text-[#494be3] data-[state=active]:shadow-none text-colorMuted hover:text-colorTitle cursor-pointer"
                >
                  <div className="flex items-center justify-between w-full">
                    Défauts de paiement
                    <span className="text-xs">10</span>
                  </div>
                </TabsTrigger>
                <TabsTrigger
                  value="fpc"
                  className="w-full justify-start data-[state=active]:bg-[#494be314] data-[state=active]:text-[#494be3] data-[state=active]:shadow-none text-colorMuted hover:text-colorTitle cursor-pointer"
                >
                  <div className="flex items-center justify-between w-full">
                    FPC
                    <span className="text-xs">10</span>
                  </div>
                </TabsTrigger>
                <TabsTrigger
                  value="amr"
                  className="w-full justify-start data-[state=active]:bg-[#494be314] data-[state=active]:text-[#494be3] data-[state=active]:shadow-none text-colorMuted hover:text-colorTitle cursor-pointer"
                >
                  <div className="flex items-center justify-between w-full">
                    AMR
                    <span className="text-xs">10</span>
                  </div>
                </TabsTrigger>
                <TabsTrigger
                  value="pour"
                  className="w-full justify-start data-[state=active]:bg-[#494be314] data-[state=active]:text-[#494be3] data-[state=active]:shadow-none text-colorMuted hover:text-colorTitle cursor-pointer"
                >
                  <div className="flex items-center justify-between w-full">
                    Poursuites
                    <span className="text-xs">10</span>
                  </div>
                </TabsTrigger>
                <TabsTrigger
                  value="cc"
                  className="w-full justify-start data-[state=active]:bg-[#494be314] data-[state=active]:text-[#494be3] data-[state=active]:shadow-none text-colorMuted hover:text-colorTitle cursor-pointer"
                >
                  <div className="flex items-center justify-between w-full">
                    Contrainte et commandement
                    <span className="text-xs">10</span>
                  </div>
                </TabsTrigger>
                <TabsTrigger
                  value="adt"
                  className="w-full justify-start data-[state=active]:bg-[#494be314] data-[state=active]:text-[#494be3] data-[state=active]:shadow-none text-colorMuted hover:text-colorTitle cursor-pointer"
                >
                  <div className="flex items-center justify-between w-full">
                    ATD
                    <span className="text-xs">10</span>
                  </div>
                </TabsTrigger>
                <TabsTrigger
                  value="con"
                  className="w-full justify-start data-[state=active]:bg-[#494be314] data-[state=active]:text-[#494be3] data-[state=active]:shadow-none text-colorMuted hover:text-colorTitle cursor-pointer"
                >
                  <div className="flex items-center justify-between w-full">
                    Contentieux
                    <span className="text-xs">10</span>
                  </div>
                </TabsTrigger>
                <TabsTrigger
                  value="recl"
                  className="w-full justify-start data-[state=active]:bg-[#494be314] data-[state=active]:text-[#494be3] data-[state=active]:shadow-none text-colorMuted hover:text-colorTitle cursor-pointer"
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
                  <div className="col-span-12 lg:col-span-4">
                    <div className="block-search w-[320px] max-w-full relative flex items-center">
                      <div className="icon absolute left-2 text-colorTitle">
                        <Search size={18} />
                      </div>
                      <Input
                        type="text"
                        value={searchIdent}
                        onChange={(e) => setSearchIdent(e.target.value)}
                        className="shadow-none h-10 pl-8 rounded-lg border-borderInput placeholder:text-colorMuted placeholder:opacity-70"
                        placeholder="Recherche (immat, chassis, marque, modèle, ...)"
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
                      {renderAppurerButton("ident")}
                      <div className="block-selects flex border border-borderInput rounded-lg">
                        <Select value={filterMarque} onValueChange={(v) => setFilterMarque(v)}>
                          <SelectTrigger className="w-[180px] shadow-none border-0 rounded-none border-r border-borderInput text-colorTitle">
                            <SelectValue placeholder="Marque" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectGroup>
                              <SelectLabel>Marque</SelectLabel>
                              {filterOptions.marquesOptions.map((m) => (
                                <SelectItem key={m} value={m}>{m}</SelectItem>
                              ))}
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                        <Select value={filterModele} onValueChange={(v) => setFilterModele(v)}>
                          <SelectTrigger className="w-[180px] shadow-none border-0 rounded-none border-r border-borderInput text-colorTitle">
                            <SelectValue placeholder="Modèle" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectGroup>
                              <SelectLabel>Modèle</SelectLabel>
                              {filterOptions.modelesOptions.map((m) => (
                                <SelectItem key={m} value={m}>{m}</SelectItem>
                              ))}
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                        <Select value={filterCarrosserie} onValueChange={(v) => setFilterCarrosserie(v)}>
                          <SelectTrigger className="w-[180px] shadow-none border-0 rounded-none">
                            <SelectValue placeholder="Carrosserie" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectGroup>
                              <SelectLabel>Carrosserie</SelectLabel>
                              {filterOptions.carrosseriesOptions.map((c) => (
                                <SelectItem key={c} value={c}>{c}</SelectItem>
                              ))}
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
                            filteredItems.map((_, i) => String(i)),
                            true
                          )}
                        </th>
                        <th>N° matricule</th>
                        <th>N° chassis</th>
                        <th>Année</th>
                        <th>Poids</th>
                        <th>Moteur</th>
                        <th>Marque</th>
                        <th>Modèle</th>
                        <th>Carrosserie</th>
                        <th>Couleur</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredItems.length === 0 ? (
                        <tr>
                          <td colSpan={11} className="text-center text-colorMuted py-6">
                            Véhicule non trouvé
                          </td>
                        </tr>
                      ) : (
                        renderTableRows("ident")
                      )}
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
                            filteredItems.map((_, i) => String(i)),
                            true
                          )}
                        </th>
                        <th>N° matricule</th>
                        <th>N° chassis</th>
                        <th>Année</th>
                        <th>Poids</th>
                        <th>Moteur</th>
                        <th>Marque</th>
                        <th>Modèle</th>
                        <th>Carrosserie</th>
                        <th>Couleur</th>
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
                            filteredItems.map((_, i) => String(i)),
                            true
                          )}
                        </th>
                        <th>N° matricule</th>
                        <th>N° chassis</th>
                        <th>Année</th>
                        <th>Poids</th>
                        <th>Moteur</th>
                        <th>Marque</th>
                        <th>Modèle</th>
                        <th>Carrosserie</th>
                        <th>Couleur</th>
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
                            filteredItems.map((_, i) => String(i)),
                            true
                          )}
                        </th>
                        <th>N° matricule</th>
                        <th>N° chassis</th>
                        <th>Année</th>
                        <th>Poids</th>
                        <th>Moteur</th>
                        <th>Marque</th>
                        <th>Modèle</th>
                        <th>Carrosserie</th>
                        <th>Couleur</th>
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
                            filteredItems.map((_, i) => String(i)),
                            true
                          )}
                        </th>
                        <th>N° matricule</th>
                        <th>N° chassis</th>
                        <th>Année</th>
                        <th>Poids</th>
                        <th>Moteur</th>
                        <th>Marque</th>
                        <th>Modèle</th>
                        <th>Carrosserie</th>
                        <th>Couleur</th>
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
                            filteredItems.map((_, i) => String(i)),
                            true
                          )}
                        </th>
                        <th>N° matricule</th>
                        <th>N° chassis</th>
                        <th>Année</th>
                        <th>Poids</th>
                        <th>Moteur</th>
                        <th>Marque</th>
                        <th>Modèle</th>
                        <th>Carrosserie</th>
                        <th>Couleur</th>
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
                            filteredItems.map((_, i) => String(i)),
                            true
                          )}
                        </th>
                        <th>N° matricule</th>
                        <th>N° chassis</th>
                        <th>Année</th>
                        <th>Poids</th>
                        <th>Moteur</th>
                        <th>Marque</th>
                        <th>Modèle</th>
                        <th>Carrosserie</th>
                        <th>Couleur</th>
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
                            filteredItems.map((_, i) => String(i)),
                            true
                          )}
                        </th>
                        <th>N° matricule</th>
                        <th>N° chassis</th>
                        <th>Année</th>
                        <th>Poids</th>
                        <th>Moteur</th>
                        <th>Marque</th>
                        <th>Modèle</th>
                        <th>Carrosserie</th>
                        <th>Couleur</th>
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
                            filteredItems.map((_, i) => String(i)),
                            true
                          )}
                        </th>
                        <th>N° matricule</th>
                        <th>N° chassis</th>
                        <th>Année</th>
                        <th>Poids</th>
                        <th>Moteur</th>
                        <th>Marque</th>
                        <th>Modèle</th>
                        <th>Carrosserie</th>
                        <th>Couleur</th>
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
                            filteredItems.map((_, i) => String(i)),
                            true
                          )}
                        </th>
                        <th>N° matricule</th>
                        <th>N° chassis</th>
                        <th>Année</th>
                        <th>Poids</th>
                        <th>Moteur</th>
                        <th>Marque</th>
                        <th>Modèle</th>
                        <th>Carrosserie</th>
                        <th>Couleur</th>
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
                            filteredItems.map((_, i) => String(i)),
                            true
                          )}
                        </th>
                        <th>N° matricule</th>
                        <th>N° chassis</th>
                        <th>Année</th>
                        <th>Poids</th>
                        <th>Moteur</th>
                        <th>Marque</th>
                        <th>Modèle</th>
                        <th>Carrosserie</th>
                        <th>Couleur</th>
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
                            filteredItems.map((_, i) => String(i)),
                            true
                          )}
                        </th>
                        <th>N° matricule</th>
                        <th>N° chassis</th>
                        <th>Année</th>
                        <th>Poids</th>
                        <th>Moteur</th>
                        <th>Marque</th>
                        <th>Modèle</th>
                        <th>Carrosserie</th>
                        <th>Couleur</th>
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
                            filteredItems.map((_, i) => String(i)),
                            true
                          )}
                        </th>
                        <th>N° matricule</th>
                        <th>N° chassis</th>
                        <th>Année</th>
                        <th>Poids</th>
                        <th>Moteur</th>
                        <th>Marque</th>
                        <th>Modèle</th>
                        <th>Carrosserie</th>
                        <th>Couleur</th>
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
                            filteredItems.map((_, i) => String(i)),
                            true
                          )}
                        </th>
                        <th>N° matricule</th>
                        <th>N° chassis</th>
                        <th>Année</th>
                        <th>Poids</th>
                        <th>Moteur</th>
                        <th>Marque</th>
                        <th>Modèle</th>
                        <th>Carrosserie</th>
                        <th>Couleur</th>
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
    </>
  );
};

export default TableVehicules;
