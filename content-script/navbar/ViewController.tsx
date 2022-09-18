import React from 'react'
import { Tree } from './Tree/Tree';

import { filterTree } from '../util/filterTree';
import { useTree } from '../contexts/TreeContext';

export const ViewController: React.FC<Props> = ({loading, error, view}) => {
  const { tree } = useTree()

  if (loading) {
    return (
      <main className='GitTree-treeContainer'>
        <h1>Loading ...</h1>
      </main>
    )
  }

  if (error) {
    return (
      <main className='GitTree-treeContainer'>
        <h1>Error</h1>
        <p>{error}</p>
      </main>
    )
  }

  if (view === 'tree') {
    return (
      <main className='GitTree-treeContainer'>
        <Tree treeData={filterTree(tree)} />
      </main>
    )
  }

  return null
}

interface Props {
  loading: boolean;
  error: string;
  view: PageView
}