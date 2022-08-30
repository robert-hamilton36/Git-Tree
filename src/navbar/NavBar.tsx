import React, { useState } from 'react'
import { Content } from './Content'
import { Header } from './Header'

import { ExplorerSVG } from '../svgs/ExplorerSVG'

/*
  css classes --color-page-header-bg && btn-link color-fg-muted supplied by github
*/

export const NavBar = () => {
  const [showNav, setShowNav] = useState(true)

  const handleClick = () => {
    setShowNav(state => !state)
  }

  if (!showNav) {
    return (
     <div
        className='--color-page-header-bg GitTree-closedNavigator GitTree-border'
      >
        <button
          className="btn-link color-fg-muted"
          onClick={handleClick}
        >
          <ExplorerSVG />
        </button>
     </div>
    )
  }

  return (
    <div 
      className='--color-page-header-bg GitTree-openNavigator GitTree-border'
    >
      <Header setShowNav={setShowNav} />
      <Content />
    </div>
  )
}
