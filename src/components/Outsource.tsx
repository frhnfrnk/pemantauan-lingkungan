import dynamic from "next/dynamic";
import "leaflet/dist/leaflet.css";
import { useEffect, useState } from "react";
import "tailwindcss/tailwind.css";

interface WeatherData {
	temperature: String | null;
	humidity: String | null;
	windSpeed: String | null;
	windDirection: String | null;
}

export default function Outsource() {
	const [availableProvinces, setAvailableProvinces] = useState<string[]>([]);
	const [availableDomains, setAvailableDomains] = useState<string[]>([]);

	const [selectedProvince, setSelectedProvince] = useState<string | null>(null);
	const [selectedDomain, setSelectedDomain] = useState<string | null>(null);

	const [selectedDomainWeather, setSelectedDomainWeather] = useState<WeatherData | null>(null);

	useEffect(() => {
		fetch("/api/outsource/bmkg/index?q=domain")
			.then((res) => res.json())
			.then((data) => setAvailableProvinces(data));
	}, []);

	useEffect(() => {
		if (!selectedProvince) return;
		fetch("/api/outsource/bmkg/index?q=domain&province=" + encodeURIComponent(selectedProvince))
			.then((res) => res.json())
			.then((data) => setAvailableDomains(data));
	}, [selectedProvince]);

	useEffect(() => {
		if (!selectedDomain || !selectedProvince) return;
		getWeatherData(selectedDomain, selectedProvince);
	}, [selectedDomain]);

	async function getWeatherData(selectedDomain: string, selectedProvince: string) {
		const weatherData = {
			temperature: null,
			humidity: null,
			windSpeed: null,
			windDirection: null,
		};

		const temperatureData = await fetch(
			`/api/outsource/bmkg/weather?domain=${encodeURIComponent(selectedDomain)}&province=${encodeURIComponent(
				selectedProvince
			)}&p=t&formatted=true`
		);

		const humidityData = await fetch(
			`/api/outsource/bmkg/weather?domain=${encodeURIComponent(selectedDomain)}&province=${encodeURIComponent(
				selectedProvince
			)}&p=hu&formatted=true`
		);

		const windSpeedData = await fetch(
			`/api/outsource/bmkg/weather?domain=${encodeURIComponent(selectedDomain)}&province=${encodeURIComponent(
				selectedProvince
			)}&p=ws&formatted=true`
		);

		const windDirectionData = await fetch(
			`/api/outsource/bmkg/weather?domain=${encodeURIComponent(selectedDomain)}&province=${encodeURIComponent(
				selectedProvince
			)}&p=wd&formatted=true`
		);

		weatherData.temperature = getClosestTimeRangeValue(await temperatureData.json());
		weatherData.humidity = getClosestTimeRangeValue(await humidityData.json());
		weatherData.windSpeed = getClosestTimeRangeValue(await windSpeedData.json());
		weatherData.windDirection = getClosestTimeRangeValue(await windDirectionData.json());

		setSelectedDomainWeather(weatherData);
	}

	function getClosestTimeRangeValue(data: any) {
		const timerange = data.timerange;
		const currentTime = new Date();
		let closestTime = null;
		let closestTimeDiff = Infinity;
		let closestValue = null;

		for (const time in timerange) {
			const rangeTime = new Date(
				time.slice(0, 4) +
					"-" +
					time.slice(4, 6) +
					"-" +
					time.slice(6, 8) +
					"T" +
					time.slice(8, 10) +
					":" +
					time.slice(10, 12) +
					":00Z"
			);
			const timeDiff = Math.abs(currentTime.getTime() - rangeTime.getTime());

			if (timeDiff < closestTimeDiff) {
				closestTimeDiff = timeDiff;
				closestTime = time;
				closestValue = timerange[time];
			}
		}

		if (closestValue) {
			return closestValue.map((entry: any) => `${entry.value}${entry.unit}`).join(", ");
		} else {
			return "No data available";
		}
	}

	return (
		<div className="flex flex-col gap-4 w-full p-8">
			<select
				className="border-2 py-2 px-4 rounded-md border-black"
				onChange={(e) => setSelectedProvince(e.target.value)}
				value={selectedProvince || ""}
			>
				<option value="" disabled>
					Select a province
				</option>
				{availableProvinces.map((province, i) => {
					return (
						<option key={i} value={province}>
							{province}
						</option>
					);
				})}
			</select>
			<select
				className="border-2 py-2 px-4 rounded-md border-black"
				onChange={(e) => setSelectedDomain(e.target.value)}
				value={selectedDomain || ""}
			>
				<option value="" disabled>
					Select an area
				</option>
				{availableDomains.map((domain, i) => {
					return (
						<option key={i} value={domain}>
							{domain}
						</option>
					);
				})}
			</select>
			{selectedDomainWeather && (
				<div className="border-2 border-black rounded-lg p-6 w-4/5 mx-auto">
					<h2 className="text-2xl font-bold mb-4 text-center">Weather Information</h2>
					<div className="grid grid-cols-2 gap-4">
						<div className="flex flex-row items-center">
							<p className="font-semibold w-32">Temperature:</p>
							<p>{selectedDomainWeather?.temperature}°C</p>
						</div>
						<div className="flex flex-row items-center">
							<p className="font-semibold w-32">Humidity:</p>
							<p>{selectedDomainWeather?.humidity}%</p>
						</div>
						<div className="flex flex-row items-center">
							<p className="font-semibold w-32">Wind Speed:</p>
							<p>{selectedDomainWeather?.windSpeed} km/h</p>
						</div>
						<div className="flex flex-row items-center">
							<p className="font-semibold w-32">Wind Direction:</p>
							<p>{selectedDomainWeather?.windDirection}</p>
						</div>
					</div>
				</div>
				// <>
				// 	<div className="flex flex-row gap-x-4">
				// 		<p>Temperature :</p>
				// 		<p>{selectedDomainWeather?.temperature}</p>
				// 	</div>
				// 	<div className="flex flex-row gap-x-4">
				// 		<p>Humidity :</p>
				// 		<p>{selectedDomainWeather?.humidity}</p>
				// 	</div>
				// 	<div className="flex flex-row gap-x-4">
				// 		<p>Wind Speed :</p>
				// 		<p>{selectedDomainWeather?.windSpeed}</p>
				// 	</div>
				// 	<div className="flex flex-row gap-x-4">
				// 		<p>Wind Direction :</p>
				// 		<p>{selectedDomainWeather?.windDirection}</p>
				// 	</div>
				// </>
			)}
		</div>
	);
}
