import React from 'react'
import { Tree } from './Tree/Tree';

import { filterTree } from '../util/filterTree';
import { useTree } from '../contexts/TreeContext';
import { Login } from './User/Login';

export const ViewController: React.FC<Props> = ({loading, error, view, setView}) => {
  const { tree } = useTree()

  const handleLoginClick = () => {
    setView('user')
  }

  
  if (view === 'tree') {
    // if its loading but there is already tree data
    // keep showing tree data while it loads new data in background
    if (loading && !tree) {
      return (
        <h1>Loading ...</h1>
      )
    }
  
    if (error) {
      return (
        <>
          <h1>Error</h1>
          <p>{error}</p>
          {error === 'Not Found' && <p>If this is a private repo you must <span className='GitTree-spanButton'onClick={handleLoginClick}>login</span> to view</p>}

        </>
      )
    }

    return (
      <Tree treeData={filterTree(tree)} />
    )
  }

  if (view ==='user') {
    return (
      <Login />
    )
  }

  return null
}

interface Props {
  loading: boolean;
  error: string;
  view: PageView;
  setView: React.Dispatch<React.SetStateAction<PageView>>;
}