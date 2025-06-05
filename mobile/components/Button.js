import { StyleSheet, Text, TouchableOpacity } from "react-native";

function Button({ children, style, ...props }) {
  return (
    <TouchableOpacity style={[styles.button, style]} {...props}>
      <Text style={styles.text}>{children}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#facc15",
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 8,
    width: "100%",
    alignItems: "center",
  },
  text: {
    color: "#78350f",
    fontWeight: "600",
  },
});
export default Button;
