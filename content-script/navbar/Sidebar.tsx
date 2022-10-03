import React from 'react'
import { ExplorerSVG } from '../svgs/ExplorerSVG'
import { UserSVG } from '../svgs/UserSVG'

/*
  css classes --color-page-header-bg && btn-link color-fg-muted supplied by github
*/

export const Sidebar: React.FC<Props> = ({handleClick}) => {
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
  handleClick: (newView: PageView) => void;
}