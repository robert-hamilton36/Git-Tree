import React from 'react'
import { Providers } from './contexts/Providers'
import { NavBar } from './navbar/NavBar'


const App = () => {
  return (
    <Providers>
      <NavBar />
    </Providers>
  )
}

export default App
