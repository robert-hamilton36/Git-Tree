import { useEffect, useState } from 'react'
import { useGitRepo } from '../contexts/GitRepoContexts'
import { useTree } from '../contexts/TreeContext'
import { useUserData } from '../contexts/UserContext'
import { parseUrl } from '../util/parseUrl'
import {  sendFetchBranchMessage, sendFetchTreeMessage } from '../util/sendMessage'

export const useFetchRepoDetails = (url: string): ReturnType => {
  const { setUserName, setRepo, setBranch } = useGitRepo()
  const { setTree } = useTree()
  const { user } = useUserData()

  const [loading, setLoading ] = useState(false)
  const [error, setError] = useState(null)
 useEffect(() => {
    const getRepoData = async () => {
      setLoading(true)
      setError(null)
      
      const parsedUrl = parseUrl(url)
      const { userName, repo } = parsedUrl
      let { branch } = parsedUrl

      setUserName(userName)
      setRepo(repo)
        // github doesn't include the default branch in the url
        // so we have to manually make an api call to find the default branch in that instance
      try {
        if (!branch) {
          branch = await sendFetchBranchMessage(userName, repo)
        }
        setBranch(branch)

        const treeData = await sendFetchTreeMessage(userName, repo, branch)
        setTree(treeData)
      } catch (e) {
        setError(e)
      } finally {
        setLoading(false)
      }
    }
    getRepoData()
  }, [url, setUserName, setRepo, setBranch, setTree, user])
  return { loading, error }
}

interface ReturnType {
  loading: boolean;
  error: string;
}
