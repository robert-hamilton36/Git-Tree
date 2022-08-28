import React from 'react'
import { File } from './File'
import { Folder } from './Folder'

export const Tree: React.FC<Props> = ({treeData}) => {
  return (
    <ul className='GitTree-margin'>
      {treeData.map((tree) => {
        if (tree.type === 'blob') {
          return (
            <File key={tree.sha} tree={tree}/>
          )
        }
        if (tree.type === 'tree') {
          return (
            <Folder key={tree.sha} tree={tree}/>
          )
        }
      })}
    </ul>
  )
}

interface Props {
  treeData: TreeAPI[]
}