import React, { useState } from 'react'

import { ClosedNav } from './ClosedNav'
import { OpenNav } from './OpenNav'
import { ResizeBorder } from './ResizeBorder'

/*
  css classes --color-page-header-bg && btn-link color-fg-muted supplied by github
*/

export const NavBar = () => {
  const [showNav, setShowNav] = useState(true)



  if (!showNav) {
    return (
      <ClosedNav setShowNav={setShowNav}/>
    )
  }

  return (
    <>
      <OpenNav setShowNav={setShowNav} />
      <ResizeBorder />
    </>
  )
}
