import React, { useState } from 'react'
import { useFetchRepoDetails } from '../hook/useFetchRepoDetails'

import { Sidebar } from './Sidebar'
import { Content } from './Content'
import { ResizeBorder } from './ResizeBorder'
import { ViewController } from './ViewController'

export const NavBar = () => {
  const [showNav, setShowNav] = useState(true)
  const [view, setView] = useState<PageView>('tree')
  const { loading, error } = useFetchRepoDetails(window.location.href)

  return (
    <ResizeBorder showNav={showNav} setShowNav={setShowNav}>
      <Sidebar setShowNav={setShowNav} setView={setView}/>
      { 
        showNav 
        && 
        <Content 
          content={
            <ViewController loading={loading} error={error} view={view}/>
          }
        /> 
      }
    </ResizeBorder>
  )
}
