import React from 'react'
import { ExplorerSVG } from '../svgs/ExplorerSVG'
import { UserSVG } from '../svgs/UserSVG'

/*
  css classes --color-page-header-bg && btn-link color-fg-muted supplied by github
*/

export const ClosedNav: React.FC<Props> = ({setShowNav, setView}) => {

  const handleClick = (view: PageView) => {
    setShowNav(state => !state)
    setView(view)
  }
  return (
    <div
      className='--color-page-header-bg GitTree-closedNavigator'
    >
      <ul>
        <li
          className="btn-link color-fg-muted gitTree-actionItem"
          onClick={() => handleClick('tree')}
        >
          <ExplorerSVG />
        </li>
      </ul>
      <ul>
        <li
          className="btn-link color-fg-muted gitTree-actionItem"
          onClick={() => handleClick('user')}
        >
          <UserSVG />
        </li>
      </ul>
    </div>
  )
}

interface Props {
  setShowNav: React.Dispatch<React.SetStateAction<boolean>>;
  setView: React.Dispatch<React.SetStateAction<PageView>>;
}