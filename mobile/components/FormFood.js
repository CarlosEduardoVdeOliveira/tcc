import { useRouter } from 'expo-router';
import { useState } from "react";
import {
  Alert,
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { createFood } from "../api/foodApi.js";
import Button from "./Button.js";

export default function FormFood({ visible, onClose, beehiveId }) {
  const [food, setFood] = useState("");
  const [dateFeeding, setDateFeeding] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async () => {
    if (!food || !dateFeeding) {
      Alert.alert("Erro", "Por favor, preencha todos os campos");
      return;
    }

    setLoading(true);
    try {
      await createFood({
        food,
        dateFeeding,
        beehiveId,
      });

      Alert.alert("Sucesso", "Alimentação registrada com sucesso!");
      onClose();
      router.push({
        pathname: '/(tabs)/BeehiveDetails',
        params: { id: beehiveId }
      });
    } catch (error) {
      console.error("Erro ao criar alimentação:", error);
      Alert.alert("Erro", "Falha ao registrar alimentação");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View style={styles.overlay}>
        <View style={styles.modal}>
          <Text style={styles.title}>Registrar Alimentação</Text>
          
          <Text style={styles.label}>Alimento</Text>
          <TextInput
            style={styles.input}
            placeholder="Descreva o alimento fornecido"
            value={food}
            onChangeText={setFood}
            multiline
          />

          <Text style={styles.label}>Data da Alimentação</Text>
          <TextInput
            style={styles.input}
            placeholder="YYYY-MM-DD"
            value={dateFeeding}
            onChangeText={setDateFeeding}
          />

          <View style={styles.buttons}>
            <TouchableOpacity style={styles.cancelButton} onPress={onClose}>
              <Text style={styles.cancelText}>Cancelar</Text>
            </TouchableOpacity>
            
            <Button
              title={loading ? "Salvando..." : "Salvar"}
              onPress={handleSubmit}
              style={styles.saveButton}
              disabled={loading}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modal: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 24,
    width: "90%",
    maxWidth: 400,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  label: {
    fontSize: 16,
    fontWeight: "500",
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    fontSize: 16,
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 12,
  },
  cancelButton: {
    flex: 1,
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ddd",
    alignItems: "center",
  },
  cancelText: {
    color: "#666",
    fontSize: 16,
  },
  saveButton: {
    flex: 1,
  },
});