import { User } from "@/types/User";
import { createContext } from "react";

export interface AuthContextType {
  isAuthenticated: boolean;
  isSuperAdmin: boolean;
  user: User | null | undefined | any;
  setUser: (userInfo: User | null | undefined) => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined,
);
