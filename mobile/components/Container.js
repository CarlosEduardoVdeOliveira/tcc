import { StyleSheet } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';

function Container({ children, style, ...props }) {
  return (
    <SafeAreaView style={[styles.container, style]} edges={['left', 'right']} {...props}>
      {children}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    backgroundColor: 'transparent',
  },
});

export default Container;
