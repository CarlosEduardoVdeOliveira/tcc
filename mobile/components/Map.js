import * as Location from "expo-location";
import { useCallback, useEffect, useRef, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
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
    if (onSelectLocationRef.current) {
      onSelectLocationRef.current([coords.latitude, coords.longitude]);
    }
  }, []);

  useEffect(() => {
    console.log("Map useEffect - latitude:", latitude, "longitude:", longitude);
    
    // Se coordenadas foram passadas como props, use-as como posição inicial
    if (latitude && longitude && latitude !== 0 && longitude !== 0) {
      const coords = { 
        latitude: parseFloat(latitude), 
        longitude: parseFloat(longitude) 
      };
      console.log("Setting marker position from props:", coords);
      setMarkerPosition(coords);
      setIsLocationLoaded(true);
      return;
    }

    // Se não há coordenadas iniciais válidas, use geolocalização
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.warn("Permissão de localização negada.");
        const fallback = { latitude: -19.55, longitude: -42.64 };
        console.log("Using fallback coordinates:", fallback);
        setMarkerPosition(fallback);
        setIsLocationLoaded(true);
        handleLocationSelect(fallback);
        return;
      }

      const location = await Location.getCurrentPositionAsync({});
      const coords = {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      };
      console.log("Using current location:", coords);
      setMarkerPosition(coords);
      setIsLocationLoaded(true);
      handleLocationSelect(coords);
    })();
  }, [latitude, longitude, handleLocationSelect]);

  if (!isLocationLoaded) {
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
      onPress={(e) => {
        const coords = e.nativeEvent.coordinate;
        setMarkerPosition(coords);
        handleLocationSelect(coords);
      }}
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
