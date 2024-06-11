import Outsource from "@/components/Outsource";
import { useRouter } from "next/router";

export default function OutsourcePage() {
	const router = useRouter();

	return (
		<div className="flex">
			<Outsource />
		</div>
	);
}
