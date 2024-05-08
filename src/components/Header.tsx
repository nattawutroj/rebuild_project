import React from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import { useAuth } from "@/hooks";
import Logo from "@/assets/icon/logo.png";
import LogoutIcon from "@/assets/icon/logout.svg";
import {
  Menubar, MenubarCheckboxItem, MenubarContent, MenubarGroup, MenubarItem, MenubarLabel, MenubarMenu, MenubarRadioGroup, MenubarRadioItem, MenubarSeparator, MenubarPortal, MenubarShortcut, MenubarTrigger
} from "@/components/ui/menubar"
import { LucidePersonStanding } from "lucide-react";

const Header: React.FC = () => {
  const navigate = useNavigate({ from: "/_app" });
  const [openCommand, setOpenCommand] = React.useState(false);
  const { user, isAuthenticated, setUser, iseditProfileModal, isopenPasswordModal, setIseditProfileModal, setIsopenPasswordModal } = useAuth();
  console.log("user", iseditProfileModal);
  console.log("u11ser", isopenPasswordModal);
  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("token");
    navigate({ to: "/login", search: { redirect: "/" } });
  };



  return (
    <header className="flex items-center justify-between bg-white px-5 py-3.5">
      <Link className="flex items-start gap-4" to="/">
        <img
          loading="lazy"
          src={Logo}
          alt="CapitalPlatforms Logo"
          className="w-auto h-16"
        />
        <div className="font-kanit align-text-bottom mt-3 font-medium text-2xl">ระบบบริหารจัดการข้อมูลโครงงานพิเศษ</div>
      </Link>
      <div className="flex items-start gap-4"></div>

      <div className="flex items-center gap-4">
        {isAuthenticated && (
          <>
            <div className="text-sm font-kanit">
              Welcome,{user?.data?.first_name_th}
              <span className="font-bold text-sky-600">{user.data.teachers_first_name}</span>!
            </div>
            {user?.data?.id_role === 1 ?
              <Link
                to="/login"
                onClick={handleLogout}
                search={{ redirect: "/" }}
                className="flex h-8 w-8 items-center justify-center rounded-full border border-slate-200 bg-slate-100 p-1.5"
              >
                <img
                  loading="lazy"
                  src={LogoutIcon}
                  alt="Profile"
                  className="h-4 w-4"
                />
              </Link>
              :
              <Menubar className="flex h-8 w-8 items-center justify-center rounded-full border border-slate-200 bg-slate-100 p-1.5 hover:bg-slate-300">
                <MenubarMenu >
                  <MenubarTrigger  ><LucidePersonStanding /></MenubarTrigger>
                  <MenubarContent>
                    <MenubarItem>
                      <Link
                        onClick={() => setIseditProfileModal(true)}
                        className="font-kanit"
                      >เปลี่ยนข้อมูลส่วนตัว</Link>
                    </MenubarItem>
                    <MenubarItem>
                      <Link
                        onClick={() => setIsopenPasswordModal(true)}
                        className="font-kanit"
                      >เปลี่ยนรหัสผ่าน</Link>
                    </MenubarItem>
                    <MenubarSeparator />
                    <MenubarItem>
                      <Link
                        to="/login"
                        onClick={handleLogout}
                        search={{ redirect: "/" }}
                        className="font-kanit"
                      >ออกจากระบบ</Link>
                    </MenubarItem>
                  </MenubarContent>
                </MenubarMenu>
              </Menubar>
            }
          </>
        )}
      </div>
    </header>
  );
};

export default Header;


