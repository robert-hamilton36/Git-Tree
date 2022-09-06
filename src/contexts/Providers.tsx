import React from 'react'
import { NavWidthProvider } from './NavWidthContext'
import { TreeProvider } from './TreeContext'

export const Providers: React.FC<ReactChildren> = ({ children }) => {
  return (
    <TreeProvider>
      <NavWidthProvider>
        { children }
      </NavWidthProvider>
    </TreeProvider>
  )
}
