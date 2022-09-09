import path from 'path-browserify'

import React, { useState } from 'react'
import { Tree } from './Tree'

import { useTree } from '../../contexts/TreeContext'

import { filterTree } from '../../util/filterTree'

import { FolderSVG } from '../../svgs/FolderSVG'
import { OpenFolderSVG } from '../../svgs/OpenFolderSVG'


interface Props {
  item: TreeAPI
}

export const Folder: React.FC<Props> = ({item}) => {
  const [open, setOpen] = useState(false)
  const { tree } = useTree()

  const handleClick = () => {
    setOpen(state => !state)
  }

  return (
    <>
      <li className='GitTree-treeItem GitTree-pointer' role='button' onClick={handleClick} >
        <div className='GitTree-marginRight'>
          {open ? <OpenFolderSVG /> : <FolderSVG />}
        </div>
        {path.basename(item.path)}
      </li>
      {open && <Tree treeData={filterTree(tree, item.path)}/>}
    </>
  )
}
