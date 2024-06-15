import React, {useMemo, useState} from 'react';
import './index.css';
import dynamic from 'next/dynamic';
import PopUpCharts from '../../components/PopUpCharts';
import { IoBarChartOutline } from "react-icons/io5";

export default function MyPage() {
  const [showChart, setShowChart] = useState(true)

  const Map = useMemo(() => dynamic(
    () => import('@/components/Map4'),
    { 
      loading: () => <p>A map is loading</p>,
      ssr: false
    }
  ), [])

  const closeChart = (e) => {
    if (e.currentTarget === e.target){
      setShowChart(true)
    }  
  }

  return (
    <div>
      <button
        onClick={() => setShowChart(!showChart)} 
        className='absolute top-60 left-5 flex items-center justify-center h-[60px] w-[60px] bg-white rounded-full'
        style={{zIndex: 52}}
      >
        <IoBarChartOutline className='w-[25px] h-[25px]'/>
      </button>
      <Map />
      <PopUpCharts hidden={showChart} clickBackGround={closeChart} />
    </div>
  )
}

