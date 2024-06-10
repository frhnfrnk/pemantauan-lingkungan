import Panel from "@/components/Panel";
import { useRouter } from "next/router";
import { MapContainer,TileLayer, Marker, Popup } from "react-leaflet";


export default function Dashboard() {

    const router = useRouter();



    return (
        <div className="flex">
            <Panel />
            <MapContainer center={[48.8566, 2.3522]} zoom={13}>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />    
            </MapContainer>
        </div>
    )
}