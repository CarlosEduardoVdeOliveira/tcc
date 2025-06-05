import { StyleSheet, Text, TextInput, View } from "react-native";

function GroupInput({ label, icon = null, ...props }) {
  return (
    <View style={styles.group}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.inputWrapper}>
        {icon && <View style={styles.icon}>{icon}</View>}
        <TextInput
          style={[styles.input, icon && { paddingLeft: 32 }]}
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
  inputWrapper: {
    position: "relative",
  },
  input: {
    borderBottomWidth: 2,
    borderColor: "#6b7280",
    paddingVertical: 8,
    textAlign: "center",
    color: "#78350f",
  },
  icon: {
    position: "absolute",
    right: 8,
    top: 8,
  },
});
export default GroupInput;
