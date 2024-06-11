import { useEffect, useState } from 'react';
import AirQualityChart from '@/components/TrendChart';

export default function Home() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://iai-be-deploy.vercel.app/api/hello');
        const jsonData = await response.json();
        const formattedData = jsonData.features.map((feature: { id: any; properties: { air_quality_index: any; pm10: any; pm2_5: any; o3: any; no2: any; so2: any; }; }) => ({
          id: feature.id,
          air_quality_index: feature.properties.air_quality_index,
          pm10: feature.properties.pm10,
          pm2_5: feature.properties.pm2_5,
          o3: feature.properties.o3,
          no2: feature.properties.no2,
          so2: feature.properties.so2,
        }));
        setData(formattedData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData(); // Initial fetch
    const interval = setInterval(fetchData, 3000); // Fetch data every 30 seconds

    return () => clearInterval(interval); // Cleanup

  }, []);

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-3xl font-bold my-8 text-center">Air Quality Comparison</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 justify-items-center">
        <AirQualityChart data={data} title="Air Quality Index" pollutant="air_quality_index" color="#3182CE" />
        <AirQualityChart data={data} title="Ozone (O3)" pollutant="o3" color="#9F7AEA" />
        <AirQualityChart data={data} title="Nitrogen Dioxide (NO2)" pollutant="no2" color="#F56565" />
        <AirQualityChart data={data} title="Sulfur Dioxide (SO2)" pollutant="so2" color="#48BB78" />
        <AirQualityChart data={data} title="Particulate Matter (PM10)" pollutant="pm10" color="#ED8936" />
        <AirQualityChart data={data} title="Particulate Matter (PM2.5)" pollutant="pm2_5" color="#667EEA" />
      </div>
    </div>
  );
}
