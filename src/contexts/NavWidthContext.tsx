import React, { useContext, useState } from 'react'

const NavWidthContext = React.createContext<Context>(null)

export function useNavWidth (): Context {
  return useContext(NavWidthContext)
}

export const NavWidthProvider: React.FC<ReactChildren> = ({ children }) => {
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


interface Context {
  navWidth: number,
  setNavWidth: React.Dispatch<React.SetStateAction<number>>
}
