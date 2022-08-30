import React from 'react'
import { ExplorerSVG } from '../svgs/ExplorerSVG'

export const ClosedNav: React.FC<Props> = ({setShowNav}) => {

  const handleClick = () => {
    setShowNav(state => !state)
  }
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

interface Props {
  setShowNav: React.Dispatch<React.SetStateAction<boolean>>;
}