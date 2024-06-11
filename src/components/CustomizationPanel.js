import 'tailwindcss/tailwind.css';

import { useEffect, useState } from 'react';

export default function CustomizationPanel() {


    const getData = async () => {
        const response = await fetch("");
        const data = await response.json();
    }

    useEffect(() => {
        getData();
    }, []);


    return (
        <div className="bg-[#008080] h-[100vh] w-[20vw] p-8 overflow-y-auto">
            <div className='flex flex-col'>
                <p className='text-white font-semibold text-xl'>Customization</p>

            </div>
        </div>
    )
}