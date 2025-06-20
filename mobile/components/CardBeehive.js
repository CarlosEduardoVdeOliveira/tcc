import { useNavigation } from "@react-navigation/native";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { formatDate } from "../utils/formatDate";
import Map from "./Map";

function CardBeehive({ beehive, ...props }) {
  const navigation = useNavigation();

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'ativo':
      case 'active':
        return { backgroundColor: '#dcfce7', color: '#166534', borderColor: '#bbf7d0' };
      case 'inativo':
      case 'inactive':
        return { backgroundColor: '#fee2e2', color: '#991b1b', borderColor: '#fecaca' };
      default:
        return { backgroundColor: '#f3f4f6', color: '#374151', borderColor: '#d1d5db' };
    }
  };

  const statusStyle = getStatusColor(beehive.status);

  const handlePress = () => {
    navigation.navigate("BeehiveDetails", { id: beehive.id });
  };

  return (
    <TouchableOpacity style={styles.card} onPress={handlePress} activeOpacity={0.7}>
      {/* Mapa */}
      <View style={styles.mapContainer}>
        <Map {...props} style={{ width: "100%", height: "100%" }} />
      </View>
      
      {/* Informações da colmeia */}
      <View style={styles.details}>
        {/* Nome da colmeia */}
        <View style={styles.nameContainer}>
          <Text style={styles.name}>{beehive.name}</Text>
          <Text style={styles.type}>Colmeia</Text>
        </View>
        
        {/* Detalhes */}
        <View style={styles.infoContainer}>
          <View style={styles.infoRow}>
            <Text style={styles.label}>Data de Início:</Text>
            <Text style={styles.value}>{formatDate(beehive.startDate)}</Text>
          </View>
          
          <View style={styles.infoRow}>
            <Text style={styles.label}>Tipo:</Text>
            <Text style={styles.value}>{beehive.typeBeehive}</Text>
          </View>
          
          <View style={styles.infoRow}>
            <Text style={styles.label}>Status:</Text>
            <View style={[styles.statusBadge, { backgroundColor: statusStyle.backgroundColor, borderColor: statusStyle.borderColor }]}>
              <Text style={[styles.statusText, { color: statusStyle.color }]}>
                {beehive.status}
              </Text>
            </View>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    overflow: "hidden",
  },
  mapContainer: {
    width: "100%",
    height: 200,
  },
  details: {
    padding: 16,
  },
  nameContainer: {
    alignItems: "center",
    marginBottom: 12,
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#1f2937",
    marginBottom: 2,
  },
  type: {
    fontSize: 14,
    color: "#6b7280",
  },
  infoContainer: {
    gap: 8,
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  label: {
    fontSize: 14,
    fontWeight: "500",
    color: "#6b7280",
  },
  value: {
    fontSize: 14,
    color: "#1f2937",
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    borderWidth: 1,
  },
  statusText: {
    fontSize: 12,
    fontWeight: "600",
  },
});

export default CardBeehive;