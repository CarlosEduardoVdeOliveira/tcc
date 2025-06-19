import { useNavigation } from "@react-navigation/native";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import ImgHero from "../../assets/images/imgHero.png"; // Certifique-se de que a imagem existe
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
          <TouchableOpacity 
            style={[styles.button, styles.primaryButton]}
            onPress={() => navigation.navigate("Login")}
          >
            <Text style={styles.buttonText}>Já tenho conta</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.button, styles.secondaryButton]}
            onPress={() => navigation.navigate("CreateAccount")}
          >
            <Text style={styles.buttonText}>Quero me cadastrar</Text>
          </TouchableOpacity>
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
  button: {
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  primaryButton: {
    backgroundColor: "#FACC15",
  },
  secondaryButton: {
    backgroundColor: "#6B4C00",
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#6B4C00",
  },
  image: {
    width: 250,
    height: 150,
    marginBottom: 20,
  },
});

export default Home;
