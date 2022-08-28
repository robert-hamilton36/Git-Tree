import React, { useState } from 'react'
import { Tree } from './Tree/Tree';

import { filterTree } from '../util/filterTree';

import { data } from '../../devdata';

export const Content = () => {
  const [ tree ] = useState<TreeAPI[]>(data)

  if(tree.length === 0) {
    return (
      <main className='GitTree-treeContainer'>
        <h1>Loading ...</h1>
      </main>
    )
  }

  return (
    <main className='GitTree-treeContainer'>
      <Tree treeData={filterTree(data)} />
    </main>
  )
}
