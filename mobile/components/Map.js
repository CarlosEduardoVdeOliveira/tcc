import * as Location from "expo-location";
import { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import MapView, { Marker } from "react-native-maps";

function Map({ onSelectLocation, latitude, longitude, style, ...props }) {
  const [markerPosition, setMarkerPosition] = useState(null);
  const [isLocationLoaded, setIsLocationLoaded] = useState(false);

  useEffect(() => {
    // Se coordenadas foram passadas como props, use-as como posição inicial
    if (latitude && longitude) {
      const coords = { latitude: parseFloat(latitude), longitude: parseFloat(longitude) };
      setMarkerPosition(coords);
      setIsLocationLoaded(true);
      if (onSelectLocation) {
        onSelectLocation([coords.latitude, coords.longitude]);
      }
      return;
    }

    // Se não há coordenadas iniciais, use geolocalização
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.warn("Permissão de localização negada.");
        const fallback = { latitude: -19.55, longitude: -42.64 };
        setMarkerPosition(fallback);
        setIsLocationLoaded(true);
        if (onSelectLocation) {
          onSelectLocation([fallback.latitude, fallback.longitude]);
        }
        return;
      }

      const location = await Location.getCurrentPositionAsync({});
      const coords = {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      };
      setMarkerPosition(coords);
      setIsLocationLoaded(true);
      if (onSelectLocation) {
        onSelectLocation([coords.latitude, coords.longitude]);
      }
    })();
  }, [latitude, longitude, onSelectLocation]);

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
        if (onSelectLocation) {
          onSelectLocation([coords.latitude, coords.longitude]);
        }
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
  },
  loadingText: {
    color: "#6b7280",
    fontSize: 14,
  },
});

export default Map;
