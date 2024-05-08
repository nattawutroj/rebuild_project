import React, { useState, ReactNode } from "react";
import { AuthContext, AuthContextType } from "@/contexts";
import { User } from "@/types/User";
import { USER_ROLES } from "@/constants/roles";

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null | undefined>(null);
  const [isopenPasswordModal, setIsopenPasswordModal] = useState<any>(false);
  const [iseditProfileModal, setIseditProfileModal] = useState<any>(false);

  

  const value: AuthContextType = {
    isAuthenticated: !!user,
    user,
    setUser,
    isSuperAdmin: true,
    isopenPasswordModal,
    setIsopenPasswordModal,
    iseditProfileModal,
    setIseditProfileModal,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
