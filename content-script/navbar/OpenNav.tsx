import React from 'react'
import { useNavWidth } from '../contexts/NavWidthContext'
import { ViewController } from './ViewController'
import { Header } from './Header'

export const OpenNav: React.FC<Props> = ({setShowNav, error, loading}) => {
  const { navWidth } = useNavWidth()
  return (
    <div
      style={{width: navWidth - 1}}
      className='--color-page-header-bg GitTree-openNavigator'
    >
      <Header setShowNav={setShowNav} />
      <ViewController loading={loading} error={error}/>
    </div>
  )
}

interface Props {
  setShowNav: React.Dispatch<React.SetStateAction<boolean>>;
  loading: boolean;
  error: string;
}
