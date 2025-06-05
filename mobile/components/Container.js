import { StyleSheet, View } from "react-native";

function Container({ children, style, ...props }) {
  return (
    <View style={[styles.container, style]} {...props}>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
  },
});
export default Container;
