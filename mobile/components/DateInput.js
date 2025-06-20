import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import Icon from "react-native-vector-icons/Ionicons";

function DateInput({ label, value, onChangeText, placeholder = "Selecione uma data" }) {
  const [showPicker, setShowPicker] = useState(false);

  const handleDateChange = (event, selectedDate) => {
    setShowPicker(false);
    if (selectedDate) {
      const formattedDate = selectedDate.toISOString().split('T')[0];
      onChangeText(formattedDate);
    }
  };

  const formatDisplayDate = (dateString) => {
    if (!dateString) return placeholder;
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR');
  };

  return (
    <View style={styles.group}>
      <Text style={styles.label}>{label}</Text>
      <TouchableOpacity 
        style={styles.dateInput} 
        onPress={() => setShowPicker(true)}
      >
        <Text style={[styles.dateText, !value && styles.placeholderText]}>
          {formatDisplayDate(value)}
        </Text>
        <Icon name="calendar" size={20} color="#6b7280" />
      </TouchableOpacity>

      {showPicker && (
        <DateTimePicker
          value={value ? new Date(value) : new Date()}
          mode="date"
          display="default"
          onChange={handleDateChange}
          maximumDate={new Date()}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  group: {
    marginBottom: 16,
  },
  label: {
    color: "#78350f",
    fontWeight: "600",
    marginBottom: 8,
    textAlign: "center",
  },
  dateInput: {
    borderBottomWidth: 2,
    borderColor: "#6b7280",
    paddingVertical: 12,
    paddingHorizontal: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  dateText: {
    color: "#78350f",
    fontSize: 16,
    textAlign: "center",
    flex: 1,
  },
  placeholderText: {
    color: "#9ca3af",
  },
});

export default DateInput; 