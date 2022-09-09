import React, { useState } from 'react'

import { ClosedNav } from './ClosedNav'
import { OpenNav } from './OpenNav'
import { ResizeBorder } from './ResizeBorder'

export const NavBar = () => {
  const [showNav, setShowNav] = useState(true)

  return (
    <>
      { 
        showNav 
        ? <OpenNav setShowNav={setShowNav} /> 
        : <ClosedNav setShowNav={setShowNav} />
      }
      <ResizeBorder showNav={showNav} setShowNav={setShowNav} />
    </>
  )
}
