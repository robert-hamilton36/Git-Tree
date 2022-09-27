import React from 'react'
import { Tree } from './Tree/Tree';

import { filterTree } from '../util/filterTree';
import { useTree } from '../contexts/TreeContext';
import { Login } from './User/Login';

export const ViewController: React.FC<Props> = ({loading, error, view}) => {
  const { tree } = useTree()

  
  if (view === 'tree') {
    if (loading) {
      return (
        <h1>Loading ...</h1>
      )
    }
  
    if (error) {
      return (
        <>
          <h1>Error</h1>
          <p>{error}</p>
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
  view: PageView
}