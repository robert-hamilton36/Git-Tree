import { useEffect } from 'react'
import { useTree } from '../contexts/TreeContext'

// useEffect hook, gets url and sends message to background script which returns the repo tree

export const fetchTree = () => {
  const { setTree } = useTree()
  return (
    useEffect(() => {
      const url = document.location.href

      // this mess of a regex searches for '://' or '/'
      const reg = /:\/\/|\//
  
      // splits url i.e https://github.com/robert-hamilton36/GitTree/tree/main
      // into ['https', 'github.com', 'robert-hamilton36', 'GitTree', 'tree', 'main']
      //      [ scheme, domain      , user               , repo     , action, branch]
      const urlArray = url.split(reg)
      
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const [ _scheme, _domain, user = '', repo = '', _action, branch = 'main' ] = urlArray
  
      if (user && repo &&  branch) {
        const apiUrl = `https://api.github.com/repos/${user}/${repo}/git/trees/${branch}?recursive=1`
        const message: IMessage = {
          type: 'fetch',
          url: apiUrl
        }
        try {
          const sending = browser.runtime.sendMessage(message)
          sending
          .then(data => {
            return setTree(data)
          })
          
        } catch (e) {
          console.error
        }
      }
    }, [])
  )
}
