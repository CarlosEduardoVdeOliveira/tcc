import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import { Alert, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { getApiUrl } from '../utils/config.js';

const DebugAuth = () => {
  const [debugInfo, setDebugInfo] = useState({});
  const [loading, setLoading] = useState(false);

  const checkAuthStatus = async () => {
    setLoading(true);
    try {
      const token = await AsyncStorage.getItem('user_token');
      const user = await AsyncStorage.getItem('user');
      const apiUrl = getApiUrl();
      
      const info = {
        token: token ? `${token.substring(0, 20)}...` : 'Ausente',
        user: user ? JSON.parse(user) : null,
        apiUrl,
        timestamp: new Date().toISOString(),
      };
      
      setDebugInfo(info);
    } catch (error) {
      setDebugInfo({ error: error.message });
    } finally {
      setLoading(false);
    }
  };

  const clearAuth = async () => {
    try {
      await AsyncStorage.removeItem('user_token');
      await AsyncStorage.removeItem('user');
      Alert.alert('Sucesso', 'Dados de autenticação removidos');
      checkAuthStatus();
    } catch (error) {
      Alert.alert('Erro', 'Falha ao limpar dados');
    }
  };

  const testApiConnection = async () => {
    setLoading(true);
    try {
      const apiUrl = getApiUrl();
      const response = await fetch(`${apiUrl}health`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      const result = await response.text();
      Alert.alert('Teste de Conexão', `Status: ${response.status}\nResposta: ${result}`);
    } catch (error) {
      Alert.alert('Erro de Conexão', error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkAuthStatus();
  }, []);

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Debug de Autenticação</Text>
      
      <TouchableOpacity style={styles.button} onPress={checkAuthStatus} disabled={loading}>
        <Text style={styles.buttonText}>
          {loading ? 'Verificando...' : 'Verificar Status'}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={testApiConnection} disabled={loading}>
        <Text style={styles.buttonText}>Testar Conexão API</Text>
      </TouchableOpacity>

      <TouchableOpacity style={[styles.button, styles.clearButton]} onPress={clearAuth}>
        <Text style={styles.buttonText}>Limpar Auth</Text>
      </TouchableOpacity>

      <View style={styles.infoContainer}>
        <Text style={styles.infoTitle}>Informações de Debug:</Text>
        <Text style={styles.infoText}>
          {JSON.stringify(debugInfo, null, 2)}
        </Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 8,
    marginVertical: 5,
    alignItems: 'center',
  },
  clearButton: {
    backgroundColor: '#FF3B30',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  infoContainer: {
    marginTop: 20,
    padding: 15,
    backgroundColor: 'white',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  infoTitle: {
    fontWeight: 'bold',
    marginBottom: 10,
    fontSize: 16,
  },
  infoText: {
    fontSize: 12,
    fontFamily: 'monospace',
    lineHeight: 18,
  },
});

export default DebugAuth; 