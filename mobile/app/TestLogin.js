import React from 'react';
import { StyleSheet, View } from 'react-native';
import TestLogin from '../components/TestLogin.js';

export default function TestLoginScreen() {
  return (
    <View style={styles.container}>
      <TestLogin />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
}); 