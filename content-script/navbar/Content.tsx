import React from 'react'
import { useNavWidth } from '../contexts/NavShowWidthContext'
import { Header } from './Header'
import { sidebarWidth } from './Sidebar'

export const Content: React.FC<Props> = ({content}) => {
  const { navWidth } = useNavWidth()
  return (
    <div
      style={{ width: navWidth - sidebarWidth }}
      className='--color-page-header-bg GitTree-openNavigator'
    >
      <Header />
      <main className='GitTree-treeContainer'>
        {content}
      </main>
    </div>
  )
}

interface Props {
  content: React.ReactNode;
}
