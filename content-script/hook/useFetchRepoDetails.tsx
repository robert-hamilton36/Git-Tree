import { useEffect, useState } from 'react'
import { useGitRepo } from '../contexts/GitRepoContexts'
import { useTree } from '../contexts/TreeContext'
import { parseUrl } from '../util/parseUrl'
import {  sendFetchBranchMessage, sendFetchTreeMessage } from '../util/sendMessage'

export const useFetchRepoDetails = (url: string): ReturnType => {
  const { setUserName, setRepo, setBranch } = useGitRepo()
  const { setTree } = useTree()

  const [loading, setLoading ] = useState(false)
  const [error, setError] = useState(null)

 useEffect(() => {
    const getRepoData = async () => {
      setLoading(true)
      
      const parsedUrl = parseUrl(url)
      const { userName, repo } = parsedUrl
      let { branch } = parsedUrl

      setUserName(userName)
      setRepo(repo)

      let treeData: TreeAPI[] = null
      try {
        if (!branch) {
          branch = await sendFetchBranchMessage(userName, repo)
        }
        setBranch(branch)

        treeData = await sendFetchTreeMessage(userName, repo, branch)
        setTree(treeData)
      } catch (e) {
        setError(e)
      } finally {
        setLoading(false)
      }
    }
    getRepoData()
  }, [url, setUserName, setRepo, setBranch, setTree])
  return { loading, error }
}

interface ReturnType {
  loading: boolean;
  error: string;
}
