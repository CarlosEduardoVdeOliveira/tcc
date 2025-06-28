import { Tabs } from "expo-router";
import { StatusBar } from "expo-status-bar";

export default function TabLayout() {
  return (
    <>
      <StatusBar style="dark" />
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarStyle: { display: "none" }, // Esconder a tab bar se não estiver usando
        }}
      >
        <Tabs.Screen name="Home" />
        <Tabs.Screen name="Login" />
        <Tabs.Screen name="CreateAccount" />
        <Tabs.Screen name="Beehives" />
        <Tabs.Screen name="CreateBeehive" />
        <Tabs.Screen name="BeehiveDetails" />
        <Tabs.Screen name="UpdateBeehive" />
        <Tabs.Screen name="Profile" />
        <Tabs.Screen name="UpdateProfile" />
      </Tabs>
    </>
  );
} 