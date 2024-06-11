import React, {useMemo} from 'react';
import './index.css';
import dynamic from 'next/dynamic';

export default function MyPage() {
  const Map = useMemo(() => dynamic(
    () => import('@/components/Map4'),
    { 
      loading: () => <p>A map is loading</p>,
      ssr: false
    }
  ), [])

  return <div>
    <Map />
  </div>
}

