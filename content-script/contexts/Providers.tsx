import React from 'react'
import { GitRepoProvider } from './GitRepoContexts'
import { NavWidthProvider } from './NavWidthContext'
import { TreeProvider } from './TreeContext'
import { UserProvider } from './UserContext'

export const Providers: React.FC<ReactChildren> = ({ children }) => {
  return (
    <TreeProvider>
      <GitRepoProvider>
        <NavWidthProvider>
          <UserProvider>
            { children }
          </UserProvider>
        </NavWidthProvider>
      </GitRepoProvider>
    </TreeProvider>
  )
}
