import React, { useState } from 'react'
import { Tree } from './Tree/Tree';

import { filterTree } from '../util/filterTree';

import { data } from '../../devdata';

const styles: React.CSSProperties = {
  height: '100%',
  margin: '8px',
  borderWidth: '1px',
  borderColor: 'var(--color-border-muted)',
  borderStyle: 'solid',
  borderRadius: '5px',
}

export const Content = () => {
  const [ tree ] = useState<TreeAPI[]>(data)

  if(tree.length === 0) {
    return (
      <div style={styles}>
        <h1>Loading ...</h1>
      </div>
    )
  }

  return (
    <div style={styles}>
      <Tree treeData={filterTree(data)} />
    </div>
  )
}
