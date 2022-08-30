import React from 'react'
import { NavWidthProvider } from './contexts/NavWidthContext'
import { TreeProvider } from './contexts/TreeContext'
import { NavBar } from './navbar/NavBar'


const App = () => {
  return (
    <TreeProvider>
      <NavWidthProvider>
        <NavBar />
      </NavWidthProvider>
    </TreeProvider>
  )
}

export default App
