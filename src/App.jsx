import { useState } from 'react'
import MainLayout from "./layouts/MainLayout";
import MapSection from "./components/map/MapSection";


function App() {

  return (
    <>
     <MainLayout>
        <MapSection></MapSection>
     </MainLayout>
    </>
  )
}

export default App
