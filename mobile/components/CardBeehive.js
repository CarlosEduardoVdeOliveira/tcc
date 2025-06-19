import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { formatDate } from "../utils/formatDate";
import { Feather } from '@expo/vector-icons';
import Map from "./Map";
import { useRouter } from 'expo-router';

function getStatusStyle(status) {
  switch (status?.toLowerCase()) {
    case 'ativo':
    case 'active':
      return {
        backgroundColor: '#dcfce7',
        color: '#166534',
        borderColor: '#bbf7d0',
      };
    case 'inativo':
    case 'inactive':
      return {
        backgroundColor: '#fee2e2',
        color: '#991b1b',
        borderColor: '#fecaca',
      };
    default:
      return {
        backgroundColor: '#f3f4f6',
        color: '#374151',
        borderColor: '#d1d5db',
      };
  }
}

export default function CardBeehive({ beehive, ...props }) {
  const statusStyle = getStatusStyle(beehive.status);
  const router = useRouter();

  const handlePress = () => {
    router.push(`/(tabs)/BeehiveDetails?id=${beehive.id}`);
  };

  return (
    <TouchableOpacity style={styles.card} activeOpacity={0.85} onPress={handlePress}>
      {/* Mapa real */}
      <View style={styles.mapContainer}>
        <Map
          latitude={beehive.latitude}
          longitude={beehive.longitude}
          style={{ width: '100%', height: '100%' }}
          pointerEvents="none"
        />
      </View>
      {/* Informações da colmeia */}
      <View style={styles.details}>
        <View style={styles.nameContainer}>
          <Text style={styles.name}>{beehive.name}</Text>
          <Text style={styles.type}>Colmeia</Text>
        </View>
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
            <Text style={[styles.statusBadge, {
              backgroundColor: statusStyle.backgroundColor,
              borderColor: statusStyle.borderColor,
              color: statusStyle.color
            }]}
            >
              {beehive.status}
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    overflow: "hidden",
    marginBottom: 16,
  },
  mapContainer: {
    width: "100%",
    height: 200,
    backgroundColor: '#f3f4f6',
    justifyContent: 'center',
    alignItems: 'center',
  },
  details: {
    padding: 20,
  },
  nameContainer: {
    alignItems: "center",
    marginBottom: 12,
  },
  name: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#1f2937",
    marginBottom: 2,
  },
  type: {
    fontSize: 14,
    color: "#6b7280",
  },
  infoContainer: {
    marginTop: 12,
    gap: 8,
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 4,
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
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 999,
    borderWidth: 1,
    fontSize: 12,
    fontWeight: "bold",
    overflow: 'hidden',
    textAlign: 'center',
    minWidth: 70,
  },
});