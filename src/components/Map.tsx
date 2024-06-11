import dynamic from 'next/dynamic';
import "leaflet/dist/leaflet.css";

// Dynamically import MapContainer, TileLayer, Marker, CircleMarker, Popup from react-leaflet
const MapContainer = dynamic(() => import('react-leaflet').then(mod => mod.MapContainer), { ssr: false });
const TileLayer = dynamic(() => import('react-leaflet').then(mod => mod.TileLayer), { ssr: false });
const Marker = dynamic(() => import('react-leaflet').then(mod => mod.Marker), { ssr: false });
const CircleMarker = dynamic(() => import('react-leaflet').then(mod => mod.CircleMarker), { ssr: false });
const Popup = dynamic(() => import('react-leaflet').then(mod => mod.Popup), { ssr: false });

function Map() {
  return (
    <main className="d w-[100%] h-[100vh] z-1"> {/* Changed h-[10vh] to h-[100vh] to ensure the map is fully visible */}
      <div>
        <MapContainer center={[-2.5489, 118.0149]} zoom={5} style={{ height: "100vh", width: "100%" }}>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <CircleMarker
            center={[-2.5489, 118.0149]} // Centered in Indonesia
            radius={10}
            color="transparent"
            fillColor="green"
            fillOpacity={0.5}
          >
            <Popup className="w-[460px] h-[150px]">
              <p className="text-[25px]">My Location in Indonesia</p>
            </Popup>
          </CircleMarker>
        </MapContainer>
      </div>
    </main>
  );
}

export default Map;
