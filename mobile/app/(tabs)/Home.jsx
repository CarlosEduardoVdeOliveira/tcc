import { useNavigation } from "@react-navigation/native";
import { Image, StyleSheet, Text, View } from "react-native";
import ImgHero from "../../assets/images/imgHero.png"; // Certifique-se de que a imagem existe
import Button from "../../components/Button.js";
import Container from "../../components/Container.js";
import Footer from "../../components/Footer.js";

function Home() {
  const navigation = useNavigation();

  return (
    <Container>
      <View style={styles.wrapper}>
        <View style={styles.header}>
          <Text style={styles.title}>Boas-vindas!</Text>
          <Text style={styles.subtitle}>
            A sua plataforma de gerenciamento das suas colmeias.
          </Text>
        </View>

        <View style={styles.buttons}>
          <Button 
            onPress={() => navigation.navigate("Login")}
            style={styles.primaryButton}
          >
            <Text style={styles.primaryButtonText}>Já tenho conta</Text>
          </Button>

          <Button 
            onPress={() => navigation.navigate("CreateAccount")}
            style={styles.secondaryButton}
          >
            <Text style={styles.secondaryButtonText}>Quero me cadastrar</Text>
          </Button>
        </View>

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
    marginBottom: 20,
    marginRight: 40,
    marginLeft: 40,
    gap: 12,
  },
  primaryButton: {
    backgroundColor: "#FACC15",
  },
  primaryButtonText: {
    color: "#6B4C00",
    fontWeight: "600",
    fontSize: 16,
  },
  secondaryButton: {
    backgroundColor: "#78350f",
  },
  secondaryButtonText: {
    color: "#ffffff",
    fontWeight: "600",
    fontSize: 16,
  },
  image: {
    width: 250,
    height: 150,
    marginBottom: 20,
  },
});
export default Home;
