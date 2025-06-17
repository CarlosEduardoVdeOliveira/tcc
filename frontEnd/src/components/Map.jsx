import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { useEffect, useState } from "react";
import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMapEvents,
} from "react-leaflet";

// Ícone personalizado com as cores do seu projeto
const CustomColoredIcon = new L.DivIcon({
  className: "",
  html: `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#eead2d" viewBox="0 0 24 24">
    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/>
    <circle cx="12" cy="9" r="2.5" fill="#3f3a36"/>
  </svg>`,
  iconAnchor: [16, 32],
  popupAnchor: [0, -32],
});

// Componente para lidar com cliques no mapa
function LocationMarker({ onClick }) {
  useMapEvents({
    click(e) {
      onClick([e.latlng.lat, e.latlng.lng]);
    },
  });
  return null;
}

export function Map({ onSelectLocation, latitude, longitude, ...props }) {
  const [markerPosition, setMarkerPosition] = useState(null);
  const [isLocationLoaded, setIsLocationLoaded] = useState(false);

  useEffect(() => {
    // Se coordenadas foram passadas como props, use-as como posição inicial
    if (latitude && longitude && !markerPosition) {
      const lat = parseFloat(latitude);
      const lng = parseFloat(longitude);
      
      // Verifica se as coordenadas são válidas
      if (!isNaN(lat) && !isNaN(lng) && lat >= -90 && lat <= 90 && lng >= -180 && lng <= 180) {
        const coords = [lat, lng];
        setMarkerPosition(coords);
        setIsLocationLoaded(true);
        if (onSelectLocation) {
          onSelectLocation(coords);
        }
      } else {
        console.warn('Coordenadas inválidas recebidas:', { latitude, longitude });
        // Se as coordenadas são inválidas, use geolocalização
        getCurrentLocation();
      }
    } else if (!markerPosition) {
      // Se não há coordenadas iniciais, use geolocalização
      getCurrentLocation();
    }
  }, [latitude, longitude, markerPosition, onSelectLocation]);

  const getCurrentLocation = () => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        const coords = [latitude, longitude];
        setMarkerPosition(coords);
        setIsLocationLoaded(true);
        if (onSelectLocation) {
          onSelectLocation(coords);
        }
      },
      (err) => {
        console.error("Erro ao pegar localização do usuário:", err);
        const fallback = [-19.55, -42.64];
        setMarkerPosition(fallback);
        setIsLocationLoaded(true);
        if (onSelectLocation) {
          onSelectLocation(fallback);
        }
      }
    );
  };

  if (!isLocationLoaded) {
    return <p>Carregando mapa...</p>;
  }

  return (
    <MapContainer
      center={markerPosition}
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

      {/* Captura clique no mapa */}
      <LocationMarker
        onClick={(coords) => {
          setMarkerPosition(coords);
          if (onSelectLocation) {
            onSelectLocation(coords);
          }
        }}
      />

      {/* Apenas um marcador, seja por geolocalização ou clique */}
      {markerPosition && (
        <Marker position={markerPosition} icon={CustomColoredIcon}>
          <Popup>
            Local selecionado: <br />
            Latitude: {markerPosition[0].toFixed(5)} <br />
            Longitude: {markerPosition[1].toFixed(5)}
          </Popup>
        </Marker>
      )}
    </MapContainer>
  );
}
