import { FaHome } from "react-icons/fa";
import 'tailwindcss/tailwind.css';

import { IoSettings } from "react-icons/io5";
import { IoIosNotifications } from "react-icons/io";
import { useRouter } from "next/router";


export default function Panel() {

    const router = useRouter();


    return (   
        <div className="flex">
            <div className="bg-[#008080] h-[100vh] w-[6vw] p-5">
                <div className="flex flex-col gap-16 items-center mt-52">
                    <FaHome className="w-10 h-10 text-white cursor-pointer hover:opacity-90" onClick={() => router.push("/home")}/>
                    <IoIosNotifications className="w-10 h-10 text-white cursor-pointer hover:opacity-90" onClick={() => router.push("/notifications")}/>
                    <IoSettings className="w-10 h-10 text-white cursor-pointer hover:opacity-90" onClick={() => router.push("/settings")}/>
                </div>
            </div>
        </div> 
    )
}