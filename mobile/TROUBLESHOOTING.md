# Guia de Solução de Problemas

## Erro 401 (Não Autorizado)

### Possíveis Causas:

1. **Servidor Backend não está rodando**
   - Verifique se o servidor está rodando na porta 3000
   - Execute: `npm start` ou `node server.js` no diretório do backend

2. **URL da API incorreta**
   - Verifique o arquivo `utils/config.js`
   - Para Android Emulator: `http://10.0.2.2:3000/api/v1/`
   - Para iOS Simulator: `http://localhost:3000/api/v1/`
   - Para dispositivo físico: Use o IP da sua máquina

3. **Token expirado ou inválido**
   - Faça logout e login novamente
   - Use o componente `DebugAuth` para verificar o token

4. **Credenciais incorretas**
   - Verifique se o email e senha estão corretos
   - Tente criar uma nova conta

### Como Testar:

1. **Use o componente TestConnection:**
   ```javascript
   import TestConnection from '../components/TestConnection';
   // Adicione em uma tela temporária
   ```

2. **Verifique os logs no console:**
   - Procure por logs com emojis (🔍, ❌, ✅)
   - Verifique se a URL da API está correta

3. **Teste a conectividade básica:**
   - Abra o navegador e acesse: `http://localhost:3000/api/v1/health`
   - Deve retornar uma resposta

## Erro de Navegação

### Problema: "NAVIGATE was not handled by any navigator"

### Solução:

1. **Use o router do expo-router:**
   ```javascript
   import { useRouter } from 'expo-router';
   
   const router = useRouter();
   router.replace('/(tabs)/Beehives');
   ```

2. **Verifique as rotas no _layout.js:**
   - Certifique-se de que a rota está definida no arquivo de layout

## Passos para Resolver:

### 1. Verificar Servidor Backend
```bash
# No diretório do backend
npm start
# ou
node server.js
```

### 2. Limpar Cache e Reiniciar
```bash
# No diretório mobile
npx expo start --clear --reset-cache
```

### 3. Testar Conectividade
- Use o componente `TestConnection`
- Verifique se o servidor responde

### 4. Verificar Configuração
- Abra `utils/config.js`
- Verifique se a URL está correta para sua plataforma

### 5. Debug de Autenticação
- Use o componente `DebugAuth`
- Verifique se o token está sendo salvo corretamente

## Componentes de Debug Disponíveis:

1. **TestConnection** - Testa conectividade com a API
2. **DebugAuth** - Verifica status de autenticação
3. **TestApi** - Testa chamadas específicas da API

## Logs Importantes:

Procure por estes logs no console:
- 🔍 Carregando dados do storage
- 🌐 URL da API configurada
- 🔐 Iniciando login
- ❌ Erro no login
- ✅ Login bem-sucedido

## Configuração de Rede:

### Para Android Emulator:
- URL: `http://10.0.2.2:3000/api/v1/`

### Para iOS Simulator:
- URL: `http://localhost:3000/api/v1/`

### Para Dispositivo Físico:
- URL: `http://[SEU_IP]:3000/api/v1/`
- Substitua `[SEU_IP]` pelo IP da sua máquina na rede

## Comandos Úteis:

```bash
# Limpar cache
npx expo start --clear

# Reset completo
npx expo start --clear --reset-cache

# Verificar dependências
npm install

# Verificar versão do Expo
npx expo --version
```

## Se o Problema Persistir:

1. Verifique se o backend está rodando
2. Teste a API no Postman ou Insomnia
3. Verifique os logs do servidor backend
4. Confirme se as credenciais estão corretas
5. Tente criar uma nova conta de teste 