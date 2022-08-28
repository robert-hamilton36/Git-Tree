import React, { useState } from 'react'
import { Content } from './Content'
import { Header } from './Header'

import { ExplorerSVG } from '../svgs/ExplorerSVG'

const navStyle: React.CSSProperties = {
  height: '100vh',
  width: '200px',
  borderRightColor: 'var(--color-border-muted)',
  borderRightStyle: 'solid',
  borderRightWidth: '1px'
}

const spanStyles: React.CSSProperties = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'flex-start',
  paddingTop: '16px',
  height: '100vh',
  width: '50px',
  backgroundColor: 'var(--color-header-bg)',
  borderRightColor: 'var(--color-border-muted)',
  borderRightStyle: 'solid',
  borderRightWidth: '1px'
}

const App = () => {
  const [showNav, setShowNav] = useState(true)

  const handleClick = () => {
    setShowNav(state => !state)
  }

  if (!showNav) {
    return (
     <div
        style={spanStyles} 
        className='--color-page-header-bg'
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
      style={navStyle} 
      className='--color-page-header-bg'
    >
      <Header setShowNav={setShowNav} />
      <Content />
    </div>
  )
}

export default App
