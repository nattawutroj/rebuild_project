import React from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import { useAuth } from "@/hooks";
import Logo from "@/assets/icon/logo.png";
import LogoutIcon from "@/assets/icon/logout.svg";

const Header: React.FC = () => {
  const navigate = useNavigate({ from: "/_app" });

  const { user, isAuthenticated, setUser } = useAuth();
  console.log("user", user);
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
          </>
        )}
      </div>
    </header>
  );
};

export default Header;
