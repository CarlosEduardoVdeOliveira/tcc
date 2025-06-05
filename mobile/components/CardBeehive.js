import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { formatDate } from "../utils/formatDate";
import { Map } from "./Map";

function CardBeehive({ beehive, ...props }) {
  return (
    <View style={styles.card}>
      <View style={styles.mapContainer}>
        <Map {...props} style={{ width: "100%", height: "100%" }} />
      </View>
      <View style={styles.details}>
        <Text><Text style={styles.label}>Nome: </Text>{beehive.name}</Text>
        <Text><Text style={styles.label}>Data: </Text>{formatDate(beehive.startDate)}</Text>
        <Text><Text style={styles.label}>Status: </Text>{beehive.status}</Text>
        <Text><Text style={styles.label}>Tipo: </Text>{beehive.typeBeehive}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    backgroundColor: "#f59e0b",
    padding: 8,
  },
  mapContainer: {
    width: 200,
    height: 200,
  },
  details: {
    padding: 16,
    justifyContent: "center",
  },
  label: {
    fontWeight: "bold",
  },
});
export default CardBeehive