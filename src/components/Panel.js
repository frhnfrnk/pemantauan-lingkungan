import { FaHome } from "react-icons/fa";
import 'tailwindcss/tailwind.css';

import { IoSettings } from "react-icons/io5";
import { IoIosNotifications } from "react-icons/io";
import { useRouter } from "next/router";
import CustomizationPanel from "./CustomizationPanel";
import { useState } from "react";


export default function Panel() {

    const router = useRouter();
    const [isCustomizationHovered, setIsCustomizationHoverd] = useState(false);


    return (   
        <div className="flex">
            <div className="bg-[#008080] h-[100vh] w-[6vw] p-5">
                <div className="flex flex-col gap-16 items-center mt-52">
                    <IoSettings className="w-10 h-10 text-white cursor-pointer hover:opacity-90" onClick={() => setIsCustomizationHoverd(!isCustomizationHovered)}/>
                </div>
            </div>
            {isCustomizationHovered &&  <CustomizationPanel />}
        </div> 
    )
}