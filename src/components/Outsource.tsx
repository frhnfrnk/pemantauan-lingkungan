import dynamic from "next/dynamic";
import "leaflet/dist/leaflet.css";
import { useEffect, useState } from "react";

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
		fetch(
			`/api/outsource/bmkg/weather?domain=${encodeURIComponent(selectedDomain)}&province=${encodeURIComponent(
				selectedProvince
			)}&p=t&formatted=true`
		)
			.then((res) => res.json())
			.then((data) => {
				setSelectedDomainWeather({
					temperature: getClosestTimeRangeValue(data),
					humidity: null,
					windSpeed: null,
					windDirection: null,
				} as WeatherData);
			});
	}, [selectedDomain]);

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
		<div className="flex flex-col gap-4">
			<select onChange={(e) => setSelectedProvince(e.target.value)} value={selectedProvince || ""}>
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
			<select onChange={(e) => setSelectedDomain(e.target.value)} value={selectedDomain || ""}>
				{availableDomains.map((domain, i) => {
					return (
						<option key={i} value={domain}>
							{domain}
						</option>
					);
				})}
			</select>
			<p>{selectedDomainWeather?.temperature}</p>
		</div>
	);
}
