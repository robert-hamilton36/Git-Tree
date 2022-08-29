import path from 'path-browserify'

import React, { useState } from 'react'
import { Tree } from './Tree'

import { filterTree } from '../../util/filterTree'

import { FolderSVG } from '../../svgs/FolderSVG'
import { OpenFolderSVG } from '../../svgs/OpenFolderSVG'

import { data } from '../../../devdata'

interface Props {
  tree: TreeAPI
}

export const Folder: React.FC<Props> = ({tree}) => {
  const [open, setOpen] = useState(false)

  const handleClick = () => {
    setOpen(state => !state)
  }

  return (
    <>
      <li className='GitTree-treeItem GitTree-pointer' role='button' onClick={handleClick} >
        <div className='GitTree-marginRight'>
          {open ? <OpenFolderSVG /> : <FolderSVG />}
        </div>
        {path.basename(tree.path)}
      </li>
      {open && <Tree treeData={filterTree(data, tree.path)}/>}
    </>
  )
}
