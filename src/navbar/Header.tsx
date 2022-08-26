import React from 'react'
import { CrossSVG } from '../svgs/CrossSVG'

const styles: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  backgroundColor: 'var(--color-header-bg)',
  height: '62px',
  paddingLeft: '32px'
}

const headerStyles: React.CSSProperties = {
  fontSize: '14px',
}

const buttonStyles: React.CSSProperties = {
  flexGrow: '1'
}

interface Props {
  setShowNav: React.Dispatch<React.SetStateAction<boolean>>
}

export const Header: React.FC<Props> = ({ setShowNav }) => {

  const handleClick = () => {
    setShowNav((state) => !state)
  }

  return (
    <header className='flex-justify-between' style={styles}>
      <h1 className='Header-link' style={headerStyles}>
        Git tree
      </h1>
      <button
        className="btn-link color-fg-muted"
        onClick={handleClick}
        style={buttonStyles}
      >
        <CrossSVG />
      </button>
    </header>
  )
}
