"use client";
import L from "leaflet";
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";
import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer } from "react-leaflet";

//@ts-ignore
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconUrl: markerIcon.src,
  iconRetinaUrl: markerIcon2x.src,
  shadowUrl: markerShadow.src,
});

interface MapProps {
  center?: number[];
}

const Map: React.FC<MapProps> = ({ center }) => {
  return (
    <MapContainer
      center={(center as L.LatLngExpression) || [51, -0.09]}
      zoom={center ? 4 : 2}
      scrollWheelZoom={false}
      className="h-[35vh] rounded-md"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
    </MapContainer>
  );
};

export default Map;
// "use client";
// import L from "leaflet";
// import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
// import markerIcon from "leaflet/dist/images/marker-icon.png";
// import markerShadow from "leaflet/dist/images/marker-shadow.png";
// import "leaflet/dist/leaflet.css";
// import { useEffect } from "react";
// import { MapContainer, TileLayer, useMap } from "react-leaflet";

// //@ts-ignore
// delete L.Icon.Default.prototype._getIconUrl;
// L.Icon.Default.mergeOptions({
//   iconUrl: markerIcon.src,
//   iconRetinaUrl: markerIcon2x.src,
//   shadowUrl: markerShadow.src,
// });

// interface MapProps {
//   location?: [number, number];
// }

// const MapComponent: React.FC<{ location?: [number, number] }> = ({
//   location,
// }) => {
//   const map = useMap();

//   useEffect(() => {
//     if (location) {
//       map.setView(location, 100);
//     }
//   }, [location, map]);

//   return null;
// };

// const Map: React.FC<MapProps> = ({ location }) => {
//   return (
//     <MapContainer
//       center={location || [51, -0.09]}
//       zoom={location ? 10 : 2}
//       scrollWheelZoom={false}
//       className="h-[35vh] rounded-md"
//     >
//       <TileLayer
//         url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//         attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//       />
//       <MapComponent location={location} />
//     </MapContainer>
//   );
// };

// export default Map;
