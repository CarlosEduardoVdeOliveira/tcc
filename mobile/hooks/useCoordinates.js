import { useEffect, useState } from 'react';

// Função para validar coordenadas
export const isValidCoordinates = (lat, lng) => {
  // Verifica se os valores não são nulos, indefinidos ou strings vazias
  if (lat === null || lat === undefined || lat === '' || 
      lng === null || lng === undefined || lng === '') {
    return false;
  }
  
  const latitude = typeof lat === 'string' ? parseFloat(lat) : lat;
  const longitude = typeof lng === 'string' ? parseFloat(lng) : lng;
  
  return (
    typeof latitude === 'number' && 
    typeof longitude === 'number' && 
    latitude >= -90 && latitude <= 90 && 
    longitude >= -180 && longitude <= 180 &&
    !isNaN(latitude) && !isNaN(longitude)
  );
};

// Função para converter coordenadas para números
export const parseCoordinates = (lat, lng) => {
  // Se os valores são nulos, indefinidos ou strings vazias, retorna null
  if (lat === null || lat === undefined || lat === '' || 
      lng === null || lng === undefined || lng === '') {
    return { latitude: null, longitude: null };
  }
  
  const latitude = typeof lat === 'string' ? parseFloat(lat) : lat;
  const longitude = typeof lng === 'string' ? parseFloat(lng) : lng;
  
  return { latitude, longitude };
};

// Hook para gerenciar coordenadas
export const useCoordinates = (initialLat = null, initialLng = null) => {
  const [latitude, setLatitude] = useState(initialLat);
  const [longitude, setLongitude] = useState(initialLng);
  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    const { latitude: parsedLat, longitude: parsedLng } = parseCoordinates(initialLat, initialLng);
    setLatitude(parsedLat);
    setLongitude(parsedLng);
    setIsValid(isValidCoordinates(initialLat, initialLng));
  }, [initialLat, initialLng]);

  const updateCoordinates = (lat, lng) => {
    const { latitude: parsedLat, longitude: parsedLng } = parseCoordinates(lat, lng);
    setLatitude(parsedLat);
    setLongitude(parsedLng);
    setIsValid(isValidCoordinates(lat, lng));
  };

  const getCoordinatesArray = () => {
    return isValid ? [latitude, longitude] : null;
  };

  return {
    latitude,
    longitude,
    isValid,
    updateCoordinates,
    getCoordinatesArray,
    setLatitude,
    setLongitude
  };
}; 