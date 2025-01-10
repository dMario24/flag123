'use client';


import dynamic from 'next/dynamic';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// https://leafletjs.com/examples/custom-icons/
const customIcon = new L.Icon({
  // iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png', // 커스텀 아이콘 경로
  iconUrl: '/map/green-flag-55x77.png',
  iconSize: [55, 77], // 아이콘 크기
  iconAnchor: [9, 73], // 기준점 (아이콘의 아래쪽 중간) - https://ko.pixspy.com/?utm_source=chatgpt.com
  // shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png', // 그림자
  shadowUrl: '/map/marker-shadow.png', // 그림자
  shadowSize: [41, 41],
  shadowAnchor: [12, 41],
});

const MapContainerDynamic = dynamic(() => import('react-leaflet').then(mod => mod.MapContainer), { ssr: false });
const TileLayerDynamic = dynamic(() => import('react-leaflet').then(mod => mod.TileLayer), { ssr: false });
const MarkerDynamic = dynamic(() => import('react-leaflet').then(mod => mod.Marker), { ssr: false });

export default function MapSection({ latitude, longitude }: { latitude: number; longitude: number }) {
  return (
    // https://react-leaflet.js.org/docs/api-map/
    // https://yhuj79.github.io/React/241010/
    <div className="mt-8 w-full max-w-2xl h-80">
      <MapContainerDynamic
        center={[latitude, longitude]}
        zoom={14}
        className="w-full h-full rounded-md"
      >
        <TileLayerDynamic
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <MarkerDynamic position={[latitude, longitude]} icon={customIcon} />
      </MapContainerDynamic>
    </div>
  );
}