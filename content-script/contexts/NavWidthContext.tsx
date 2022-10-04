import React, { useContext, useState } from 'react'
import { editDocumentBodyMargin } from '../util/createElements'

export const startingWidth = 201

const NavWidthContext = React.createContext<Context>(null)

export function useNavWidth (): Context {
  return useContext(NavWidthContext)
}

export const NavWidthProvider: React.FC<ReactChildren> = ({ children }) => {
  const [navWidth, _setNavWidth] = useState(startingWidth)

  const setNavWidth = (number:number) => {
    _setNavWidth(number)
    editDocumentBodyMargin(number)
  }

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
