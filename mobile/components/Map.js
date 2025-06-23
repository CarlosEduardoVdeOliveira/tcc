import * as Location from "expo-location";
import { useCallback, useEffect, useRef, useState } from "react";
import { Alert, StyleSheet, Text, View } from "react-native";
import MapView, { Marker } from "react-native-maps";

function Map({ onSelectLocation, latitude, longitude, style, ...props }) {
  const [markerPosition, setMarkerPosition] = useState(null);
  const [isLocationLoaded, setIsLocationLoaded] = useState(false);
  const onSelectLocationRef = useRef(onSelectLocation);

  // Update ref when callback changes
  useEffect(() => {
    onSelectLocationRef.current = onSelectLocation;
  }, [onSelectLocation]);

  // Memoize the callback to prevent infinite re-renders
  const handleLocationSelect = useCallback((coords) => {
    console.log("[Map] handleLocationSelect chamado com:", coords);
    if (onSelectLocationRef.current) {
      onSelectLocationRef.current([coords.latitude, coords.longitude]);
    }
  }, []);

  useEffect(() => {
    console.log("[Map] useEffect - latitude:", latitude, "longitude:", longitude);
    
    // Se coordenadas foram passadas como props, use-as como posição inicial
    if (latitude && longitude && latitude !== 0 && longitude !== 0) {
      const coords = { 
        latitude: parseFloat(latitude), 
        longitude: parseFloat(longitude) 
      };
      console.log("[Map] Setting marker position from props:", coords);
      setMarkerPosition(coords);
      setIsLocationLoaded(true);
      return;
    }

    // Se não há coordenadas iniciais válidas, use geolocalização
    (async () => {
      try {
        console.log("[Map] Solicitando permissão de localização...");
        const { status } = await Location.requestForegroundPermissionsAsync();
        
        if (status !== "granted") {
          console.warn("[Map] Permissão de localização negada.");
          Alert.alert(
            "Permissão Necessária",
            "Para usar o mapa, é necessário permitir o acesso à localização.",
            [{ text: "OK" }]
          );
          
          const fallback = { latitude: -19.55, longitude: -42.64 }; // Coordenadas padrão
          console.log("[Map] Using fallback coordinates:", fallback);
          setMarkerPosition(fallback);
          setIsLocationLoaded(true);
          handleLocationSelect(fallback);
          return;
        }

        console.log("[Map] Obtendo localização atual...");
        const location = await Location.getCurrentPositionAsync({
          accuracy: Location.Accuracy.High,
          timeout: 10000,
        });
        
        const coords = {
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
        };
        console.log("[Map] Localização atual obtida:", coords);
        setMarkerPosition(coords);
        setIsLocationLoaded(true);
        handleLocationSelect(coords);
      } catch (error) {
        console.error("[Map] Erro ao obter localização:", error);
        
        const fallback = { latitude: -19.55, longitude: -42.64 };
        console.log("[Map] Using fallback coordinates due to error:", fallback);
        setMarkerPosition(fallback);
        setIsLocationLoaded(true);
        handleLocationSelect(fallback);
      }
    })();
  }, [latitude, longitude, handleLocationSelect]);

  const handleMapPress = (e) => {
    const coords = e.nativeEvent.coordinate;
    console.log("[Map] Mapa pressionado em:", coords);
    setMarkerPosition(coords);
    handleLocationSelect(coords);
  };

  if (!isLocationLoaded || !markerPosition) {
    return (
      <View style={[styles.loadingContainer, style]}>
        <Text style={styles.loadingText}>Carregando mapa...</Text>
      </View>
    );
  }

  return (
    <MapView
      style={[styles.map, style]}
      initialRegion={{
        ...markerPosition,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      }}
      onPress={handleMapPress}
      {...props}
    >
      <Marker coordinate={markerPosition} />
    </MapView>
  );
}

const styles = StyleSheet.create({
  map: {
    width: "100%",
    height: 200,
  },
  loadingContainer: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f3f4f6",
    borderRadius: 8,
    height: 200,
  },
  loadingText: {
    color: "#6b7280",
    fontSize: 14,
  },
});

export default Map;
