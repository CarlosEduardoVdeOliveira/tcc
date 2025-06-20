import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';

function Footer() {
  return (
    <SafeAreaView style={styles.safeArea} edges={['bottom']}>
      <View style={styles.footer}>
        <Text style={styles.text}>© Todos direitos reservados</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: 'transparent',
  },
  footer: {
    backgroundColor: "#facc15",
    paddingVertical: 12,
    alignItems: "center",
    width: "100%",
  },
  text: {
    fontWeight: "600",
    color: "#78350f",
  },
});

export default Footer;
