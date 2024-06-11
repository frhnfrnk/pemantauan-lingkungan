import Link from "next/link";
import "tailwindcss/tailwind.css";

export default function OutsourcePage() {
	return (
		<div className="flex flex-col">
			<nav className="bg-blue-500 p-4">
				<div className="container mx-auto flex justify-between items-center">
					<div className="text-white text-xl font-bold">
						<p>Outsource Data</p>
					</div>
				</div>
			</nav>
			<div className="flex flex-col items-center w-full mt-8">
				<p className=" font-bold text-4xl">Data Sources</p>
				<Link className="mt-4 py-4 border-2 w-7/12 border-black text-center text-lg rounded-lg transition-colors hover:bg-green-500 hover:text-white" href="/outsource/bmkg">BMKG</Link>
			</div>
		</div>
	);
}
