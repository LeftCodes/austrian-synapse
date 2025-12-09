import React from 'react'
import Map from './Map'
import MapFilter from './MapFilter'
import MapCounter from './MapCounter'
import MapInfos from './MapInfos'

function MapSection() {
  return (
    <div className='fixed h-screen w-screen bg-black'>
        <Map />
        <MapFilter />
        <MapCounter />
        <MapInfos />
    </div>
  )
}

export default MapSection