import { Parser } from "xml2js";

/**
 * @class BMKGReader
 * @description A helper class for fetching and processing weather data from BMKG (Indonesian Meteorological, Climatological, and Geophysical Agency).
 */
class BMKGReader {
	/**
	 * @private
	 * @static
	 * @type {string}
	 * @description The base URL for BMKG weather data API.
	 */
	private static BASE_URL = "https://data.bmkg.go.id";

	/**
	 * @private
	 * @static
	 * @type {Parser}
	 * @description An instance of xml2js Parser for parsing weather data XML.
	 */
	private static parser = new Parser();

	/**
	 * @static
	 * @param {string} province - Optional province name for filtering weather data. Defaults to "Indonesia".
	 * @returns {URL} A URL object constructed for the specific province.
	 * @description Generates a URL for fetching weather data based on the provided province.
	 */
	public static getWeatherDataURL(province?: String | undefined | null): URL {
		if (!province) province = "Indonesia";
		return new URL(`./DataMKG/MEWS/DigitalForecast/DigitalForecast-${province.replace(" ", "")}.xml`, BMKGReader.BASE_URL);
	}

	/**
	 * @static
	 * @param {string} province - Optional province name for filtering weather data. Defaults to undefined.
	 * @returns {Promise<any>} A Promise resolving to the parsed weather data object.
	 * @throws {Error} - Throws an error if fetching or parsing weather data fails.
	 * @description Fetches and parses weather data for the specified province from BMKG API.
	 */
	public static async getWeatherData(province?: String | undefined | null): Promise<any> {
		const response = await fetch(BMKGReader.getWeatherDataURL(province));
		if (!response.ok) {
			console.error(response.statusText);
			throw new Error("Failed to fetch weather data.");
		}

		return new Promise(async (resolve, reject) => {
			BMKGReader.parser.parseString(await response.text(), (err, result) => {
				if (err) reject(err);
				else resolve(result);
			});
		});
	}

	/**
	 * @static
	 * @param {string} domain - The domain name for filtering weather data.
	 * @param {string} province - Optional province name for filtering weather data. Defaults to undefined.
	 * @returns {any} The weather data object for the specified domain within the province (if provided).
	 * @throws {Error} - Might throw an error if data fetching fails. (implicit)
	 * @description Retrieves weather data for a specific domain within the provided province (if available).
	 */
	public static async getDomainWeatherData(domain: String, province?: String | undefined | null) {
		const data = await BMKGReader.getWeatherData(province);
		const domainData = province
			? data.data.forecast[0].area.find((area: any) => area.$.description == domain)
			: data.data.forecast[0].area.find((area: any) => area.$.domain == domain);
		return domainData;
	}

	/**
	 * @static
	 * @param {string} parameterId - The ID of the weather parameter to retrieve.
	 * @param {string} domain - The domain name for filtering weather data.
	 * @param {string} province - Optional province name for filtering weather data. Defaults to undefined.
	 * @returns {any} The weather parameter data object for the specified ID within the domain (if available).
	 * @throws {Error} - Might throw an error if data fetching fails. (implicit)
	 * @description Retrieves a specific weather parameter data object for the given ID within the specified domain and province (if provided).
	 */
	public static async getDomainWeatherParameterData(
		parameterId: String,
		domain: String,
		province?: String | undefined | null
	) {
		const data = await BMKGReader.getDomainWeatherData(domain, province);
		const parameterData = data.parameter.find((parameter: any) => parameter.$.id == parameterId);
		return parameterData;
	}

	/**
	 * @static
	 * @param {string} parameterId - The ID of the weather parameter to retrieve.
	 * @param {string} domain - The domain name for filtering weather data.
	 * @param {string} province - Optional province name for filtering weather data. Defaults to undefined.
	 * @returns {any} The formatted weather parameter data object for the specified ID within the domain (if available).
	 * @throws {Error} - Might throw an error if data fetching fails. (implicit)
	 * @description Retrieves and formats weather parameter data for the given ID within the specified domain and province (if provided).
	 */
	public static async getDomainWeatherParameterDataFormatted(
		parameterId: String,
		domain: String,
		province?: String | undefined | null
	) {
		const parameterData = await BMKGReader.getDomainWeatherParameterData(parameterId, domain, province);
		if (!parameterData) return null;
		const resultData = parameterData.$;
		resultData.timerange = {};
		for (let tr of parameterData.timerange) {
			resultData.timerange[tr.$.datetime] = tr.value.map((value: any) => {
				return { value: value._, unit: value.$.unit };
			});
		}

		return resultData;
	}

	public static async getAvailableDomains(province?: String | undefined | null) {
		const data = await BMKGReader.getWeatherData(province);
		if (!data) return [];
		const domains = data.data.forecast[0].area.map((area: any) => (province ? area.$.description : area.$.domain));
		return domains;
	}

	public static getAvailableParameters() {
		return ["weather", "t", "tmin", "tmax", "hu", "humin", "humax", "ws", "wd"];
	}

	public static getWeatherCodes() {
		return {
			"0": { "id-ID": "Cerah", "en-US": "Clear Skies" },
			"1": { "id-ID": "Cerah Berawan", "en-US": "Partly Cloudy" },
			"2": { "id-ID": "Cerah Berawan", "en-US": "Partly Cloudy" },
			"3": { "id-ID": "Berawan", "en-US": "Mostly Cloudy" },
			"4": { "id-ID": "Berawan Tebal", "en-US": "Overcast" },
			"5": { "id-ID": "Udara Kabur", "en-US": "Haze" },
			"10": { "id-ID": "Asap", "en-US": "Smoke" },
			"45": { "id-ID": "Kabut", "en-US": "Fog" },
			"60": { "id-ID": "Hujan Ringan", "en-US": "Light Rain" },
			"61": { "id-ID": "Hujan Sedang", "en-US": "Rain" },
			"63": { "id-ID": "Hujan Lebat", "en-US": "Heavy Rain" },
			"80": { "id-ID": "Hujan Lokal", "en-US": "Isolated Shower" },
			"95": { "id-ID": "Hujan Petir", "en-US": "Severe Thunderstorm" },
			"97": { "id-ID": "Hujan Petir", "en-US": "Severe Thunderstorm" },
		};
	}

	public static getWindCodes() {
		return {
			N: "North",
			NNE: "North-Northeast",
			NE: "Northeast",
			ENE: "East-Northeast",
			E: "East",
			ESE: "East-Southeast",
			SE: "Southeast",
			SSE: "South-Southeast",
			S: "South",
			SSW: "South-Southwest",
			SW: "Southwest",
			WSW: "West-Southwest",
			W: "West",
			WNW: "West-Northwest",
			NW: "Northwest",
			NNW: "North-Northwest",
			VARIABLE: "berubah-ubah",
		};
	}
}

export default BMKGReader;
