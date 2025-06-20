import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { isOfflineMode } from "../utils/config.js";

function OfflineStatus() {
  const offline = isOfflineMode();

  return (
    <View style={[styles.container, offline && styles.offlineContainer]}>
      <Icon 
        name={offline ? "cloud-offline" : "cloud"} 
        size={16} 
        color={offline ? "#ef4444" : "#22c55e"} 
      />
      <Text style={[styles.text, offline && styles.offlineText]}>
        {offline ? "Modo Offline" : "Modo Online"}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 50,
    left: 16,
    backgroundColor: "#fff",
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 8,
    flexDirection: "row",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    zIndex: 1000,
  },
  offlineContainer: {
    backgroundColor: "#fef2f2",
    borderWidth: 1,
    borderColor: "#fecaca",
  },
  text: {
    fontSize: 12,
    fontWeight: "600",
    color: "#22c55e",
    marginLeft: 4,
  },
  offlineText: {
    color: "#ef4444",
  },
});

export default OfflineStatus; 