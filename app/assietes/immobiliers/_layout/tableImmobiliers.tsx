import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { EllipsisVertical, Search } from "lucide-react";
import { useState, useMemo } from "react";
import { useNextAuth } from "@/app/contexts/auth/useNextAuth";
import { useTaxpayerImmovables } from "@/app/hooks/useTaxpayerImmovables";
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

// Types
interface ImmovableItem {
  id: string;
  nia: string;
  denomination: string;
  nature: string;
  usage: string;
  rang: string;
  sb: string;
  snb: string;
}

interface FilterState {
  search: string;
  nature: string | undefined;
  usage: string | undefined;
  rang: string | undefined;
}

const TableImmobiliers = () => {
  // États pour gérer les checkboxes de chaque onglet
  const [checkedItems, setCheckedItems] = useState<{ [key: string]: string[] }>({
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
  });

  // États pour les filtres de l'onglet Identifiés
  const [filters, setFilters] = useState<FilterState>({
    search: "",
    nature: undefined,
    usage: undefined,
    rang: undefined,
  });

  // Fonctions utilitaires
  const handleCheckboxChange = (tabKey: string, itemId: string, checked: boolean) => {
    setCheckedItems((prev) => ({
      ...prev,
      [tabKey]: checked
        ? [...prev[tabKey], itemId]
        : prev[tabKey].filter((id) => id !== itemId),
    }));
  };

  const handleSelectAll = (tabKey: string, allItemIds: string[], checked: boolean) => {
    setCheckedItems((prev) => ({
      ...prev,
      [tabKey]: checked ? allItemIds : [],
    }));
  };

  const handleAppurer = (tabKey: string) => {
    const selectedItems = checkedItems[tabKey];
    console.log(`Appurer les éléments sélectionnés pour ${tabKey}:`, selectedItems);
  };

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

  const handleFilterChange = (key: keyof FilterState, value: string | undefined) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const clearFilters = () => {
    setFilters({
      search: "",
      nature: undefined,
      usage: undefined,
      rang: undefined,
    });
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
          className="shadow-none data-[state=checked]:bg-[#494be3] data-[state=checked]:border-[#494be3]"
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
        className="shadow-none data-[state=checked]:bg-[#494be3] data-[state=checked]:border-[#494be3]"
        checked={checkedItems[tabKey].includes(itemId)}
        onCheckedChange={(checked) =>
          handleCheckboxChange(tabKey, itemId, checked as boolean)
        }
      />
    );
  };

  // Récupération des données réelles
  const { payerId } = useNextAuth();
  const { immovables, loading } = useTaxpayerImmovables(payerId);

  // Données pour l'onglet Identifiés (données réelles)
  const identItems: ImmovableItem[] = useMemo(() => 
    immovables.map((immovable, index) => ({
      id: immovable.taxId ?? String(index),
      nia: immovable.taxId ?? "",
      denomination: immovable.headLine ?? "",
      nature: immovable.nature ?? "",
      usage: immovable.usage ?? "",
      rang: immovable.range ?? "",
      sb: immovable.area,
      snb: "-", // D.non-batie non calculée pour l'instant
    })), [immovables]
  );

  // Options de filtres (uniques, triées)
  const filterOptions = useMemo(() => {
    const natures = new Set<string>();
    const usages = new Set<string>();
    const rangs = new Set<string>();
    
    identItems.forEach((item) => {
      if (item.nature) natures.add(item.nature);
      if (item.usage) usages.add(item.usage);
      if (item.rang) rangs.add(item.rang);
    });

    return {
      natures: Array.from(natures).sort((a, b) => a.localeCompare(b)),
      usages: Array.from(usages).sort((a, b) => a.localeCompare(b)),
      rangs: Array.from(rangs).sort((a, b) => a.localeCompare(b)),
    };
  }, [identItems]);

  // Liste filtrée (Identifiés)
  const identItemsFiltered = useMemo(() => {
    const { search, nature, usage, rang } = filters;
    const searchQuery = search.trim().toLowerCase();

    return identItems.filter((item) => {
      // Filtres par sélection
      if (nature && item.nature !== nature) return false;
      if (usage && item.usage !== usage) return false;
      if (rang && item.rang !== rang) return false;

      // Recherche textuelle
      if (!searchQuery) return true;
      
      const searchText = `${item.nia} ${item.denomination} ${item.nature} ${item.usage} ${item.rang}`.toLowerCase();
      return searchText.includes(searchQuery);
    });
  }, [identItems, filters]);

  // Affichage d'un loader pendant le chargement
  if (loading) {
    return (
      <Card className="rounded-[24px] shadow-[var(--boxShadowCard)!important] border-0 bg-bgCard p-6 min-h-[300px] flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="animate-spin rounded-full h-10 w-10 border-2 border-primaryColor border-t-transparent"></div>
          <p className="text-colorMuted text-sm">Chargement des immobiliers…</p>
        </div>
      </Card>
    );
  }

  const declItems = [
    {
      id: "2783730093",
      nia: "2783730093",
      denomination: "Immeuble commercial centre ville",
      nature: "Bureau",
      usage: "Commercial",
      rang: "1er",
      sb: "300 m2",
      snb: "100 m2",
      dateDeclaration: "15/01/2024",
    },
    {
      id: "2783730093-2",
      nia: "2783730093",
      denomination: "Immeuble commercial centre ville",
      nature: "Bureau",
      usage: "Commercial",
      rang: "2ème",
      sb: "250 m2",
      snb: "80 m2",
      dateDeclaration: "18/01/2024",
    },
  ];

  const payItems = [
    {
      id: "2783730094",
      nia: "2783730094",
      denomination: "Résidence privée",
      nature: "Maison",
      usage: "Résidentiel",
      rang: "RDC",
      sb: "200 m2",
      snb: "500 m2",
      datePaiement: "20/01/2024",
      montant: "150,000 FCFA",
    },
    {
      id: "2783730094-2",
      nia: "2783730094",
      denomination: "Résidence privée",
      nature: "Maison",
      usage: "Résidentiel",
      rang: "1er",
      sb: "180 m2",
      snb: "400 m2",
      datePaiement: "21/01/2024",
      montant: "120,000 FCFA",
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
                  className="w-full justify-start data-[state=active]:bg-[#494be314] data-[state=active]:text-[#494be3] data-[state=active]:shadow-none text-colorMuted hover:text-colorTitle cursor-pointer"
                >
                  <div className="flex items-center justify-between w-full">
                    Identifiés
                    <span className="text-xs">{identItemsFiltered.length}</span>
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
              <h5 className="text-colorTitle font-semibold text-[18px] mb-1">
                Mes immobiliers
              </h5>
              <p className="text-colorMuted text-sm mb-6">
                Représente l’ensemble des biens immobiliers enregistrés à votre
                nom (terrains, maisons, immeubles, parcelles, etc.) et
                constituant l’assiette de l’
                <span className="text-colorTitle font-medium">
                  Impôt Foncier (IF)
                </span>
              </p>
              <Card className="rounded-[24px] shadow-[var(--boxShadowCard)!important] border-0 bg-bgCard lg:p-[18px]">
                <div className="grid grid-cols-12 gap-3 items-center">
                  <div className="col-span-12 lg:col-span-5">
                    <div className="block-search w-[320px] max-w-full relative flex items-center">
                      <div className="icon absolute left-2 text-colorTitle">
                        <Search size={18} />
                      </div>
                      <Input
                        type="text"
                        value={filters.search}
                        onChange={(e) => handleFilterChange('search', e.target.value)}
                        className="shadow-none h-10 pl-8 rounded-lg border-borderInput placeholder:text-colorMuted placeholder:opacity-70"
                        placeholder="Recherche (NIA, dénomination, nature, usage, rang...)"
                      />
                    </div>
                  </div>
                  <div className="col-span-12 lg:col-span-7">
                    <div className="flex lg:justify-end gap-2">
                      {renderAppurerButton("ident")}
                      <div className="block-selects flex border border-borderInput rounded-lg">
                        <Select 
                          value={filters.nature} 
                          onValueChange={(value) => handleFilterChange('nature', value)}
                        >
                          <SelectTrigger className="w-[180px] shadow-none border-0 rounded-none border-r border-borderInput text-colorTitle">
                            <SelectValue placeholder="Nature" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectGroup>
                              <SelectLabel>Nature</SelectLabel>
                              {filterOptions.natures.map((nature) => (
                                <SelectItem key={nature} value={nature}>
                                  {nature}
                                </SelectItem>
                              ))}
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                        <Select 
                          value={filters.usage} 
                          onValueChange={(value) => handleFilterChange('usage', value)}
                        >
                          <SelectTrigger className="w-[180px] shadow-none border-0 rounded-none border-r border-borderInput text-colorTitle">
                            <SelectValue placeholder="Usage" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectGroup>
                              <SelectLabel>Usage</SelectLabel>
                              {filterOptions.usages.map((usage) => (
                                <SelectItem key={usage} value={usage}>
                                  {usage}
                                </SelectItem>
                              ))}
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                        <Select 
                          value={filters.rang} 
                          onValueChange={(value) => handleFilterChange('rang', value)}
                        >
                          <SelectTrigger className="w-[180px] shadow-none border-0 rounded-none">
                            <SelectValue placeholder="Rang" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectGroup>
                              <SelectLabel>Rang</SelectLabel>
                              {filterOptions.rangs.map((rang) => (
                                <SelectItem key={rang} value={rang}>
                                  {rang}
                                </SelectItem>
                              ))}
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                      </div>
                      {(filters.search || filters.nature || filters.usage || filters.rang) && (
                        <Button
                          onClick={clearFilters}
                          variant="outline"
                          className="text-xs h-10 px-3"
                        >
                          Effacer
                        </Button>
                      )}
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
                            identItemsFiltered.map((i) => i.id),
                            true
                          )}
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
                      {identItemsFiltered.length === 0 ? (
                        <tr>
                          <td colSpan={9} className="text-center text-colorMuted py-6">
                            Aucun immobilier trouvé
                          </td>
                        </tr>
                      ) : (
                        identItemsFiltered.map((row) => (
                        <tr key={row.id}>
                          <td>{renderCheckbox("ident", row.id)}</td>
                          <td>
                            <span>{row.nia}</span>
                          </td>
                          <td>
                            <span>{row.denomination}</span>
                          </td>
                          <td>
                            <span>{row.nature}</span>
                          </td>
                          <td>
                            <span>{row.usage}</span>
                          </td>
                          <td>
                            <span>{row.rang}</span>
                          </td>
                          <td>
                            <span>{row.sb}</span>
                          </td>
                          <td>
                            <span>{row.snb}</span>
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
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </Card>
            </TabsContent>
            <TabsContent value="decl">
              <h5 className="text-colorTitle font-semibold text-[18px] mb-1">
                Mes immobiliers
              </h5>
              <p className="text-colorMuted text-sm mb-6">
                Représente l’ensemble des biens immobiliers enregistrés à votre
                nom (terrains, maisons, immeubles, parcelles, etc.) et
                constituant l’assiette de l’
                <span className="text-colorTitle font-medium">
                  Impôt Foncier (IF)
                </span>
              </p>
              <Card className="rounded-[24px] shadow-[var(--boxShadowCard)!important] border-0 bg-bgCard lg:p-[18px]">
                <div className="grid grid-cols-12 gap-3 items-center">
                  <div className="col-span-12 lg:col-span-5">
                    <h2 className="font-semibold text-colorTitle">
                      Liste des immobiliers déclarés
                    </h2>
                  </div>
                  <div className="col-span-12 lg:col-span-7">
                    <div className="flex lg:justify-end gap-2">
                      {renderAppurerButton("decl")}
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
                          {renderCheckbox(
                            "decl",
                            declItems.map((i) => i.id),
                            true
                          )}
                        </th>
                        <th>NIA</th>
                        <th>Dénommination</th>
                        <th>Nature</th>
                        <th>Usage</th>
                        <th>Rang</th>
                        <th>S. bâtie</th>
                        <th>S. non-bâtie</th>
                        <th>Date déclaration</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {declItems.map((row) => (
                        <tr key={row.id}>
                          <td>{renderCheckbox("decl", row.id)}</td>
                          <td>
                            <span>{row.nia}</span>
                          </td>
                          <td>
                            <span>{row.denomination}</span>
                          </td>
                          <td>
                            <span>{row.nature}</span>
                          </td>
                          <td>
                            <span>{row.usage}</span>
                          </td>
                          <td>
                            <span>{row.rang}</span>
                          </td>
                          <td>
                            <span>{row.sb}</span>
                          </td>
                          <td>
                            <span>{row.snb}</span>
                          </td>
                          <td>
                            <span>{row.dateDeclaration}</span>
                          </td>
                          <td>
                            <div className="flex items-center gap-3">
                              <Button className="cursor-pointer shadow-none bg-transparent  text-[#5f61e6]  hover:bg-transparent hover:text-[#494be3] text-md h-auto p-0">
                                Payer
                              </Button>
                              <DropdownMenu>
                                <DropdownMenuTrigger className="cursor-pointer bg-bgGray text-colorTitle p-0 w-[28px] flex items-center justify-center rounded-lg h-[28px] hover:bg-[#07192b] hover:text-white">
                                  <EllipsisVertical
                                    size={18}
                                  ></EllipsisVertical>
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
                      ))}
                    </tbody>
                  </table>
                </div>
              </Card>
            </TabsContent>
            <TabsContent value="pay">
              <h5 className="text-colorTitle font-semibold text-[18px] mb-1">
                Mes immobiliers
              </h5>
              <p className="text-colorMuted text-sm mb-6">
                Représente l’ensemble des biens immobiliers enregistrés à votre
                nom (terrains, maisons, immeubles, parcelles, etc.) et
                constituant l’assiette de l’
                <span className="text-colorTitle font-medium">
                  Impôt Foncier (IF)
                </span>
              </p>
              <Card className="rounded-[24px] shadow-[var(--boxShadowCard)!important] border-0 bg-bgCard lg:p-[18px]">
                <div className="grid grid-cols-12 gap-3 items-center">
                  <div className="col-span-12 lg:col-span-5">
                    <h2 className="font-semibold text-colorTitle">
                      Liste des immobiliers payés
                    </h2>
                  </div>
                  <div className="col-span-12 lg:col-span-7">
                    <div className="flex lg:justify-end gap-2">
                      {renderAppurerButton("pay")}
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
                          {renderCheckbox(
                            "pay",
                            payItems.map((i) => i.id),
                            true
                          )}
                        </th>
                        <th>NIA</th>
                        <th>Dénommination</th>
                        <th>Nature</th>
                        <th>Usage</th>
                        <th>Rang</th>
                        <th>S. bâtie</th>
                        <th>S. non-bâtie</th>
                        <th>Date paiement</th>
                        <th>Montant</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {payItems.map((row) => (
                        <tr key={row.id}>
                          <td>{renderCheckbox("pay", row.id)}</td>
                          <td>
                            <span>{row.nia}</span>
                          </td>
                          <td>
                            <span>{row.denomination}</span>
                          </td>
                          <td>
                            <span>{row.nature}</span>
                          </td>
                          <td>
                            <span>{row.usage}</span>
                          </td>
                          <td>
                            <span>{row.rang}</span>
                          </td>
                          <td>
                            <span>{row.sb}</span>
                          </td>
                          <td>
                            <span>{row.snb}</span>
                          </td>
                          <td>
                            <span>{row.datePaiement}</span>
                          </td>
                          <td>
                            <span>{row.montant}</span>
                          </td>
                          <td>
                            <div className="flex items-center gap-3">
                              <Button className="cursor-pointer shadow-none bg-transparent  text-[#5f61e6]  hover:bg-transparent hover:text-[#494be3] text-md h-auto p-0">
                                Reçu
                              </Button>
                              <DropdownMenu>
                                <DropdownMenuTrigger className="cursor-pointer bg-bgGray text-colorTitle p-0 w-[28px] flex items-center justify-center rounded-lg h-[28px] hover:bg-[#07192b] hover:text-white">
                                  <EllipsisVertical
                                    size={18}
                                  ></EllipsisVertical>
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
                                    Imprimer
                                  </DropdownMenuItem>
                                  <DropdownMenuItem className="text-sm text-colorTitle">
                                    Télécharger
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
              <h5 className="text-colorTitle font-semibold text-[18px] mb-1">
                Mes immobiliers
              </h5>
              <p className="text-colorMuted text-sm mb-6">
                Représente l’ensemble des biens immobiliers enregistrés à votre
                nom (terrains, maisons, immeubles, parcelles, etc.) et
                constituant l’assiette de l’
                <span className="text-colorTitle font-medium">
                  Impôt Foncier (IF)
                </span>
              </p>
              <Card className="rounded-[24px] shadow-[var(--boxShadowCard)!important] border-0 bg-bgCard lg:p-[18px]">
                <div className="grid grid-cols-12 gap-3 items-center">
                  <div className="col-span-12 lg:col-span-5">
                    <h2 className="font-semibold text-colorTitle">
                      Liste des immobiliers appurés
                    </h2>
                  </div>
                  <div className="col-span-12 lg:col-span-7">
                    <div className="flex lg:justify-end gap-2">
                      {renderAppurerButton("app")}
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
                        <th>{renderCheckbox("app", "2783730095", true)}</th>
                        <th>NIA</th>
                        <th>Dénommination</th>
                        <th>Nature</th>
                        <th>Usage</th>
                        <th>Rang</th>
                        <th>S. bâtie</th>
                        <th>S. non-bâtie</th>
                        <th>Date appurement</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>{renderCheckbox("app", "2783730095")}</td>
                        <td>
                          <span>2783730095</span>
                        </td>
                        <td>
                          <span>Immeuble administratif</span>
                        </td>
                        <td>
                          <span>Bureau</span>
                        </td>
                        <td>
                          <span>Administratif</span>
                        </td>
                        <td>
                          <span>3ème</span>
                        </td>
                        <td>
                          <span>400 m2</span>
                        </td>
                        <td>
                          <span>200 m2</span>
                        </td>
                        <td>
                          <span>25/01/2024</span>
                        </td>
                        <td>
                          <div className="flex items-center gap-3">
                            <Button className="cursor-pointer shadow-none bg-transparent  text-[#5f61e6]  hover:bg-transparent hover:text-[#494be3] text-md h-auto p-0">
                              Valider
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
            <TabsContent value="imp">
              <h5 className="text-colorTitle font-semibold text-[18px] mb-1">
                Mes immobiliers
              </h5>
              <p className="text-colorMuted text-sm mb-6">
                Représente l’ensemble des biens immobiliers enregistrés à votre
                nom (terrains, maisons, immeubles, parcelles, etc.) et
                constituant l’assiette de l’
                <span className="text-colorTitle font-medium">
                  Impôt Foncier (IF)
                </span>
              </p>
              <Card className="rounded-[24px] shadow-[var(--boxShadowCard)!important] border-0 bg-bgCard lg:p-[18px]">
                <div className="grid grid-cols-12 gap-3 items-center">
                  <div className="col-span-12 lg:col-span-5">
                    <h2 className="font-semibold text-colorTitle">
                      Liste des immobiliers - Imprimés des valeurs
                    </h2>
                  </div>
                  <div className="col-span-12 lg:col-span-7">
                    <div className="flex lg:justify-end gap-2">
                      {renderAppurerButton("imp")}
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
                        <th>{renderCheckbox("imp", "2783730096", true)}</th>
                        <th>NIA</th>
                        <th>Dénommination</th>
                        <th>Nature</th>
                        <th>Usage</th>
                        <th>Rang</th>
                        <th>S. bâtie</th>
                        <th>S. non-bâtie</th>
                        <th>Valeur locative</th>
                        <th>Date impression</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>{renderCheckbox("imp", "2783730096")}</td>
                        <td>
                          <span>2783730096</span>
                        </td>
                        <td>
                          <span>Immeuble de rapport</span>
                        </td>
                        <td>
                          <span>Appartement</span>
                        </td>
                        <td>
                          <span>Résidentiel</span>
                        </td>
                        <td>
                          <span>4ème</span>
                        </td>
                        <td>
                          <span>120 m2</span>
                        </td>
                        <td>
                          <span>50 m2</span>
                        </td>
                        <td>
                          <span>2,500,000 FCFA</span>
                        </td>
                        <td>
                          <span>30/01/2024</span>
                        </td>
                        <td>
                          <div className="flex items-center gap-3">
                            <Button className="cursor-pointer shadow-none bg-transparent  text-[#5f61e6]  hover:bg-transparent hover:text-[#494be3] text-md h-auto p-0">
                              Imprimer
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
                                  Télécharger
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
            <TabsContent value="dd">
              <h5 className="text-colorTitle font-semibold text-[18px] mb-1">
                Mes immobiliers
              </h5>
              <p className="text-colorMuted text-sm mb-6">
                Représente l’ensemble des biens immobiliers enregistrés à votre
                nom (terrains, maisons, immeubles, parcelles, etc.) et
                constituant l’assiette de l’
                <span className="text-colorTitle font-medium">
                  Impôt Foncier (IF)
                </span>
              </p>
              <Card className="rounded-[24px] shadow-[var(--boxShadowCard)!important] border-0 bg-bgCard lg:p-[18px]">
                <div className="grid grid-cols-12 gap-3 items-center">
                  <div className="col-span-12 lg:col-span-5">
                    <h2 className="font-semibold text-colorTitle">
                      Liste des immobiliers - Défauts en déclaration
                    </h2>
                  </div>
                  <div className="col-span-12 lg:col-span-7">
                    <div className="flex lg:justify-end gap-2">
                      {renderAppurerButton("dd")}
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
                        <th>{renderCheckbox("dd", "2783730097", true)}</th>
                        <th>NIA</th>
                        <th>Dénommination</th>
                        <th>Nature</th>
                        <th>Usage</th>
                        <th>Rang</th>
                        <th>S. bâtie</th>
                        <th>S. non-bâtie</th>
                        <th>Type défaut</th>
                        <th>Date défaut</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>{renderCheckbox("dd", "2783730097")}</td>
                        <td>
                          <span>2783730097</span>
                        </td>
                        <td>
                          <span>Immeuble industriel</span>
                        </td>
                        <td>
                          <span>Entrepôt</span>
                        </td>
                        <td>
                          <span>Industriel</span>
                        </td>
                        <td>
                          <span>RDC</span>
                        </td>
                        <td>
                          <span>800 m2</span>
                        </td>
                        <td>
                          <span>1000 m2</span>
                        </td>
                        <td>
                          <span>Déclaration tardive</span>
                        </td>
                        <td>
                          <span>05/02/2024</span>
                        </td>
                        <td>
                          <div className="flex items-center gap-3">
                            <Button className="cursor-pointer shadow-none bg-transparent  text-[#5f61e6]  hover:bg-transparent hover:text-[#494be3] text-md h-auto p-0">
                              Corriger
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
            <TabsContent value="dp">
              <h5 className="text-colorTitle font-semibold text-[18px] mb-1">
                Mes immobiliers
              </h5>
              <p className="text-colorMuted text-sm mb-6">
                Représente l’ensemble des biens immobiliers enregistrés à votre
                nom (terrains, maisons, immeubles, parcelles, etc.) et
                constituant l’assiette de l’
                <span className="text-colorTitle font-medium">
                  Impôt Foncier (IF)
                </span>
              </p>
              <Card className="rounded-[24px] shadow-[var(--boxShadowCard)!important] border-0 bg-bgCard lg:p-[18px]">
                <div className="grid grid-cols-12 gap-3 items-center">
                  <div className="col-span-12 lg:col-span-5">
                    <h2 className="font-semibold text-colorTitle">
                      Liste des immobiliers - Défauts de paiement
                    </h2>
                  </div>
                  <div className="col-span-12 lg:col-span-7">
                    <div className="flex lg:justify-end gap-2">
                      {renderAppurerButton("dp")}
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
                        <th>{renderCheckbox("dp", "2783730098", true)}</th>
                        <th>NIA</th>
                        <th>Dénommination</th>
                        <th>Nature</th>
                        <th>Usage</th>
                        <th>Rang</th>
                        <th>S. bâtie</th>
                        <th>S. non-bâtie</th>
                        <th>Montant dû</th>
                        <th>Date échéance</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>{renderCheckbox("dp", "2783730098")}</td>
                        <td>
                          <span>2783730098</span>
                        </td>
                        <td>
                          <span>Immeuble commercial</span>
                        </td>
                        <td>
                          <span>Magasin</span>
                        </td>
                        <td>
                          <span>Commercial</span>
                        </td>
                        <td>
                          <span>1er</span>
                        </td>
                        <td>
                          <span>150 m2</span>
                        </td>
                        <td>
                          <span>100 m2</span>
                        </td>
                        <td>
                          <span>75,000 FCFA</span>
                        </td>
                        <td>
                          <span>15/02/2024</span>
                        </td>
                        <td>
                          <div className="flex items-center gap-3">
                            <Button className="cursor-pointer shadow-none bg-transparent  text-[#5f61e6]  hover:bg-transparent hover:text-[#494be3] text-md h-auto p-0">
                              Payer
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
                                  Relancer
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
            <TabsContent value="fpc">
              <h5 className="text-colorTitle font-semibold text-[18px] mb-1">
                Mes immobiliers
              </h5>
              <p className="text-colorMuted text-sm mb-6">
                Représente l’ensemble des biens immobiliers enregistrés à votre
                nom (terrains, maisons, immeubles, parcelles, etc.) et
                constituant l’assiette de l’
                <span className="text-colorTitle font-medium">
                  Impôt Foncier (IF)
                </span>
              </p>
              <Card className="rounded-[24px] shadow-[var(--boxShadowCard)!important] border-0 bg-bgCard lg:p-[18px]">
                <div className="grid grid-cols-12 gap-3 items-center">
                  <div className="col-span-12 lg:col-span-5">
                    <h2 className="font-semibold text-colorTitle">
                      Liste des immobiliers - FPC
                    </h2>
                  </div>
                  <div className="col-span-12 lg:col-span-7">
                    <div className="flex lg:justify-end gap-2">
                      {renderAppurerButton("fpc")}
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
                        <th>{renderCheckbox("fpc", "2783730099", true)}</th>
                        <th>NIA</th>
                        <th>Dénommination</th>
                        <th>Nature</th>
                        <th>Usage</th>
                        <th>Rang</th>
                        <th>S. bâtie</th>
                        <th>S. non-bâtie</th>
                        <th>Montant FPC</th>
                        <th>Date FPC</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>{renderCheckbox("fpc", "2783730099")}</td>
                        <td>
                          <span>2783730099</span>
                        </td>
                        <td>
                          <span>Immeuble résidentiel</span>
                        </td>
                        <td>
                          <span>Villa</span>
                        </td>
                        <td>
                          <span>Résidentiel</span>
                        </td>
                        <td>
                          <span>RDC</span>
                        </td>
                        <td>
                          <span>300 m2</span>
                        </td>
                        <td>
                          <span>600 m2</span>
                        </td>
                        <td>
                          <span>200,000 FCFA</span>
                        </td>
                        <td>
                          <span>10/02/2024</span>
                        </td>
                        <td>
                          <div className="flex items-center gap-3">
                            <Button className="cursor-pointer shadow-none bg-transparent  text-[#5f61e6]  hover:bg-transparent hover:text-[#494be3] text-md h-auto p-0">
                              Traiter
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
                                  Valider
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
            <TabsContent value="amr">
              <h5 className="text-colorTitle font-semibold text-[18px] mb-1">
                Mes immobiliers
              </h5>
              <p className="text-colorMuted text-sm mb-6">
                Représente l’ensemble des biens immobiliers enregistrés à votre
                nom (terrains, maisons, immeubles, parcelles, etc.) et
                constituant l’assiette de l’
                <span className="text-colorTitle font-medium">
                  Impôt Foncier (IF)
                </span>
              </p>
              <Card className="rounded-[24px] shadow-[var(--boxShadowCard)!important] border-0 bg-bgCard lg:p-[18px]">
                <div className="grid grid-cols-12 gap-3 items-center">
                  <div className="col-span-12 lg:col-span-5">
                    <h2 className="font-semibold text-colorTitle">
                      Liste des immobiliers - AMR
                    </h2>
                  </div>
                  <div className="col-span-12 lg:col-span-7">
                    <div className="flex lg:justify-end gap-2">
                      {renderAppurerButton("amr")}
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
                        <th>{renderCheckbox("amr", "2783730100", true)}</th>
                        <th>NIA</th>
                        <th>Dénommination</th>
                        <th>Nature</th>
                        <th>Usage</th>
                        <th>Rang</th>
                        <th>S. bâtie</th>
                        <th>S. non-bâtie</th>
                        <th>Montant AMR</th>
                        <th>Date AMR</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>{renderCheckbox("amr", "2783730100")}</td>
                        <td>
                          <span>2783730100</span>
                        </td>
                        <td>
                          <span>Immeuble de bureaux</span>
                        </td>
                        <td>
                          <span>Bureau</span>
                        </td>
                        <td>
                          <span>Administratif</span>
                        </td>
                        <td>
                          <span>2ème</span>
                        </td>
                        <td>
                          <span>500 m2</span>
                        </td>
                        <td>
                          <span>300 m2</span>
                        </td>
                        <td>
                          <span>300,000 FCFA</span>
                        </td>
                        <td>
                          <span>12/02/2024</span>
                        </td>
                        <td>
                          <div className="flex items-center gap-3">
                            <Button className="cursor-pointer shadow-none bg-transparent  text-[#5f61e6]  hover:bg-transparent hover:text-[#494be3] text-md h-auto p-0">
                              Traiter
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
                                  Valider
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
            <TabsContent value="pour">
              <h5 className="text-colorTitle font-semibold text-[18px] mb-1">
                Mes immobiliers
              </h5>
              <p className="text-colorMuted text-sm mb-6">
                Représente l’ensemble des biens immobiliers enregistrés à votre
                nom (terrains, maisons, immeubles, parcelles, etc.) et
                constituant l’assiette de l’
                <span className="text-colorTitle font-medium">
                  Impôt Foncier (IF)
                </span>
              </p>
              <Card className="rounded-[24px] shadow-[var(--boxShadowCard)!important] border-0 bg-bgCard lg:p-[18px]">
                <div className="grid grid-cols-12 gap-3 items-center">
                  <div className="col-span-12 lg:col-span-5">
                    <h2 className="font-semibold text-colorTitle">
                      Liste des immobiliers - Poursuites
                    </h2>
                  </div>
                  <div className="col-span-12 lg:col-span-7">
                    <div className="flex lg:justify-end gap-2">
                      {renderAppurerButton("pour")}
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
                        <th>{renderCheckbox("pour", "2783730101", true)}</th>
                        <th>NIA</th>
                        <th>Dénommination</th>
                        <th>Nature</th>
                        <th>Usage</th>
                        <th>Rang</th>
                        <th>S. bâtie</th>
                        <th>S. non-bâtie</th>
                        <th>Montant poursuite</th>
                        <th>Date poursuite</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>{renderCheckbox("pour", "2783730101")}</td>
                        <td>
                          <span>2783730101</span>
                        </td>
                        <td>
                          <span>Immeuble commercial</span>
                        </td>
                        <td>
                          <span>Boutique</span>
                        </td>
                        <td>
                          <span>Commercial</span>
                        </td>
                        <td>
                          <span>1er</span>
                        </td>
                        <td>
                          <span>80 m2</span>
                        </td>
                        <td>
                          <span>50 m2</span>
                        </td>
                        <td>
                          <span>500,000 FCFA</span>
                        </td>
                        <td>
                          <span>15/02/2024</span>
                        </td>
                        <td>
                          <div className="flex items-center gap-3">
                            <Button className="cursor-pointer shadow-none bg-transparent  text-[#5f61e6]  hover:bg-transparent hover:text-[#494be3] text-md h-auto p-0">
                              Traiter
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
                                  Valider
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
            <TabsContent value="cc">
              <h5 className="text-colorTitle font-semibold text-[18px] mb-1">
                Mes immobiliers
              </h5>
              <p className="text-colorMuted text-sm mb-6">
                Représente l’ensemble des biens immobiliers enregistrés à votre
                nom (terrains, maisons, immeubles, parcelles, etc.) et
                constituant l’assiette de l’
                <span className="text-colorTitle font-medium">
                  Impôt Foncier (IF)
                </span>
              </p>
              <Card className="rounded-[24px] shadow-[var(--boxShadowCard)!important] border-0 bg-bgCard lg:p-[18px]">
                <div className="grid grid-cols-12 gap-3 items-center">
                  <div className="col-span-12 lg:col-span-5">
                    <h2 className="font-semibold text-colorTitle">
                      Liste des immobiliers - Contrainte et commandement
                    </h2>
                  </div>
                  <div className="col-span-12 lg:col-span-7">
                    <div className="flex lg:justify-end gap-2">
                      {renderAppurerButton("cc")}
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
                        <th>{renderCheckbox("cc", "2783730102", true)}</th>
                        <th>NIA</th>
                        <th>Dénommination</th>
                        <th>Nature</th>
                        <th>Usage</th>
                        <th>Rang</th>
                        <th>S. bâtie</th>
                        <th>S. non-bâtie</th>
                        <th>Montant contrainte</th>
                        <th>Date contrainte</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>{renderCheckbox("cc", "2783730102")}</td>
                        <td>
                          <span>2783730102</span>
                        </td>
                        <td>
                          <span>Immeuble résidentiel</span>
                        </td>
                        <td>
                          <span>Appartement</span>
                        </td>
                        <td>
                          <span>Résidentiel</span>
                        </td>
                        <td>
                          <span>3ème</span>
                        </td>
                        <td>
                          <span>100 m2</span>
                        </td>
                        <td>
                          <span>30 m2</span>
                        </td>
                        <td>
                          <span>750,000 FCFA</span>
                        </td>
                        <td>
                          <span>18/02/2024</span>
                        </td>
                        <td>
                          <div className="flex items-center gap-3">
                            <Button className="cursor-pointer shadow-none bg-transparent  text-[#5f61e6]  hover:bg-transparent hover:text-[#494be3] text-md h-auto p-0">
                              Traiter
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
                                  Valider
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
            <TabsContent value="adt">
              <h5 className="text-colorTitle font-semibold text-[18px] mb-1">
                Mes immobiliers
              </h5>
              <p className="text-colorMuted text-sm mb-6">
                Représente l’ensemble des biens immobiliers enregistrés à votre
                nom (terrains, maisons, immeubles, parcelles, etc.) et
                constituant l’assiette de l’
                <span className="text-colorTitle font-medium">
                  Impôt Foncier (IF)
                </span>
              </p>
              <Card className="rounded-[24px] shadow-[var(--boxShadowCard)!important] border-0 bg-bgCard lg:p-[18px]">
                <div className="grid grid-cols-12 gap-3 items-center">
                  <div className="col-span-12 lg:col-span-5">
                    <h2 className="font-semibold text-colorTitle">
                      Liste des immobiliers - ATD
                    </h2>
                  </div>
                  <div className="col-span-12 lg:col-span-7">
                    <div className="flex lg:justify-end gap-2">
                      {renderAppurerButton("adt")}
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
                        <th>{renderCheckbox("adt", "2783730103", true)}</th>
                        <th>NIA</th>
                        <th>Dénommination</th>
                        <th>Nature</th>
                        <th>Usage</th>
                        <th>Rang</th>
                        <th>S. bâtie</th>
                        <th>S. non-bâtie</th>
                        <th>Montant ATD</th>
                        <th>Date ATD</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>{renderCheckbox("adt", "2783730103")}</td>
                        <td>
                          <span>2783730103</span>
                        </td>
                        <td>
                          <span>Immeuble industriel</span>
                        </td>
                        <td>
                          <span>Usine</span>
                        </td>
                        <td>
                          <span>Industriel</span>
                        </td>
                        <td>
                          <span>RDC</span>
                        </td>
                        <td>
                          <span>1000 m2</span>
                        </td>
                        <td>
                          <span>2000 m2</span>
                        </td>
                        <td>
                          <span>1,000,000 FCFA</span>
                        </td>
                        <td>
                          <span>20/02/2024</span>
                        </td>
                        <td>
                          <div className="flex items-center gap-3">
                            <Button className="cursor-pointer shadow-none bg-transparent  text-[#5f61e6]  hover:bg-transparent hover:text-[#494be3] text-md h-auto p-0">
                              Traiter
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
                                  Valider
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
            <TabsContent value="con">
              <h5 className="text-colorTitle font-semibold text-[18px] mb-1">
                Mes immobiliers
              </h5>
              <p className="text-colorMuted text-sm mb-6">
                Représente l’ensemble des biens immobiliers enregistrés à votre
                nom (terrains, maisons, immeubles, parcelles, etc.) et
                constituant l’assiette de l’
                <span className="text-colorTitle font-medium">
                  Impôt Foncier (IF)
                </span>
              </p>
              <Card className="rounded-[24px] shadow-[var(--boxShadowCard)!important] border-0 bg-bgCard lg:p-[18px]">
                <div className="grid grid-cols-12 gap-3 items-center">
                  <div className="col-span-12 lg:col-span-5">
                    <h2 className="font-semibold text-colorTitle">
                      Liste des immobiliers - Contentieux
                    </h2>
                  </div>
                  <div className="col-span-12 lg:col-span-7">
                    <div className="flex lg:justify-end gap-2">
                      {renderAppurerButton("con")}
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
                        <th>{renderCheckbox("con", "2783730104", true)}</th>
                        <th>NIA</th>
                        <th>Dénommination</th>
                        <th>Nature</th>
                        <th>Usage</th>
                        <th>Rang</th>
                        <th>S. bâtie</th>
                        <th>S. non-bâtie</th>
                        <th>Type contentieux</th>
                        <th>Date contentieux</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>{renderCheckbox("con", "2783730104")}</td>
                        <td>
                          <span>2783730104</span>
                        </td>
                        <td>
                          <span>Immeuble commercial</span>
                        </td>
                        <td>
                          <span>Centre commercial</span>
                        </td>
                        <td>
                          <span>Commercial</span>
                        </td>
                        <td>
                          <span>RDC</span>
                        </td>
                        <td>
                          <span>2000 m2</span>
                        </td>
                        <td>
                          <span>1000 m2</span>
                        </td>
                        <td>
                          <span>Litige fiscal</span>
                        </td>
                        <td>
                          <span>22/02/2024</span>
                        </td>
                        <td>
                          <div className="flex items-center gap-3">
                            <Button className="cursor-pointer shadow-none bg-transparent  text-[#5f61e6]  hover:bg-transparent hover:text-[#494be3] text-md h-auto p-0">
                              Traiter
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
                                  Valider
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
            <TabsContent value="recl">
              <h5 className="text-colorTitle font-semibold text-[18px] mb-1">
                Mes immobiliers
              </h5>
              <p className="text-colorMuted text-sm mb-6">
                Représente l’ensemble des biens immobiliers enregistrés à votre
                nom (terrains, maisons, immeubles, parcelles, etc.) et
                constituant l’assiette de l’
                <span className="text-colorTitle font-medium">
                  Impôt Foncier (IF)
                </span>
              </p>
              <Card className="rounded-[24px] shadow-[var(--boxShadowCard)!important] border-0 bg-bgCard lg:p-[18px]">
                <div className="grid grid-cols-12 gap-3 items-center">
                  <div className="col-span-12 lg:col-span-5">
                    <h2 className="font-semibold text-colorTitle">
                      Liste des immobiliers - Réclamations
                    </h2>
                  </div>
                  <div className="col-span-12 lg:col-span-7">
                    <div className="flex lg:justify-end gap-2">
                      {renderAppurerButton("recl")}
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
                        <th>{renderCheckbox("recl", "2783730105", true)}</th>
                        <th>NIA</th>
                        <th>Dénommination</th>
                        <th>Nature</th>
                        <th>Usage</th>
                        <th>Rang</th>
                        <th>S. bâtie</th>
                        <th>S. non-bâtie</th>
                        <th>Type réclamation</th>
                        <th>Date réclamation</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>{renderCheckbox("recl", "2783730105")}</td>
                        <td>
                          <span>2783730105</span>
                        </td>
                        <td>
                          <span>Immeuble résidentiel</span>
                        </td>
                        <td>
                          <span>Appartement</span>
                        </td>
                        <td>
                          <span>Résidentiel</span>
                        </td>
                        <td>
                          <span>5ème</span>
                        </td>
                        <td>
                          <span>90 m2</span>
                        </td>
                        <td>
                          <span>20 m2</span>
                        </td>
                        <td>
                          <span>Erreur d&apos;évaluation</span>
                        </td>
                        <td>
                          <span>25/02/2024</span>
                        </td>
                        <td>
                          <div className="flex items-center gap-3">
                            <Button className="cursor-pointer shadow-none bg-transparent  text-[#5f61e6]  hover:bg-transparent hover:text-[#494be3] text-md h-auto p-0">
                              Traiter
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
                                  Valider
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
          </div>
        </Tabs>
      </div>
    </div>
  );
};

export default TableImmobiliers;
