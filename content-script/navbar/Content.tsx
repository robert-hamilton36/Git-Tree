import React from 'react'
import { useNavWidth } from '../contexts/NavShowWidthContext'
import { Header } from './Header'

export const Content: React.FC<Props> = ({content}) => {
  const { navWidth } = useNavWidth()
  return (
    <div
      style={{width: navWidth - 1}}
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
