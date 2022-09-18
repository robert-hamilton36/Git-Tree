import React, { useState } from 'react'
import { useFetchRepoDetails } from '../hook/useFetchRepoDetails'

import { ClosedNav } from './ClosedNav'
import { OpenNav } from './OpenNav'
import { ResizeBorder } from './ResizeBorder'
import { ViewController } from './ViewController'

export const NavBar = () => {
  const [showNav, setShowNav] = useState(true)
  const [view, setView] = useState<PageView>('tree')
  const { loading, error } = useFetchRepoDetails(window.location.href)

  return (
    <ResizeBorder showNav={showNav} setShowNav={setShowNav}>
      <ClosedNav setShowNav={setShowNav} setView={setView}/>
      { 
        showNav 
        && 
        <OpenNav 
          content={
            <ViewController loading={loading} error={error} view={view}/>
          }
        /> 
      }
    </ResizeBorder>
  )
}
