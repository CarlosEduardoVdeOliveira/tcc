import { useNavigation, useRoute } from "@react-navigation/native";
import { StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from "react-native-vector-icons/Ionicons";

function Header({ pathName, title, subtitle }) {
  const navigation = useNavigation();
  const route = useRoute();
  const userToken = true; // Substitua por seu método de autenticação (ex: useAuth())

  // Garante a cor da status bar em todo render
  StatusBar.setBackgroundColor('#eead2d');
  StatusBar.setBarStyle('dark-content');

  const handleBack = () => {
    if (pathName && pathName !== "/") {
      navigation.navigate(pathName);
    } else {
      navigation.goBack();
    }
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={["top"]}>
      <View style={styles.headerWrapper}>
        <View style={styles.header}>
          {userToken && route.name !== "Home" ? (
            <TouchableOpacity
              onPress={handleBack}
              style={styles.iconButton}
            >
              <Icon name="arrow-back" size={24} color="#fff" />
            </TouchableOpacity>
          ) : (
            <View style={styles.placeholder} />
          )}

          {userToken && route.name !== "Profile" ? (
            <TouchableOpacity
              onPress={() => navigation.navigate("Profile")}
              style={styles.profileButton}
            >
              <Icon name="person" size={24} color="#fff" />
            </TouchableOpacity>
          ) : (
            <View style={styles.placeholder} />
          )}
        </View>
        {(title || subtitle) && (
          <View style={styles.textContainer}>
            {title && <Text style={styles.title}>{title}</Text>}
            {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
          </View>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: "#eead2d",
  },
  headerWrapper: {
    backgroundColor: "#eead2d",
    paddingBottom: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 16,
    paddingHorizontal: 16,
    backgroundColor: "#eead2d",
  },
  textContainer: {
    alignItems: "center",
    marginTop: 4,
    marginBottom: 2,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#6B4C00",
  },
  subtitle: {
    fontSize: 14,
    color: "#6B4C00",
    textAlign: "center",
    marginTop: 2,
  },
  iconButton: {
    padding: 8,
    borderRadius: 20,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
  },
  profileButton: {
    padding: 8,
    borderRadius: 20,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
  },
  placeholder: {
    width: 40,
  },
});

export default Header;

