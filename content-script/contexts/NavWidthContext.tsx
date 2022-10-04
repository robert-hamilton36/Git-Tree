import React, { useContext, useState } from 'react'

export const startingWidth = 201

const NavWidthContext = React.createContext<Context>(null)

export function useNavWidth (): Context {
  return useContext(NavWidthContext)
}

export const NavWidthProvider: React.FC<ReactChildren> = ({ children }) => {
  const [navWidth, setNavWidth] = useState(startingWidth)

  const value = {
    navWidth,
    setNavWidth
  }

  return (
    <NavWidthContext.Provider value={value}>
      {children}
    </NavWidthContext.Provider>
  )
}

export const TestStartingWidth = startingWidth

interface Context {
  navWidth: number,
  setNavWidth: React.Dispatch<React.SetStateAction<number>>
}
