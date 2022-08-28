import path from 'path-browserify'

import React from 'react'

import { FileSVG } from '../../svgs/FileSVG'

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

export const File: React.FC<Props> = ({tree}) => {

  const user = 'robert-hamilton36'
  const repo = 'ElectronOAuth'
  const branch = 'main'

  console.log(tree)

  const urlString = `https://github.com/${user}/${repo}/blob/${branch}/${tree.path}` 
  
  return (
    <li style={liStyles}>
    <div style={iconStyles}>
      <FileSVG />
    </div>
    {/* css class supplied by github 
      data-pjax and data-turbo-frame attributes used by github under the hood to collect data and display it when the url 'changes'
      adding those attributes to our links, 'hacks' into githubs under the hood data fetching to change the page
    */}
    <a className='Link--primary' data-pjax="#repo-content-pjax-container" data-turbo-frame="repo-content-turbo-frame" href={urlString}>
      {path.basename(tree.path)}
    </a>
  </li>
  )
}
