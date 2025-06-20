import axios from 'axios';

const testLogin = async () => {
  try {
    console.log('🧪 Testando login...');
    
    const response = await axios.post('http://localhost:3000/api/v1/login', {
      email: 'teste@teste.com',
      password: '123456'
    });
    
    console.log('✅ Login bem-sucedido:', response.data);
  } catch (error) {
    console.error('❌ Erro no login:', error.response?.data || error.message);
  }
};

testLogin(); 