import React from 'react'
import { Tree } from './Tree/Tree';

import { useTree } from '../contexts/TreeContext';
import { fetchTree } from '../hook/fetchTree';
import { filterTree } from '../util/filterTree';

export const Content = () => {
  const { tree } = useTree()

  fetchTree()

  if(tree.length === 0) {
    return (
      <main className='GitTree-treeContainer'>
        <h1>Loading ...</h1>
      </main>
    )
  }

  return (
    <main className='GitTree-treeContainer'>
      <Tree treeData={filterTree(tree)} />
    </main>
  )
}
