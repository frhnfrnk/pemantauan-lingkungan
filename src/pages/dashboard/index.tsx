import Panel from "@/components/Panel";
import { useRouter } from "next/router";


export default function Dashboard() {

    const router = useRouter();



    return (
        <div className="flex">
            <Panel />
        </div>
    )
}