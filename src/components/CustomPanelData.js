import React from "react";
import { AQIColor } from "./helperfunction";

const CustomPanelData = ({ properties, selectedProperties }) => {
  // Destructure properties from props if needed
  console.log(properties);

  const { location, air_quality_index, pm10, pm2_5, o3, no2, so2, co, timestamp } = properties;

  const bgAQIcolor = AQIColor(air_quality_index);

  return (
    <div className="w-9/10 bg-white rounded-lg p-4">
      <h2 className="text-xl text-center font-bold mb-2">{location}</h2>
      {/* air quality */}
      {selectedProperties.air_quality_index && (
        <div className="text-center py-2 rounded-md mb-2 text-white" style={{ backgroundColor: bgAQIcolor }}>
          Air Quality Index
          <div className="white font-bold text-5xl"> {air_quality_index}</div>
        </div>
      )}
      {/* 2pm */}
      <div className="flex justify-between text-center text-white gap-2 mb-2">
        {selectedProperties.pm10 && (
          <div className="w-full bg-purple-400 p-4 rounded-xl">
            PM10 <div className="font-bold text-2xl">{pm10}</div>
          </div>
        )}
        {selectedProperties.pm2_5 && (
          <div className="w-full bg-violet-400 p-4 rounded-xl">
            PM2.5 <div className="font-bold text-2xl">{pm2_5}</div>
          </div>
        )}
      </div>
      {/* onosoco */}
      <div className="flex justify-between font-bold text-center gap-4 mb-4">
        {selectedProperties.o3 && (
          <div>
            <div className="bg-orange-400 w-14 p-4 rounded-full text-white">{o3}</div>
            <div className="text-xl">O3</div>
          </div>
        )}
        {selectedProperties.no2 && (
          <div>
            <div className="bg-amber-400 w-14 p-4 rounded-full text-white">{no2}</div>
            <div className="text-xl">NO2</div>
          </div>
        )}
        {selectedProperties.so2 && (
          <div>
            <div className="bg-yellow-400 w-14 p-4 rounded-full text-white">{so2}</div>
            <div className="text-xl">SO2</div>
          </div>
        )}
        {selectedProperties.co && (
          <div>
            <div className="bg-lime-400 w-14 p-4 rounded-full text-white">{co}</div>
            <div className="text-xl">CO</div>
          </div>
        )}
      </div>
      {selectedProperties.timestamp && <p>Timestamp: {timestamp}</p>}
    </div>
  );
};

export default CustomPanelData;
