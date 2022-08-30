import React from 'react'
import { TreeProvider } from './contexts/TreeContext'
import { NavBar } from './navbar/NavBar'


const App = () => {
  return (
    <TreeProvider>
      <NavBar />
    </TreeProvider>
  )
}

export default App
