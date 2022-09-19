import React, { useState } from 'react'
import { useFetchRepoDetails } from '../hook/useFetchRepoDetails'

import { Sidebar } from './Sidebar'
import { Content } from './Content'
import { ResizeBorder } from './ResizeBorder'
import { ViewController } from './ViewController'

export const NavBar = () => {
  const [showContent, setShowContent] = useState(true)
  const [view, setView] = useState<PageView>('tree')
  const { loading, error } = useFetchRepoDetails(window.location.href)

  const handleClick = (newView: PageView) => {
    setView(newView)
    // if content is shown and button clicked on is the same as shown close content
    if (showContent && view === newView) {
      setShowContent(false)
    } else {
      setShowContent(true)
    }
  }

  return (
    <ResizeBorder showNav={showContent} setShowNav={setShowContent}>
      <Sidebar handleClick={handleClick}/>
      { 
        showContent 
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
