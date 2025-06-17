import { useState, useCallback } from 'react';
import { 
  validateCoordinates, 
  validateCpfCnpj, 
  validateEmail, 
  validatePassword, 
  validateDate, 
  validateName 
} from '../utils/validation';

export const useFormValidation = (initialValues = {}) => {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  const validateField = useCallback((name, value) => {
    switch (name) {
      case 'name':
        return validateName(value);
      case 'email':
        return validateEmail(value);
      case 'password':
        return validatePassword(value);
      case 'cpfCnpj':
        return validateCpfCnpj(value);
      case 'startDate':
        return validateDate(value);
      case 'latitude':
      case 'longitude':
        // Para coordenadas, validamos ambas juntas
        const lat = name === 'latitude' ? value : values.latitude;
        const lng = name === 'longitude' ? value : values.longitude;
        if (lat && lng) {
          return validateCoordinates(lat, lng);
        }
        return { isValid: true };
      default:
        return { isValid: true };
    }
  }, [values]);

  const handleChange = useCallback((name, value) => {
    setValues(prev => ({ ...prev, [name]: value }));
    
    // Validar campo quando alterado
    const validation = validateField(name, value);
    setErrors(prev => ({
      ...prev,
      [name]: validation.isValid ? null : validation.error
    }));
  }, [validateField]);

  const handleBlur = useCallback((name) => {
    setTouched(prev => ({ ...prev, [name]: true }));
  }, []);

  const validateForm = useCallback(() => {
    const newErrors = {};
    let isValid = true;

    Object.keys(values).forEach(key => {
      const validation = validateField(key, values[key]);
      if (!validation.isValid) {
        newErrors[key] = validation.error;
        isValid = false;
      }
    });

    setErrors(newErrors);
    return isValid;
  }, [values, validateField]);

  const resetForm = useCallback(() => {
    setValues(initialValues);
    setErrors({});
    setTouched({});
  }, [initialValues]);

  const getFieldError = useCallback((name) => {
    return touched[name] ? errors[name] : null;
  }, [touched, errors]);

  return {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    validateForm,
    resetForm,
    getFieldError,
    setValues
  };
}; 