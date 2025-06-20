import { Stack } from 'expo-router';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { AuthProvider } from '../contexts/auth.js';

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <StatusBar style="light" />
      <AuthProvider>
        <Stack screenOptions={{ 
          headerShown: false,
          contentStyle: { backgroundColor: '#f5f5f5' }
        }}>
          <Stack.Screen name="index" />
          <Stack.Screen name="Home" />
          <Stack.Screen name="Login" />
          <Stack.Screen name="CreateAccount" />
          <Stack.Screen name="TestLogin" />
          <Stack.Screen name="(tabs)" />
        </Stack>
      </AuthProvider>
    </SafeAreaProvider>
  );
} 