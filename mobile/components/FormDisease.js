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
import { createDisease } from "../api/diseaseApi.js";
import Button from "./Button.js";

export default function FormDisease({ visible, onClose, beehiveId }) {
  const [disease, setDisease] = useState("");
  const [dateDiagnosis, setDateDiagnosis] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async () => {
    if (!disease || !dateDiagnosis) {
      Alert.alert("Erro", "Por favor, preencha todos os campos");
      return;
    }

    setLoading(true);
    try {
      await createDisease({
        disease,
        dateDiagnosis,
        beehiveId,
      });

      Alert.alert("Sucesso", "Doença registrada com sucesso!");
      onClose();
      router.push({
        pathname: '/(tabs)/BeehiveDetails',
        params: { id: beehiveId }
      });
    } catch (error) {
      console.error("Erro ao criar doença:", error);
      Alert.alert("Erro", "Falha ao registrar doença");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View style={styles.overlay}>
        <View style={styles.modal}>
          <Text style={styles.title}>Registrar Doença</Text>
          
          <Text style={styles.label}>Doença</Text>
          <TextInput
            style={styles.input}
            placeholder="Descreva a doença identificada"
            value={disease}
            onChangeText={setDisease}
            multiline
          />

          <Text style={styles.label}>Data do Diagnóstico</Text>
          <TextInput
            style={styles.input}
            placeholder="YYYY-MM-DD"
            value={dateDiagnosis}
            onChangeText={setDateDiagnosis}
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