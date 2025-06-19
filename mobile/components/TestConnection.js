import axios from 'axios';
import React, { useState } from 'react';
import { Alert, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { getApiUrl, testApiConnection } from '../utils/config.js';

const TestConnection = () => {
  const [testResults, setTestResults] = useState({});
  const [loading, setLoading] = useState(false);

  const testBasicConnection = async () => {
    setLoading(true);
    try {
      const result = await testApiConnection();
      setTestResults(prev => ({ ...prev, basic: result }));
      
      if (result.success) {
        Alert.alert('Sucesso', 'Conexão básica funcionando!');
      } else {
        Alert.alert('Erro', `Falha na conexão: ${result.error}`);
      }
    } catch (error) {
      setTestResults(prev => ({ ...prev, basic: { success: false, error: error.message } }));
      Alert.alert('Erro', error.message);
    } finally {
      setLoading(false);
    }
  };

  const testLoginEndpoint = async () => {
    setLoading(true);
    try {
      const url = getApiUrl();
      console.log('🧪 Testando endpoint de login:', `${url}login`);
      
      const response = await axios.post(`${url}login`, {
        email: 'test@test.com',
        password: 'test123'
      }, {
        timeout: 5000,
      });
      
      const result = { success: true, status: response.status, data: response.data };
      setTestResults(prev => ({ ...prev, login: result }));
      Alert.alert('Sucesso', 'Endpoint de login respondeu!');
    } catch (error) {
      const result = { 
        success: false, 
        status: error.response?.status,
        error: error.message,
        data: error.response?.data 
      };
      setTestResults(prev => ({ ...prev, login: result }));
      
      if (error.response?.status === 401) {
        Alert.alert('Info', 'Endpoint de login funciona (401 esperado para credenciais inválidas)');
      } else {
        Alert.alert('Erro', `Falha no endpoint de login: ${error.message}`);
      }
    } finally {
      setLoading(false);
    }
  };

  const testBeehivesEndpoint = async () => {
    setLoading(true);
    try {
      const url = getApiUrl();
      console.log('🧪 Testando endpoint de colmeias:', `${url}beehive`);
      
      const response = await axios.get(`${url}beehive`, {
        timeout: 5000,
      });
      
      const result = { success: true, status: response.status, data: response.data };
      setTestResults(prev => ({ ...prev, beehives: result }));
      Alert.alert('Sucesso', 'Endpoint de colmeias respondeu!');
    } catch (error) {
      const result = { 
        success: false, 
        status: error.response?.status,
        error: error.message,
        data: error.response?.data 
      };
      setTestResults(prev => ({ ...prev, beehives: result }));
      
      if (error.response?.status === 401) {
        Alert.alert('Info', 'Endpoint de colmeias funciona (401 esperado sem autenticação)');
      } else {
        Alert.alert('Erro', `Falha no endpoint de colmeias: ${error.message}`);
      }
    } finally {
      setLoading(false);
    }
  };

  const clearResults = () => {
    setTestResults({});
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Teste de Conectividade</Text>
      
      <View style={styles.infoContainer}>
        <Text style={styles.infoTitle}>URL da API:</Text>
        <Text style={styles.infoText}>{getApiUrl()}</Text>
      </View>

      <TouchableOpacity 
        style={styles.button} 
        onPress={testBasicConnection}
        disabled={loading}
      >
        <Text style={styles.buttonText}>
          {loading ? 'Testando...' : 'Testar Conexão Básica'}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity 
        style={styles.button} 
        onPress={testLoginEndpoint}
        disabled={loading}
      >
        <Text style={styles.buttonText}>
          {loading ? 'Testando...' : 'Testar Endpoint Login'}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity 
        style={styles.button} 
        onPress={testBeehivesEndpoint}
        disabled={loading}
      >
        <Text style={styles.buttonText}>
          {loading ? 'Testando...' : 'Testar Endpoint Colmeias'}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity 
        style={[styles.button, styles.clearButton]} 
        onPress={clearResults}
      >
        <Text style={styles.buttonText}>Limpar Resultados</Text>
      </TouchableOpacity>

      {Object.keys(testResults).length > 0 && (
        <View style={styles.resultsContainer}>
          <Text style={styles.resultsTitle}>Resultados dos Testes:</Text>
          <Text style={styles.resultsText}>
            {JSON.stringify(testResults, null, 2)}
          </Text>
        </View>
      )}
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
  infoContainer: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 8,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  infoTitle: {
    fontWeight: 'bold',
    marginBottom: 5,
  },
  infoText: {
    fontSize: 12,
    fontFamily: 'monospace',
    color: '#666',
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
  resultsContainer: {
    marginTop: 20,
    padding: 15,
    backgroundColor: 'white',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  resultsTitle: {
    fontWeight: 'bold',
    marginBottom: 10,
    fontSize: 16,
  },
  resultsText: {
    fontSize: 12,
    fontFamily: 'monospace',
    lineHeight: 18,
  },
});

export default TestConnection; 