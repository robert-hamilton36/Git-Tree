import path from 'path-browserify'

import React, { useState } from 'react'
import { Tree } from './Tree'

import { filterTree } from '../../util/filterTree'

import { FolderSVG } from '../../svgs/FolderSVG'
import { OpenFolderSVG } from '../../svgs/OpenFolderSVG'

import { data } from '../../../devdata'

const liStyles: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  height: '38px',
  borderBottomColor: 'var(--color-border-muted)',
  borderBottomStyle: 'solid',
  borderBottomWidth: '1px',
  paddingLeft: '16px',
  overflow: 'scroll'
}

const iconStyles: React.CSSProperties = {
  marginRight: '16px'
}

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
      <li role='button' onClick={handleClick} style={liStyles}>
        <div style={iconStyles}>
          {open ? <OpenFolderSVG /> : <FolderSVG />}
        </div>
        {path.basename(tree.path)}
      </li>
      {open && <Tree treeData={filterTree(data, tree.path)}/>}
    </>
  )
}
