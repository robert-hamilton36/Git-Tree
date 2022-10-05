import React, { useContext, useState } from 'react'
import { editDocumentBodyMargin } from '../util/createElements'

export const startingWidth = 201

const NavWidthContext = React.createContext<WidthContext>(null)
const ShowNavContext = React.createContext<ShowContext>(null)

export function useNavWidth (): WidthContext {
  return useContext(NavWidthContext)
}

export function useShowNav (): ShowContext{
  return useContext(ShowNavContext)
}

export const NavWidthProvider: React.FC<ReactChildren> = ({ children }) => {
  const [navWidth, _setNavWidth] = useState(startingWidth)
  const [showNav, _setShowNav] = useState(true)

  const setNavWidth = (number:number) => {
    _setNavWidth(number)
    editDocumentBodyMargin(number)
  }

  const setShowNav = (boolean: boolean) => {
    _setShowNav(boolean)
    editDocumentBodyMargin(boolean ? navWidth : 0)
  }

  const showValue = {
    showNav,
    setShowNav
  }

  const widthValue = {
    navWidth,
    setNavWidth,
  }

  return (
    <ShowNavContext.Provider value={showValue}>
      <NavWidthContext.Provider value={widthValue}>
        {children}
      </NavWidthContext.Provider>
    </ShowNavContext.Provider>
  )
}

export const TestStartingWidth = startingWidth

interface WidthContext {
  navWidth: number;
  setNavWidth: React.Dispatch<React.SetStateAction<number>>;
}

interface ShowContext {
  showNav: boolean;
  setShowNav: React.Dispatch<React.SetStateAction<boolean>>;
}
