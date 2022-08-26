import React, { useState } from 'react'
import { Header } from './Header'

const navStyle: React.CSSProperties = {
  height: '100vh',
  width: '200px',
  borderRightColor: 'var(--color-border-muted)',
  borderRightStyle: 'solid',
  borderRightWidth: '1px'
}

const spanStyles: React.CSSProperties = {
  position: 'fixed',
  marginTop: '50vh',
  transform: 'rotate(270deg)',
  zIndex: '50',
  left: '-20px'
}

const App = () => {
  const [showNav, setShowNav] = useState(true)

  const handleClick = () => {
    setShowNav(state => !state)
  }

  if (!showNav) {
    return (
      <span
      className='btn'
        style={spanStyles}
        onClick={handleClick}
      >
        Git tree
      </span>
    )
  }

  return (
    <div 
      style={navStyle} 
      className='--color-page-header-bg'
    >
      <Header setShowNav={setShowNav} />
      <div>Hello</div>
    </div>
  )
}

export default App
