import React from 'react'
import { GitRepoProvider } from './GitRepoContexts'
import { NavWidthProvider } from './NavWidthContext'
import { TreeProvider } from './TreeContext'

export const Providers: React.FC<ReactChildren> = ({ children }) => {
  return (
    <TreeProvider>
      <GitRepoProvider>
        <NavWidthProvider>
          { children }
        </NavWidthProvider>
      </GitRepoProvider>
    </TreeProvider>
  )
}
