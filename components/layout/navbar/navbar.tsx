import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ChevronDown } from "lucide-react";
import { Bell, Search, Sun, ArrowDown, LogOut } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useNextAuth } from "@/app/contexts/auth/useNextAuth";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Navbar = () => {
  const { user, payerId, logout } = useNextAuth();

  return (
    <div className="nav bg-blueDarken  sticky top-0 z-50">
      <div className="barreEtat absolute top-0 flex justify-center w-full">
        <div className="contentBarre w-[50%] flex">
          <div className="barre w-[Calc(100%/3)] h-[2px] bg-[#007ef9]"></div>
           <div className="barre w-[Calc(100%/3)] h-[2px] bg-[#f5ce03]"></div>
            <div className="barre w-[Calc(100%/3)] h-[2px] bg-[#d40212]"></div>
        </div>
      </div>
      <div className="container-fluid px-3 lg:px-3 2xl:px-6 max-w-[1600px] mx-auto">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center lg:gap-14">
            <Link href={"/"}>
              <Image
                src={"/images/logos/logo-etaxe-white.png"}
                className="lg:w-[120px!important]"
                width={0}
                height={0}
                layout="responsive"
                alt="logo de e-taxe"
              />
            </Link>
          </div>
          <div className="block-links">
            <ul className="flex items-center gap-2 rounded-full">
              <li className="relative">
                <Link
                  href={"/"}
                  className="py-[22px] px-[18px] rounded-full flex text-primaryColor relative duration-300 font-medium text-sm opacity-90 items-center gap-1 hover:opacity-100"
                >
                  Dashboard
                  <div className="line absolute w-full h-1 bg-primaryColor rounded-2xl left-0 bottom-0"></div>
                </Link>
              </li>
              <li className="relative group">
                <Link
                  href={"#"}
                  className="py-[8px] px-[14px] rounded-full flex text-white duration-300 font-medium text-sm opacity-90 items-center gap-1 hover:opacity-100"
                >
                  Assiètes
                  <ArrowDown size={16}></ArrowDown>
                </Link>
                <div className="drop-block absolute top-[100%] bg-bgCard left-0 w-[220px] p-[18px] rounded-[12px] opacity-0 duration-300 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto">
                  <ul className="flex flex-col gap-2">
                    <li>
                      <Link
                        href={"/assietes/immobiliers"}
                        className="text-sm text-colorTitle font-medium hover:text-primaryColor duration-300"
                      >
                        Immobiliers
                      </Link>
                    </li>
                    <li>
                      <Link
                        href={"/assietes/vehicules"}
                        className="text-sm text-colorTitle font-medium hover:text-primaryColor duration-300"
                      >
                        Véhicules
                      </Link>
                    </li>
                    <li>
                      <Link
                        href={"/assietes/activites"}
                        className="text-sm text-colorTitle font-medium hover:text-primaryColor duration-300"
                      >
                        Activités commerciales
                      </Link>
                    </li>
                    <li>
                      <Link
                        href={"/assietes/contrat-bail"}
                        className="text-sm text-colorTitle font-medium hover:text-primaryColor duration-300"
                      >
                        Contrats de bail
                      </Link>
                    </li>
                    <li>
                      <Link
                        href={"/assietes/contrat-travail"}
                        className="text-sm text-colorTitle font-medium hover:text-primaryColor duration-300"
                      >
                        Contrats de travail
                      </Link>
                    </li>
                  </ul>
                </div>
              </li>
              <li className="relative">
                <Link
                  href={"/"}
                  className="py-[8px] px-[14px] rounded-full flex text-white duration-300 font-medium text-sm opacity-90 items-center gap-1 hover:opacity-100"
                >
                  Rapports
                </Link>
              </li>
              <li className="relative">
                <Link
                  href={"/"}
                  className="py-[8px] px-[14px] rounded-full flex text-white duration-300 font-medium text-sm opacity-90 items-center gap-1 hover:opacity-100"
                >
                  Paramètres
                </Link>
              </li>
            </ul>
          </div>
          <div className="flex justify-end items-center lg:gap-4">
            <div className="toggle-theme cursor-pointer">
              <div className="content-toggle-theme w-[40px] bg-[#ffffff1c] rounded-full h-[22px] flex items-center rounde-full">
                <div className="bubble-icon rounded-full bg-white w-[18px] h-[18px] flex items-center justify-center">
                  <Sun size={14} />
                </div>
              </div>
            </div>
            <Link
              href={"#"}
              className="text-white flex items-center justify-center"
            >
              <Search size={22}></Search>
            </Link>
            <Link
              href={"#"}
              className="text-white flex items-center justify-center"
            >
              <Bell size={22}></Bell>
            </Link>
            <DropdownMenu>
              <DropdownMenuTrigger className="block-avatar flex items-center gap-1 p-[5px] bg-[#ffffff1c] text-white rounded-full hover:bg-[#ffffff2c] transition-colors">
                <Avatar className="w-[32px] h-[32px]">
                  <AvatarImage
                    src="https://github.com/shadcn.png"
                    alt={user?.name || "User"}
                  />
                  <AvatarFallback className="bg-bgCard text-colorTitle text-sm font-medium">
                    {user?.name ? user.name.substring(0, 2).toUpperCase() : "U"}
                  </AvatarFallback>
                </Avatar>
                <ChevronDown size={22} />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">
                      {user?.name || "Utilisateur"}
                    </p>
                    <p className="text-xs leading-none text-muted-foreground">
                      {user?.email}
                    </p>
                    <p className="text-xs leading-none text-muted-foreground">
                      Payer ID: {payerId}
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={logout} className="cursor-pointer">
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Se déconnecter</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
