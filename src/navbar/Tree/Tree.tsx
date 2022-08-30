import React from 'react'
import { File } from './File'
import { Folder } from './Folder'

export const Tree: React.FC<Props> = ({treeData}) => {
  return (
    <ul className='GitTree-margin'>
      {treeData.map((item) => {
        if (item.type === 'blob') {
          return (
            <File key={item.sha} item={item}/>
          )
        }
        if (item.type === 'tree') {
          return (
            <Folder key={item.sha} item={item}/>
          )
        }
      })}
    </ul>
  )
}

interface Props {
  treeData: TreeAPI[]
}