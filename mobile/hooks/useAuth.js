import { useContext } from "react";
import { AuthContext } from "../contexts/auth.js";
import { useNetworkStatus } from "./useNetworkStatus.js"; // Exemplo: seu hook para status online/offline

export const useAuth = () => {
  const context = useContext(AuthContext);
  const { isOnline } = useNetworkStatus(); // Supondo que seu hook retorne isOnline
  if (!context) {
    throw new Error("useAuth deve ser usado dentro de um AuthProvider");
  }
  return {
    ...context,
    isOnline, // expos para poder usar no front se quiser controlar ações online/offline
  };
};
