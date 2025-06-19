// Validação de coordenadas
export const validateCoordinates = (latitude, longitude) => {
  const lat = parseFloat(latitude);
  const lng = parseFloat(longitude);
  
  if (isNaN(lat) || isNaN(lng)) {
    return { isValid: false, error: "Coordenadas devem ser números válidos" };
  }
  
  if (lat < -90 || lat > 90) {
    return { isValid: false, error: "Latitude deve estar entre -90 e 90" };
  }
  
  if (lng < -180 || lng > 180) {
    return { isValid: false, error: "Longitude deve estar entre -180 e 180" };
  }
  
  return { isValid: true, latitude: lat, longitude: lng };
};

// Validação de CPF/CNPJ
export const validateCpfCnpj = (value) => {
  const onlyNumbers = value.replace(/\D/g, "");
  
  if (onlyNumbers.length !== 11 && onlyNumbers.length !== 14) {
    return { isValid: false, error: "CPF deve ter 11 dígitos ou CNPJ deve ter 14 dígitos" };
  }
  
  return { isValid: true, value: onlyNumbers };
};

// Validação de email
export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  
  if (!emailRegex.test(email)) {
    return { isValid: false, error: "Email inválido" };
  }
  
  return { isValid: true };
};

// Validação de senha
export const validatePassword = (password) => {
  if (password.length < 6) {
    return { isValid: false, error: "Senha deve ter pelo menos 6 caracteres" };
  }
  
  return { isValid: true };
};

// Validação de data
export const validateDate = (date) => {
  const dateObj = new Date(date);
  
  if (isNaN(dateObj.getTime())) {
    return { isValid: false, error: "Data inválida" };
  }
  
  const today = new Date();
  if (dateObj > today) {
    return { isValid: false, error: "Data não pode ser futura" };
  }
  
  return { isValid: true };
};

// Validação de nome
export const validateName = (name) => {
  if (name.length < 3) {
    return { isValid: false, error: "Nome deve ter pelo menos 3 caracteres" };
  }
  
  if (!/^[a-zA-ZÀ-ÿ\s]+$/.test(name)) {
    return { isValid: false, error: "Nome deve conter apenas letras" };
  }
  
  return { isValid: true };
}; 