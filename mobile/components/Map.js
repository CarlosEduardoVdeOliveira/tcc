import * as Location from "expo-location";
import { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import MapView, { Marker } from "react-native-maps";

function Map({ onSelectLocation }) {
  const [markerPosition, setMarkerPosition] = useState(null);

  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.warn("Permissão de localização negada.");
        const fallback = { latitude: -19.55, longitude: -42.64 };
        setMarkerPosition(fallback);
        onSelectLocation([fallback.latitude, fallback.longitude]);
        return;
      }

      const location = await Location.getCurrentPositionAsync({});
      const coords = {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      };
      setMarkerPosition(coords);
      onSelectLocation([coords.latitude, coords.longitude]);
    })();
  }, []);

  if (!markerPosition)
    return (
      <View style={styles.loadingContainer}>
        <Text>Carregando mapa...</Text>
      </View>
    );

  return (
    <MapView
      style={styles.map}
      initialRegion={{
        ...markerPosition,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      }}
      onPress={(e) => {
        const coords = e.nativeEvent.coordinate;
        setMarkerPosition(coords);
        onSelectLocation([coords.latitude, coords.longitude]);
      }}
    >
      <Marker coordinate={markerPosition} />
    </MapView>
  );
}

const styles = StyleSheet.create({
  map: {
    width: "100%",
    height: 400,
  },
  loadingContainer: {
    justifyContent: "center",
    alignItems: "center",
    height: 400,
  },
});
export default Map;
