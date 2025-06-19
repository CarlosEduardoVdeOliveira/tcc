import React from "react";
import { StyleSheet, Text, View } from "react-native";

function Map({ onSelectLocation, latitude, longitude, style, ...props }) {
  return (
    <View style={[styles.map, style]}>
      <Text style={styles.mapText}>
        Mapa da Colmeia
      </Text>
      <Text style={styles.coordinatesText}>
        Lat: {latitude || 'N/A'}, Lng: {longitude || 'N/A'}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  map: {
    width: "100%",
    height: 200,
    backgroundColor: "#f3f4f6",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
  },
  mapText: {
    color: "#6b7280",
    fontSize: 16,
    fontWeight: "500",
  },
  coordinatesText: {
    color: "#9ca3af",
    fontSize: 12,
    marginTop: 4,
  },
});

export default Map;
