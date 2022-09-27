export const parseUrl = (url: string) => {
  // this mess of a regex searches for '://' or '/'
  const regex = /:\/\/|\//

  // splits url i.e https://github.com/username123/GitTree/tree/main
  // into ['https', 'github.com', 'username123', 'GitTree', 'tree', 'main']
  //      [ scheme, domain      , user               , repo     , action, branch]
  const urlArray = url.split(regex)

  const user = urlArray[2] || ''
  const repo = urlArray[3] || ''
  const branch = urlArray[5] || ''

  return { user, repo, branch }
}
