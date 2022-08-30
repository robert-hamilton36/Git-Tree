import React, { useContext, useState } from 'react'

const NavWidthContext = React.createContext<Context>(null)

export function useNavWidth (): Context {
  return useContext(NavWidthContext)
}

export const NavWidthProvider: React.FC<Children> = ({ children }) => {
  const [navWidth, setNavWidth] = useState(201)

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

interface Children {
  children: React.ReactNode
}

interface Context {
  navWidth: number,
  setNavWidth: React.Dispatch<React.SetStateAction<number>>
}
