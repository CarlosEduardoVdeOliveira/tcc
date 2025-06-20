import axios from 'axios';
import React, { useState } from 'react';
import { Alert, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { getApiUrl } from '../utils/config.js';

const TestLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [testResults, setTestResults] = useState({});

  const testServerHealth = async () => {
    setLoading(true);
    try {
      const url = getApiUrl();
      console.log('🏥 Testando saúde do servidor:', url);
      
      const response = await axios.get(`${url}health`, {
        timeout: 5000,
      });
      
      const result = { success: true, status: response.status, data: response.data };
      setTestResults(prev => ({ ...prev, health: result }));
      Alert.alert('Sucesso', 'Servidor está funcionando!');
    } catch (error) {
      const result = { 
        success: false, 
        status: error.response?.status,
        error: error.message 
      };
      setTestResults(prev => ({ ...prev, health: result }));
      Alert.alert('Erro', `Servidor não responde: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const testLoginWithCredentials = async () => {
    if (!email || !password) {
      Alert.alert('Erro', 'Preencha email e senha');
      return;
    }

    setLoading(true);
    try {
      const url = getApiUrl();
      console.log('🔐 Testando login com:', { email, password });
      
      const response = await axios.post(`${url}login`, {
        email,
        password,
      }, {
        timeout: 5000,
      });
      
      const result = { success: true, status: response.status, data: response.data };
      setTestResults(prev => ({ ...prev, login: result }));
      Alert.alert('Sucesso', 'Login funcionou!');
    } catch (error) {
      const result = { 
        success: false, 
        status: error.response?.status,
        error: error.message,
        data: error.response?.data 
      };
      setTestResults(prev => ({ ...prev, login: result }));
      
      if (error.response?.status === 401) {
        Alert.alert('Credenciais Inválidas', 'Email ou senha incorretos. Verifique suas credenciais.');
      } else {
        Alert.alert('Erro', `Falha no login: ${error.message}`);
      }
    } finally {
      setLoading(false);
    }
  };

  const testCreateUser = async () => {
    setLoading(true);
    try {
      const url = getApiUrl();
      const testUser = {
        name: 'Usuário Teste',
        email: 'teste@teste.com',
        password: '123456',
        startDate: new Date().toISOString().split('T')[0],
        status: 'Ativo',
        latitude: -15.7801,
        longitude: -47.9292,
        cpfCnpj: '12345678901'
      };
      
      console.log('👤 Testando criação de usuário:', testUser.email);
      
      const response = await axios.post(`${url}user`, testUser, {
        timeout: 5000,
      });
      
      const result = { success: true, status: response.status, data: response.data };
      setTestResults(prev => ({ ...prev, createUser: result }));
      Alert.alert('Sucesso', 'Usuário criado! Agora você pode fazer login com: teste@teste.com / 123456');
    } catch (error) {
      const result = { 
        success: false, 
        status: error.response?.status,
        error: error.message,
        data: error.response?.data 
      };
      setTestResults(prev => ({ ...prev, createUser: result }));
      
      if (error.response?.status === 409) {
        Alert.alert('Usuário Já Existe', 'Usuário de teste já existe. Use: teste@teste.com / 123456');
      } else {
        Alert.alert('Erro', `Falha ao criar usuário: ${error.message}`);
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
      <Text style={styles.title}>Teste de Login</Text>
      
      <View style={styles.infoContainer}>
        <Text style={styles.infoTitle}>URL da API:</Text>
        <Text style={styles.infoText}>{getApiUrl()}</Text>
      </View>

      <TouchableOpacity 
        style={styles.button} 
        onPress={testServerHealth}
        disabled={loading}
      >
        <Text style={styles.buttonText}>
          {loading ? 'Testando...' : 'Testar Saúde do Servidor'}
        </Text>
      </TouchableOpacity>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Email:</Text>
        <TextInput
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          placeholder="Digite o email"
          keyboardType="email-address"
          autoCapitalize="none"
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Senha:</Text>
        <TextInput
          style={styles.input}
          value={password}
          onChangeText={setPassword}
          placeholder="Digite a senha"
          secureTextEntry
        />
      </View>

      <TouchableOpacity 
        style={styles.button} 
        onPress={testLoginWithCredentials}
        disabled={loading}
      >
        <Text style={styles.buttonText}>
          {loading ? 'Testando...' : 'Testar Login'}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity 
        style={[styles.button, styles.createButton]} 
        onPress={testCreateUser}
        disabled={loading}
      >
        <Text style={styles.buttonText}>
          {loading ? 'Criando...' : 'Criar Usuário de Teste'}
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
  inputContainer: {
    marginBottom: 15,
  },
  label: {
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#333',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 12,
    borderRadius: 8,
    backgroundColor: 'white',
    fontSize: 16,
  },
  button: {
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 8,
    marginVertical: 5,
    alignItems: 'center',
  },
  createButton: {
    backgroundColor: '#34C759',
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

export default TestLogin; 