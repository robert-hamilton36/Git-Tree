
// calls githubapi
// `https://api.github.com/repos/${user}/${repo}/git/trees/${branch}?recursive=1`
// returns tree data

export const fetchTree = async (url: string) => {
  const response = await fetch(url)
  if (response.status !== 200) throw 'Not Found'
  const jason = await response.json()
  return jason.tree as TreeAPI[]
}

// calls githubapi
// `https://api.github.com/repos/${user}/${repo}`
// returns default_branch

export const fetchBranch = async (url: string) => {
  const response = await fetch(url)
  if (response.status !== 200) throw 'Not Found'
  const jason = await response.json()
  return jason.default_branch as string
}
