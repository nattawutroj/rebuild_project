import { createContext } from "react";

export interface AdminPanelContextValue {}

export const AdminPanelContext = createContext<
  AdminPanelContextValue | undefined
>(undefined);
