import BMKGReader from "@/lib/BMKGDataUtil";
import { NextRequest, NextResponse } from "next/server";

/**
 * @name handler
 * @async
 * @function
 * @description Fetches weather data based on request parameters.
 * 
 * @param {NextRequest} req - The Next.js request object.
 * 
 * @param {string} req.query.p - Optional parameter specifying a weather parameter.
 * @param {string} req.query.formatted - Optional parameter indicating formatted output (true/false). Defaults to false.
 * @param {string} req.query.domain - Domain/area name for filtering weather data.
 * @param {string} req.query.province - Province name for filtering weather data.
 * 
 * @returns {Promise<Response>} A Promise resolving to a Response object containing weather data or error messages.
 * 
 * @throws {Error} - Throws an error if there's an issue fetching weather data.
 */
export async function GET(req: NextRequest) {
	const url = req.nextUrl;
	const parameter = url.searchParams.get("p");
	const formatted = url.searchParams.get("formatted") == "true";
	const domain = url.searchParams.get("domain");
	const province = url.searchParams.get("province");

	try {
		if (!domain)
			return new Response(JSON.stringify(await BMKGReader.getWeatherData(province)), {
				headers: { "content-type": "application/json" },
				status: 200,
			});

		if (!parameter) {
			const weatherData = await BMKGReader.getDomainWeatherData(domain, province);
			if (!weatherData)
				return new Response(JSON.stringify({ message: "Domain not found on given province" }), {
					status: 404,
				});
			return new Response(JSON.stringify(weatherData), {
				headers: { "content-type": "application/json" },
				status: 200,
			});
		}

		const weatherParameterData = formatted
			? await BMKGReader.getDomainWeatherParameterDataFormatted(parameter, domain, province)
			: await BMKGReader.getDomainWeatherParameterData(parameter, domain, province);
		if (!weatherParameterData)
			return new Response(JSON.stringify({ message: "Parameter not found on given domain" }), {
				status: 404,
			});

		return new Response(JSON.stringify(weatherParameterData), {
			headers: { "content-type": "application/json" },
			status: 200,
		});
	} catch (error) {
		console.error(error);
		return new Response(JSON.stringify({ message: "Error fetching weather data" }), {
			status: 500,
		});
	}
}
