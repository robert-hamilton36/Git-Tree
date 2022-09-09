import React from 'react'

import { ExplorerSVG } from '../svgs/ExplorerSVG'

interface Props {
  setShowNav: React.Dispatch<React.SetStateAction<boolean>>
}

export const Header: React.FC<Props> = ({ setShowNav }) => {

  const handleClick = () => {
    setShowNav((state) => !state)
  }

  return (
    <header className='GitTree-header'>
      <button
        // css class supplied by github
        className="btn-link color-fg-muted"
        onClick={handleClick}
      >
        <ExplorerSVG />
      </button>
      {/* css class supplied by github */}
      <h1 className='Header-link Header'>
        Git Tree
      </h1>
    </header>
  )
}
