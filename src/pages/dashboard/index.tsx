import dynamic from 'next/dynamic';
import Panel from "@/components/Panel";
import { useRouter } from "next/router";
import Map from '@/components/Map';

// Dynamically import MapContainer, TileLayer, Marker, and Popup from react-leaflet
const MapContainer = dynamic(() => import('react-leaflet').then(mod => mod.MapContainer), { ssr: false });
const TileLayer = dynamic(() => import('react-leaflet').then(mod => mod.TileLayer), { ssr: false });
const Marker = dynamic(() => import('react-leaflet').then(mod => mod.Marker), { ssr: false });
const Popup = dynamic(() => import('react-leaflet').then(mod => mod.Popup), { ssr: false });

export default function Dashboard() {
    const router = useRouter();

    return (
        <div className="flex">
            <Panel />
            <Map />
        </div>
    );
}
