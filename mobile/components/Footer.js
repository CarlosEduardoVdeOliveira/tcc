import { StyleSheet, Text, View } from "react-native";

function Footer() {
  return (
    <View style={styles.footer}>
      <Text style={styles.text}>© Todos direitos reservados</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  footer: {
    backgroundColor: "#facc15",
    paddingVertical: 16,
    alignItems: "center",
    width: "100%",
  },
  text: {
    fontWeight: "600",
    color: "#78350f",
  },
});
export default Footer;
