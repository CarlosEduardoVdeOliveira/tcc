import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { useEffect, useState, useRef } from "react";
import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  Polyline,
} from "react-leaflet";
import { useCoordinates, isValidCoordinates } from "../hooks/useCoordinates";
import { LoadingSpinner } from "./LoadingSpinner";
import { ErrorMessage } from "./ErrorMessage";

// Ícone personalizado para a posição atual
const CurrentLocationIcon = new L.DivIcon({
  className: "",
  html: `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#3b82f6" viewBox="0 0 24 24">
    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/>
    <circle cx="12" cy="9" r="2.5" fill="#ffffff"/>
  </svg>`,
  iconAnchor: [16, 32],
  popupAnchor: [0, -32],
});

// Ícone personalizado para a colmeia
const BeehiveIcon = new L.DivIcon({
  className: "",
  html: `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#eead2d" viewBox="0 0 24 24">
    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/>
    <circle cx="12" cy="9" r="2.5" fill="#3f3a36"/>
  </svg>`,
  iconAnchor: [16, 32],
  popupAnchor: [0, -32],
});

// Função para obter coordenadas padrão (Brasil)
const getDefaultCoordinates = () => [-15.7801, -47.9292]; // Brasília

// Função para calcular a distância entre dois pontos
const calculateDistance = (lat1, lon1, lat2, lon2) => {
  const R = 6371; // Raio da Terra em km
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
    Math.sin(dLon/2) * Math.sin(dLon/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  const distance = R * c; // Distância em km
  return distance;
};

export function MapWithRoute({ 
  beehiveLatitude,
  beehiveLongitude,
  beehiveName,
  ...props 
}) {
  const [currentPosition, setCurrentPosition] = useState(null);
  const [isLocationLoaded, setIsLocationLoaded] = useState(false);
  const [error, setError] = useState(null);
  const [distance, setDistance] = useState(null);
  const mapRef = useRef(null);

  // Log para debug das coordenadas recebidas
  console.log('MapWithRoute - Coordenadas recebidas:', { beehiveLatitude, beehiveLongitude, beehiveName });

  const { latitude: beehiveLat, longitude: beehiveLng, isValid: isBeehiveValid } = useCoordinates(beehiveLatitude, beehiveLongitude);

  // Log para debug das coordenadas processadas
  console.log('MapWithRoute - Coordenadas processadas:', { beehiveLat, beehiveLng, isBeehiveValid });

  useEffect(() => {
    // Obter posição atual do usuário
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const { latitude, longitude } = pos.coords;
          const coords = [latitude, longitude];
          setCurrentPosition(coords);
          setIsLocationLoaded(true);
          setError(null);

          // Calcular distância se a colmeia for válida
          if (isBeehiveValid && beehiveLat && beehiveLng) {
            const dist = calculateDistance(latitude, longitude, beehiveLat, beehiveLng);
            setDistance(dist);
          }
        },
        (err) => {
          console.error("Erro ao obter localização do usuário:", err);
          const fallback = getDefaultCoordinates();
          setCurrentPosition(fallback);
          setIsLocationLoaded(true);
          setError("Não foi possível obter sua localização. Usando localização padrão.");
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 60000
        }
      );
    } else {
      const fallback = getDefaultCoordinates();
      setCurrentPosition(fallback);
      setIsLocationLoaded(true);
      setError("Geolocalização não disponível. Usando localização padrão.");
    }
  }, [beehiveLat, beehiveLng, isBeehiveValid]);

  // Ajustar zoom e centro do mapa quando ambas as posições estiverem disponíveis
  useEffect(() => {
    if (currentPosition && isBeehiveValid && beehiveLat && beehiveLng && mapRef.current) {
      const bounds = L.latLngBounds([currentPosition, [beehiveLat, beehiveLng]]);
      mapRef.current.fitBounds(bounds, { padding: [20, 20] });
    }
  }, [currentPosition, beehiveLat, beehiveLng, isBeehiveValid]);

  if (!isLocationLoaded) {
    return (
      <div className="flex items-center justify-center h-64 bg-gray-100 rounded">
        <LoadingSpinner message="Carregando mapa..." />
      </div>
    );
  }

  const beehivePosition = isBeehiveValid && beehiveLat && beehiveLng ? [beehiveLat, beehiveLng] : null;
  const routePositions = currentPosition && beehivePosition ? [currentPosition, beehivePosition] : null;

  return (
    <div className="relative">
      {error && (
        <ErrorMessage 
          message={error} 
          type="warning"
          onClose={() => setError(null)}
        />
      )}
      
      {distance && (
        <div className="absolute top-2 left-2 z-10 bg-white bg-opacity-90 px-3 py-2 rounded-md shadow-md">
          <p className="text-sm font-medium text-gray-700">
            Distância até a colmeia: <span className="text-blue-600 font-bold">{distance.toFixed(2)} km</span>
          </p>
        </div>
      )}

      <MapContainer
        ref={mapRef}
        center={currentPosition || getDefaultCoordinates()}
        zoom={13}
        minZoom={1}
        maxZoom={20}
        style={{ height: "400px", width: "100%" }}
        {...props}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {/* Marcador da posição atual */}
        {currentPosition && (
          <Marker position={currentPosition} icon={CurrentLocationIcon}>
            <Popup>
              <div className="text-center">
                <strong>Sua localização atual</strong> <br />
                Latitude: {currentPosition[0].toFixed(6)} <br />
                Longitude: {currentPosition[1].toFixed(6)}
              </div>
            </Popup>
          </Marker>
        )}

        {/* Marcador da colmeia */}
        {beehivePosition && (
          <Marker position={beehivePosition} icon={BeehiveIcon}>
            <Popup>
              <div className="text-center">
                <strong>{beehiveName || 'Colmeia'}</strong> <br />
                Latitude: {beehivePosition[0].toFixed(6)} <br />
                Longitude: {beehivePosition[1].toFixed(6)}
              </div>
            </Popup>
          </Marker>
        )}

        {/* Linha da rota */}
        {routePositions && (
          <Polyline
            positions={routePositions}
            color="#3b82f6"
            weight={3}
            opacity={0.7}
            dashArray="10, 5"
          />
        )}
      </MapContainer>
    </div>
  );
} 