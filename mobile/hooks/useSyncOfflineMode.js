// src/hooks/useSyncOfflineMode.js
import { useEffect } from "react";
import { useNetworkStatus } from "./useNetworkStatus";

export function useSyncOfflineMode() {
  const isConnected = useNetworkStatus();

  useEffect(() => {
    // Atualiza flag global sempre que o status de conexão muda
    globalThis.__OFFLINE_MODE__ = !isConnected;
    console.log(`[Modo Offline] ${!isConnected ? "ATIVADO" : "DESATIVADO"}`);
  }, [isConnected]);
}
