# Solução para Erro 401 - Login

## 🔍 **Diagnóstico do Problema**

O erro 401 com a mensagem "Email ou senha inválidos" indica que:
- ✅ O servidor está funcionando
- ✅ A API está respondendo
- ❌ As credenciais estão incorretas

## 🚀 **Soluções**

### 1. **Criar Usuário de Teste**
Use o componente `TestLogin` para criar um usuário de teste:

1. Acesse a tela "🔧 Teste de Login" na tela inicial
2. Clique em "Criar Usuário de Teste"
3. Use as credenciais: `teste@teste.com` / `123456`

### 2. **Verificar Credenciais Existentes**
Se você já tem uma conta:
- Verifique se o email está correto
- Verifique se a senha está correta
- Tente criar uma nova conta

### 3. **Testar Conectividade**
Use o componente `TestLogin` para:
- Testar a saúde do servidor
- Testar o endpoint de login
- Verificar se a API está funcionando

## 📱 **Como Usar o TestLogin**

1. **Acesse a tela de teste:**
   - Vá para a tela inicial
   - Clique em "🔧 Teste de Login"

2. **Teste o servidor:**
   - Clique em "Testar Saúde do Servidor"
   - Deve mostrar "Servidor está funcionando!"

3. **Crie um usuário de teste:**
   - Clique em "Criar Usuário de Teste"
   - Use as credenciais fornecidas

4. **Teste o login:**
   - Digite as credenciais
   - Clique em "Testar Login"

## 🔧 **Credenciais de Teste**

Após criar o usuário de teste, use:
- **Email:** `teste@teste.com`
- **Senha:** `123456`

## 📋 **Passos para Resolver**

1. **Verifique se o backend está rodando**
2. **Acesse o TestLogin**
3. **Crie um usuário de teste**
4. **Teste o login com as credenciais**
5. **Use as credenciais no app principal**

## 🐛 **Se o Problema Persistir**

1. Verifique os logs no console
2. Confirme se o servidor está na porta 3000
3. Verifique se a URL da API está correta
4. Tente reiniciar o servidor backend

## 📞 **Logs Importantes**

Procure por estes logs:
- 🏥 Testando saúde do servidor
- 👤 Testando criação de usuário
- 🔐 Testando login com
- ✅ Usuário criado!
- ❌ Falha ao criar usuário 