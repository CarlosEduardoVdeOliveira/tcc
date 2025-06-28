import NetInfo from "@react-native-community/netinfo";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { AuthProvider } from "../contexts/auth.js";
import { useAuth } from "../hooks/useAuth.js";

import { useEffect, useState } from "react";
import { Text, View } from "react-native";
import BeehiveDetails from "./(tabs)/BeehiveDetails.jsx";
import Beehives from "./(tabs)/Beehives.jsx";
import CreateBeehive from "./(tabs)/CreateBeehive.jsx";
import Home from "./(tabs)/Home.jsx";
import Profile from "./(tabs)/Profile.jsx";
import UpdateBeehive from "./(tabs)/UpdateBeehive.jsx";
import UpdateProfile from "./(tabs)/UpdateProfile.jsx";
import CreateAccount from "./CreateAccount.jsx";
import Login from "./Login.jsx";

const Stack = createNativeStackNavigator();

function AppRoutes() {
  const { signed, loading } = useAuth();
  const [isConnected, setIsConnected] = useState(true);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state) => {
      setIsConnected(state.isConnected && state.isInternetReachable);
    });
    return () => unsubscribe();
  }, []);

  if (loading) {
    return null; // ou SplashScreen
  }

  return (
    <Stack.Navigator>
      {signed ? (
        <>
          {/* Você pode condicionar algumas telas offline se quiser */}
          <Stack.Screen name="Beehives" component={Beehives} />
          <Stack.Screen name="Profile" component={Profile} />
          <Stack.Screen name="UpdateProfile" component={UpdateProfile} />
          <Stack.Screen name="CreateBeehive" component={CreateBeehive} />
          <Stack.Screen name="BeehiveDetails" component={BeehiveDetails} />
          <Stack.Screen name="UpdateBeehive" component={UpdateBeehive} />
        </>
      ) : (
        <>
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="CreateAccount" component={CreateAccount} />
        </>
      )}
      {/* Opcional: mostrar um aviso de "Offline" */}
      {!isConnected && (
        <Stack.Screen
          name="OfflineNotice"
          component={() => (
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "#fff",
              }}
            >
              <Text style={{ fontSize: 18, color: "red" }}>
                Você está offline
              </Text>
            </View>
          )}
          options={{ headerShown: false }}
        />
      )}
    </Stack.Navigator>
  );
}

function Index() {
  return (
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
  );
}
export default Index;
