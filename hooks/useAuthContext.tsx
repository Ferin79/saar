import { AuthContext, AuthContextType } from "@/context/AuthContext";
import { useContext } from "react";

export const useAuthContext = () => {
  const context = useContext(AuthContext) as AuthContextType;
  return context;
};
