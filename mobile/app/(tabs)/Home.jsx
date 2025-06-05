import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { Image, StyleSheet, Text, View } from "react-native";
import ImgHero from "../../assets/images/imgHero.png"; // Certifique-se de que a imagem existe
import Container from "../../components/Container.js";
import Footer from "../../components/Footer.js";
import { CreateAccount } from "./CreateAccount.jsx";
import { Login } from "./Login.jsx";

function Home() {
  /* const navigation = useNavigation();
   */
  const Tab = createBottomTabNavigator();

  return (
    <Container>
      <View style={styles.wrapper}>
        <View style={styles.header}>
          <Text style={styles.title}>Boas-vindas!</Text>
          <Text style={styles.subtitle}>
            A sua plataforma de gerenciamento das suas colmeias.
          </Text>
        </View>

        <NavigationContainer style={styles.buttons}>
          <Tab.Screen
            name="Já tenho conta"
            component={Login}
            style={styles.primaryButton}
            textStyle={{ color: "#6B4C00" }}
          />

          <Tab.Screen name="Quero me cadastrar" component={CreateAccount} />
        </NavigationContainer>

        <Image source={ImgHero} style={styles.image} resizeMode="contain" />

        <Footer />
      </View>
    </Container>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-between",
    paddingTop: 40,
    paddingVertical: 40,
  },
  header: {
    marginBottom: 100,
    alignItems: "center",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 10,
  },
  subtitle: {
    textAlign: "center",
  },
  buttons: {
    width: "75%",
    height: 75,
    marginBottom: 20,
    marginRight: 40,
    marginLeft: 40,
    gap: 12,
  },
  primaryButton: {
    backgroundColor: "#FACC15",
  },
  image: {
    width: 250,
    height: 150,
    marginBottom: 20,
  },
});
export default Home;
