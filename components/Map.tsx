import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { Icon } from "leaflet";
import "leaflet/dist/leaflet.css";

export default function MapC() {
  const position = [52.51, 13.38];

  const customIcon = new Icon({
    iconUrl: "/icons8-select-24.png",
    iconSize: [20, 20],
  });

  return (
    <section className="map-component">
      <div className="map">
        <MapContainer center={[52.51, 13.38]} zoom={6} scrollWheelZoom={true}>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={[52.51, 13.38]} icon={customIcon}>
            <Popup>🐻🍻🎉</Popup>
          </Marker>
        </MapContainer>
      </div>
    </section>
  );
}
