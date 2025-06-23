import React from 'react';
import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { createUser, createUserWithFetch } from '../api/userApi.js';
import { getApiUrl } from '../utils/config.js';

const TestCadastro = () => {
  const testCadastro = async () => {
    try {
      console.log("=== TESTE DE CADASTRO ===");
      console.log("URL da API:", getApiUrl());
      
      // Gerar email único baseado no timestamp
      const timestamp = Date.now();
      const testData = {
        name: "Teste Usuário",
        email: `teste${timestamp}@teste.com`,
        password: "123456",
        startDate: "2024-01-01",
        status: "Ativo",
        latitude: -15.7801,
        longitude: -47.9292,
        cpfCnpj: "12345678901"
      };
      
      console.log("Dados de teste:", testData);
      
      const response = await createUser(testData);
      console.log("Resposta do teste:", response);
      
      if (response.error) {
        Alert.alert("Erro no Teste", response.message);
      } else {
        Alert.alert("Sucesso no Teste", "Cadastro funcionando!");
      }
    } catch (error) {
      console.error("Erro no teste:", error);
      Alert.alert("Erro no Teste", error.message);
    }
  };

  const testCadastroFormData = async () => {
    try {
      console.log("=== TESTE CADASTRO COM FORM DATA ===");
      
      const timestamp = Date.now();
      const formData = new FormData();
      formData.append('name', 'Teste FormData');
      formData.append('email', `formdata${timestamp}@teste.com`);
      formData.append('password', '123456');
      formData.append('startDate', '2024-01-01');
      formData.append('status', 'Ativo');
      formData.append('latitude', '-15.7801');
      formData.append('longitude', '-47.9292');
      formData.append('cpfCnpj', '12345678901');
      
      console.log("FormData criado:", formData);
      
      const response = await fetch(`${getApiUrl()}/producer`, {
        method: 'POST',
        body: formData,
        headers: {
          'Accept': 'application/json',
        },
      });
      
      const data = await response.json();
      console.log("Resposta FormData:", data);
      console.log("Status FormData:", response.status);
      
      if (response.ok) {
        Alert.alert("Sucesso FormData", "Cadastro com FormData funcionou!");
      } else {
        Alert.alert("Erro FormData", data.message || "Erro no cadastro");
      }
    } catch (error) {
      console.error("Erro no teste FormData:", error);
      Alert.alert("Erro FormData", error.message);
    }
  };

  const testCadastroFetch = async () => {
    try {
      console.log("=== TESTE CADASTRO COM FETCH ===");
      
      const timestamp = Date.now();
      const testData = {
        name: "Teste Fetch",
        email: `fetch${timestamp}@teste.com`,
        password: "123456",
        startDate: "2024-01-01",
        status: "Ativo",
        latitude: -15.7801,
        longitude: -47.9292,
        cpfCnpj: "12345678901"
      };
      
      console.log("Dados de teste (fetch):", testData);
      
      const response = await createUserWithFetch(testData);
      console.log("Resposta do teste (fetch):", response);
      
      if (response.error) {
        Alert.alert("Erro no Teste Fetch", response.message);
      } else {
        Alert.alert("Sucesso no Teste Fetch", "Cadastro com fetch funcionou!");
      }
    } catch (error) {
      console.error("Erro no teste fetch:", error);
      Alert.alert("Erro no Teste Fetch", error.message);
    }
  };

  const testCadastroComDadosExistentes = async () => {
    try {
      console.log("=== TESTE CADASTRO COM DADOS QUE FUNCIONAM ===");
      
      // Usar dados similares aos que funcionam no backend
      const timestamp = Date.now();
      const testData = {
        name: "Teste Backend",
        email: `backend${timestamp}@gmail.com`,
        password: "123456",
        startDate: "2024-01-01",
        status: "Ativo",
        latitude: -16.851261,
        longitude: -42.0704517,
        cpfCnpj: "12345678901"
      };
      
      console.log("Dados de teste (backend):", testData);
      
      const response = await createUser(testData);
      console.log("Resposta do teste (backend):", response);
      
      if (response.error) {
        Alert.alert("Erro no Teste Backend", response.message);
      } else {
        Alert.alert("Sucesso no Teste Backend", "Cadastro funcionou! Agora teste o login com este usuário.");
        
        // Mostrar os dados para teste de login
        console.log("=== DADOS PARA TESTE DE LOGIN ===");
        console.log("Email:", testData.email);
        console.log("Senha:", testData.password);
      }
    } catch (error) {
      console.error("Erro no teste backend:", error);
      Alert.alert("Erro no Teste Backend", error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Teste de Cadastro</Text>
      <TouchableOpacity style={styles.button} onPress={testCadastro}>
        <Text style={styles.buttonText}>Testar Cadastro JSON</Text>
      </TouchableOpacity>
      <TouchableOpacity style={[styles.button, { marginTop: 10, backgroundColor: '#ff6b35' }]} onPress={testCadastroFormData}>
        <Text style={styles.buttonText}>Testar Cadastro FormData</Text>
      </TouchableOpacity>
      <TouchableOpacity style={[styles.button, { marginTop: 10, backgroundColor: '#28a745' }]} onPress={testCadastroFetch}>
        <Text style={styles.buttonText}>Testar Cadastro Fetch</Text>
      </TouchableOpacity>
      <TouchableOpacity style={[styles.button, { marginTop: 10, backgroundColor: '#6f42c1' }]} onPress={testCadastroComDadosExistentes}>
        <Text style={styles.buttonText}>Testar Cadastro Backend</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#f0f0f0',
    margin: 10,
    borderRadius: 8,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#007AFF',
    padding: 12,
    borderRadius: 6,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: '600',
  },
});

export default TestCadastro; 