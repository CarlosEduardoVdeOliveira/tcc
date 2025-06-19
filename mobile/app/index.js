
import { useRouter } from 'expo-router';
import { useEffect } from 'react';
import { ActivityIndicator, View } from 'react-native';
import { useAuth } from "../hooks/useAuth.js";

export default function Index() {
  const { signed, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading) {
      if (signed) {
        router.replace('/(tabs)/Beehives');
      } else {
        router.replace('/Home');
      }
    }
  }, [signed, loading, router]);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#eead2d" />
      </View>
    );
  }

  return null;
}
