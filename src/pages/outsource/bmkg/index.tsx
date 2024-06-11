import Outsource from "@/components/Outsource";
import Link from "next/link";

export default function OutsourceBMKGPage() {
	return (
		<div className="flex flex-col">
			<nav className="bg-blue-500 p-4">
				<div className="container mx-auto flex justify-between items-center">
					<div className="text-white text-xl font-bold">
						<p>Outsource Data: BMKG</p>
					</div>
				</div>
			</nav>
			<Outsource />
		</div>
	);
}
