import {
  Modal as RNModal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Feather from "react-native-vector-icons/Feather";

function Modal({ visible, onClose, title, children }) {
  return (
    <RNModal visible={visible} animationType="slide" transparent>
      <View style={styles.overlay}>
        <View style={styles.container}>
          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <Feather name="close" color="#78350f" />
          </TouchableOpacity>
          <Text style={styles.title}>{title}</Text>
          <View>{children}</View>
        </View>
      </View>
    </RNModal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "#000000aa",
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    backgroundColor: "#f9fafb",
    padding: 20,
    width: "80%",
    borderRadius: 10,
  },
  closeButton: {
    position: "absolute",
    right: 8,
    top: 8,
  },
  title: {
    textAlign: "center",
    fontWeight: "bold",
    marginBottom: 16,
  },
});
export default Modal