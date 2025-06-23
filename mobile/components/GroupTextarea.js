import React from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";

function GroupTextarea({ label, icon = null, ...props }) {
  return (
    <View style={styles.group}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.inputWrapper}>
        {icon && <View style={styles.icon}>{icon}</View>}
        <TextInput
          style={[styles.textarea, icon && { paddingLeft: 32 }]}
          multiline
          numberOfLines={4}
          {...props}
        />
      </View>
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
  textarea: {
    borderBottomWidth: 2,
    borderColor: "#6b7280",
    padding: 8,
    color: "#78350f",
    textAlignVertical: "top",
  },
  icon: {
    position: "absolute",
    right: 8,
    top: 8,
  },
});
export default GroupTextarea