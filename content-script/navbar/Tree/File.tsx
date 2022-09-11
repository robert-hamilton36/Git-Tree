import path from 'path-browserify'

import React from 'react'
import { useGitRepo } from '../../contexts/GitRepoContexts'

import { FileSVG } from '../../svgs/FileSVG'

interface Props {
  item: TreeAPI
}

export const File: React.FC<Props> = ({item}) => {
  const { user, repo, branch } = useGitRepo()

  const urlString = `https://github.com/${user}/${repo}/blob/${branch}/${item.path}` 
  
  return (
    <li className='GitTree-treeItem'>
    <div className='GitTree-marginRight'>
      <FileSVG />
    </div>
    {/* css class supplied by github 
      data-pjax and data-turbo-frame attributes used by github under the hood to collect data and display it when the url 'changes'
      adding those attributes to our links, 'hacks' into githubs under the hood data fetching to change the page
    */}
    <a className='Link--primary GitTree-ellipsis' data-pjax="#repo-content-pjax-container" data-turbo-frame="repo-content-turbo-frame" href={urlString}>
      {path.basename(item.path)}
    </a>
  </li>
  )
}
