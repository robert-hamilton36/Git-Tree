import React from 'react'
import { ExplorerSVG } from '../svgs/ExplorerSVG'

const styles: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  backgroundColor: 'var(--color-header-bg)',
  height: '62px',
  paddingLeft: '13px'
}

const headerStyles: React.CSSProperties = {
  paddingLeft: '16px',
  fontSize: '14px',
}

interface Props {
  setShowNav: React.Dispatch<React.SetStateAction<boolean>>
}

export const Header: React.FC<Props> = ({ setShowNav }) => {

  const handleClick = () => {
    setShowNav((state) => !state)
  }

  return (
    <header style={styles}>
      <button
        className="btn-link color-fg-muted"
        onClick={handleClick}
      >
        <ExplorerSVG />
      </button>
      <h1 className='Header-link' style={headerStyles}>
        Git tree
      </h1>
    </header>
  )
}
