// src/hooks/useNetworkStatus.js
import NetInfo from "@react-native-community/netinfo";
import { useEffect, useState } from "react";

export function useNetworkStatus() {
  const [isConnected, setIsConnected] = useState(true);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state) => {
      setIsConnected(state.isConnected && state.isInternetReachable !== false);
    });
    return () => unsubscribe();
  }, []);

  return isConnected;
}

// Hook adicional para obter informações detalhadas da rede
export function useDetailedNetworkStatus() {
  const [networkState, setNetworkState] = useState({
    isConnected: true,
    isInternetReachable: true,
    type: null,
    isWifi: false,
    isCellular: false,
    isEthernet: false,
    isUnknown: false,
    details: null
  });

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state) => {
      setNetworkState({
        isConnected: state.isConnected,
        isInternetReachable: state.isInternetReachable !== false,
        type: state.type,
        isWifi: state.type === 'wifi',
        isCellular: state.type === 'cellular',
        isEthernet: state.type === 'ethernet',
        isUnknown: state.type === 'unknown',
        details: state
      });
    });

    // Verificar estado inicial
    NetInfo.fetch().then((state) => {
      setNetworkState({
        isConnected: state.isConnected,
        isInternetReachable: state.isInternetReachable !== false,
        type: state.type,
        isWifi: state.type === 'wifi',
        isCellular: state.type === 'cellular',
        isEthernet: state.type === 'ethernet',
        isUnknown: state.type === 'unknown',
        details: state
      });
    });

    return () => unsubscribe();
  }, []);

  return networkState;
}
