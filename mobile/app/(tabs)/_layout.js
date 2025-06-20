import { Stack, useRouter } from 'expo-router';
import { useAuth } from '../../hooks/useAuth.js';

export default function TabLayout() {
  const { signed, loading } = useAuth();
  const router = useRouter();

  if (loading) {
    return null;
  }

  if (!signed) {
    router.replace('/Login');
    return null;
  }

  return (
    <Stack screenOptions={{ 
      headerShown: false,
      contentStyle: { backgroundColor: '#f5f5f5' }
    }}>
      <Stack.Screen name="Beehives" />
      <Stack.Screen name="CreateBeehive" />
      <Stack.Screen name="BeehiveDetails" />
      <Stack.Screen name="UpdateBeehive" />
      <Stack.Screen name="Profile" />
      <Stack.Screen name="UpdateProfile" />
    </Stack>
  );
} 