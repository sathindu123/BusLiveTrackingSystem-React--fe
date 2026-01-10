import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";

type LiveMapProps = {
  lat?: number;
  lng?: number;
};

const containerStyle = {
  width: "100%",
  height: "220px",
  borderRadius: "16px",
};

export const LiveMap: React.FC<LiveMapProps> = ({ lat, lng }) => {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
  });

  if (!isLoaded) {
    return <p className="text-xs text-slate-400">Loading map...</p>;
  }

  const center = {
    lat: lat ?? 6.9271,   // Colombo default
    lng: lng ?? 79.8612,
  };

  return (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={13}
    >
      <Marker position={center} />
    </GoogleMap>
  );
};
