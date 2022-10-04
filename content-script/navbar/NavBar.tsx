import React, { useEffect, useState } from 'react'
import { useFetchRepoDetails } from '../hook/useFetchRepoDetails'

import { Sidebar } from './Sidebar'
import { Content } from './Content'
import { ResizeBorder } from './ResizeBorder'
import { ViewController } from './ViewController'
import { sendCheckUserMessage } from '../util/sendMessage'
import { useUserData } from '../contexts/UserContext'
import { useNavWidth } from '../contexts/NavWidthContext'
import { editDocumentBodyMargin } from '../util/createElements'

export const NavBar = () => {
  const [showContent, setShowContent] = useState(true)
  const [view, setView] = useState<PageView>('tree')
  const {navWidth} = useNavWidth()
  const { setUser } = useUserData()
  const { loading, error } = useFetchRepoDetails(window.location.href)

  useEffect(() => {
    const getUser = async () => {
      const user = await sendCheckUserMessage()
      setUser(user)
    }

    getUser()
  }, [setUser])

  const handleSetShowContent = (boolean: boolean) => {
    setShowContent(boolean)
    editDocumentBodyMargin(boolean ? navWidth : 0)
  }

  const handleClick = (newView: PageView) => {
    setView(newView)
    // if content is shown and button clicked on is the same as shown close content
    if (showContent && view === newView) {
      // hide content and set global page lfet margin to 0
      setShowContent(false)
      editDocumentBodyMargin(0)
    } else {
      // show content and set global page left margin to the sidebar width
      setShowContent(true)
      editDocumentBodyMargin(navWidth)
    }
  }

  return (
    <ResizeBorder showNav={showContent} setShowNav={handleSetShowContent}>
      <Sidebar handleClick={handleClick}/>
      { 
        showContent 
        && 
        <Content 
          content={
            <ViewController loading={loading} error={error} view={view} setView={setView}/>
          }
        /> 
      }
    </ResizeBorder>
  )
}
