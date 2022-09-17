import React from 'react'
import { useNavWidth } from '../contexts/NavWidthContext'
import { Header } from './Header'

export const OpenNav: React.FC<Props> = ({setShowNav, content}) => {
  const { navWidth } = useNavWidth()
  return (
    <div
      style={{width: navWidth - 1}}
      className='--color-page-header-bg GitTree-openNavigator'
    >
      <Header setShowNav={setShowNav} />
      {content}
    </div>
  )
}

interface Props {
  setShowNav: React.Dispatch<React.SetStateAction<boolean>>;
  content: React.ReactNode;
}
