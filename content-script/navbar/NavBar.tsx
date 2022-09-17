import React, { useState } from 'react'
import { useFetchRepoDetails } from '../hook/useFetchRepoDetails'

import { ClosedNav } from './ClosedNav'
import { OpenNav } from './OpenNav'
import { ResizeBorder } from './ResizeBorder'

export const NavBar = () => {
  const [showNav, setShowNav] = useState(true)
  const { loading, error } = useFetchRepoDetails(window.location.href)

  return (
    <ResizeBorder showNav={showNav} setShowNav={setShowNav}>
      { 
        showNav 
        ? <OpenNav setShowNav={setShowNav} loading={loading} error={error}/> 
        : <ClosedNav setShowNav={setShowNav} />
      }
    </ResizeBorder>
  )
}
