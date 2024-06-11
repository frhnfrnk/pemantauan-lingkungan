import BMKGReader from "@/lib/BMKGDataUtil";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
	const url = req.nextUrl;
	const query = url.searchParams.get("q");
	const province = url.searchParams.get("province");

	if (query == "domain")
		return new Response(JSON.stringify(await BMKGReader.getAvailableDomains(province)), {
			headers: { "content-type": "application/json" },
			status: 200,
		});

	if (query == "parameter")
		return new Response(JSON.stringify(await BMKGReader.getAvailableParameters()), {
			headers: { "content-type": "application/json" },
			status: 200,
		});

	if (query == "weatherCode")
		return new Response(JSON.stringify(await BMKGReader.getWeatherCodes()), {
			headers: { "content-type": "application/json" },
			status: 200,
		});
	if (query == "windCode")
		return new Response(JSON.stringify(await BMKGReader.getWindCodes()), {
			headers: { "content-type": "application/json" },
			status: 200,
		});

	return new Response(JSON.stringify({ message: "Invalid Request" }), {
		status: 400,
	});
}
