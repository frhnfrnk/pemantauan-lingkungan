import React, { useEffect, useState, useRef } from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import { IoSettings } from "react-icons/io5"; // Import the settings icon
import "leaflet/dist/leaflet.css";
import PanelData from "./PanelData";
import CustomDynamicMarker from "./CustomDynamicMarker";
import axios from "axios";
import CustomPanelData from "./CustomPanelData";

const API_URL = "https://iai-be-deploy.vercel.app/api/hello";

function App() {
  const mapRef = useRef(null);
  const [mapInitialized, setMapInitialized] = useState(false);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [displayDataIndex, setDisplayDataIndex] = useState(0);
  const [toggleDisplayData, setToggleDisplayData] = useState(false);
  const [settingsModalOpen, setSettingsModalOpen] = useState(false);
  const [selectedProperties, setSelectedProperties] = useState({
    air_quality_index: true,
    pm10: true,
    pm2_5: true,
    o3: true,
    no2: true,
    so2: true,
    co: true,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(API_URL);
        setData(response.data.features);
        setLoading(true);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    const fetchDataInterval = setInterval(fetchData, 3000); 

    return () => {
      clearInterval(fetchDataInterval);
    };
  }, []);

  const handleClick = (index) => {
    console.log("Marker clicked:", index);
    setDisplayDataIndex(index);
  };

  const handleSettingsSave = () => {
    setSettingsModalOpen(false);
  };

  const handleSettingsChange = (property) => {
    setSelectedProperties({
      ...selectedProperties,
      [property]: !selectedProperties[property],
    });
  };

  const toggleSettingsModal = () => {
    setSettingsModalOpen(!settingsModalOpen);
  };

  return (
    <div>
      {/* Settings Button */}
      <div className="absolute top-0 left-0 mt-4 ml-4 z-50">
        <button
          onClick={toggleSettingsModal}
          className="bg-white shadow-md rounded-full p-2 hover:bg-gray-100"
        >
          <IoSettings size={24} />
        </button>
      </div>
      {loading && (
        <div
          className={`absolute z-50 ${
            toggleDisplayData ? "" : "-translate-x-96 opacity-0"
          } top-1/2 -translate-y-1/2 duration-200 shadow-lg ml-10`}
        >
          <CustomPanelData properties={data[displayDataIndex].properties} selectedProperties={selectedProperties}/>
        </div>
      )}
      <div class="w-full h-screen relative z-0">
        <div style={{ height: "400px", width: "100wh" }}>
          <MapContainer
            center={[-7.819405, 110.357586]}
            zoom={12}
            scrollWheelZoom={true}
            style={{ height: "100vh", width: "100wh" }}
            ref={mapRef}
            whenReady={() => {
              setMapInitialized(true);
            }}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {loading &&
              data.map((point, index) => (
                <CustomDynamicMarker
                  key={index}
                  position={[
                    point.geometry.coordinates[1],
                    point.geometry.coordinates[0],
                  ]}
                  properties={point.properties}
                  index={index}
                  handleClick={handleClick} 
                  setToggleDisplayData={setToggleDisplayData}
                  selectedProperties={selectedProperties}
                />
              ))}
          </MapContainer>
        </div>
      </div>
      {/* Settings Modal */}
      {settingsModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-8 rounded-lg">
            <h2 className="text-lg font-semibold mb-4">Settings</h2>
            <div className="space-y-2">
              {Object.keys(selectedProperties).map((property) => (
                <div key={property} className="flex items-center">
                  <input
                    type="checkbox"
                    checked={selectedProperties[property]}
                    onChange={() => handleSettingsChange(property)}
                    className="mr-2"
                  />
                  <label htmlFor={property}>{property}</label>
                </div>
              ))}
            </div>
            <button
              onClick={handleSettingsSave}
              className="bg-blue-500 text-white px-4 py-2 mt-4 rounded hover:bg-blue-600"
            >
              Save
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
