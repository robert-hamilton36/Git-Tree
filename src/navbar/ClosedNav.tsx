import React from 'react'
import { ExplorerSVG } from '../svgs/ExplorerSVG'

/*
  css classes --color-page-header-bg && btn-link color-fg-muted supplied by github
*/

export const ClosedNav: React.FC<Props> = ({setShowNav}) => {

  const handleClick = () => {
    setShowNav(state => !state)
  }
  return (
    <div
      className='--color-page-header-bg GitTree-closedNavigator'
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