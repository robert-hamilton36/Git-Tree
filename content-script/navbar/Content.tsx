import React from 'react'
import { Tree } from './Tree/Tree';

import { filterTree } from '../util/filterTree';
import { useFetchRepoDetails } from '../hook/useFetchRepoDetails';
import { useTree } from '../contexts/TreeContext';

export const Content = () => {
  const { tree } = useTree()
  const { loading, error } = useFetchRepoDetails(window.location.href)

  if(loading) {
    return (
      <main className='GitTree-treeContainer'>
        <h1>Loading ...</h1>
      </main>
    )
  }

  if(error) {
    return (
      <main className='GitTree-treeContainer'>
        <h1>Error</h1>
        <p>{error}</p>
      </main>
    )
  }

  return (
    <main className='GitTree-treeContainer'>
      <Tree treeData={filterTree(tree)} />
    </main>
  )
}
