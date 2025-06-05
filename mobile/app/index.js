import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { AuthProvider } from "../contexts/auth.js";
import { useAuth } from "../hooks/useAuth.js";

import BeehiveDetails from "./(tabs)/BeehiveDetails.jsx";
import Beehives from "./(tabs)/Beehives.jsx";
import CreateAccount from "./(tabs)/CreateAccount.jsx";
import CreateBeehive from "./(tabs)/CreateBeehive.jsx";
import Home from "./(tabs)/Home.jsx";
import Login from "./(tabs)/Login.jsx";
import Profile from "./(tabs)/Profile.jsx";
import UpdateBeehive from "./(tabs)/UpdateBeehive.jsx";
import UpdateProfile from "./(tabs)/UpdateProfile.jsx";

const Stack = createNativeStackNavigator();

function AppRoutes() {
  const { signed, loading } = useAuth();
  if (loading) {
    return null; // ou um SplashScreen
  }
  return (
    <Stack.Navigator>
      {signed ? (
        <>
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
    </Stack.Navigator>
  );
}

function index() {
  return (
    <AuthProvider>
      <NavigationContainer>
        <AppRoutes />
      </NavigationContainer>
    </AuthProvider>
  );
}
export default index;
