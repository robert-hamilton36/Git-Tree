import path from 'path-browserify'


/*
 * function that filters tree data from githubapi
 * from url in form: https://api.github.com/repos/{user}/{repo}/git/trees/{tree_sha}
 * 
 * If no parentDirectory passed returns all files that is from parent directory
 * 
 * If parentDirectory passed will filter all files so it returns all files (and folders) inside that parentDirectory
*/


// -1 sorts a before b
//  1 sorts b before a

// sorts by trees (folders) first then files all in alphabetical order

const sorter = (a: TreeAPI, b: TreeAPI) => {
  // if the two values are the same type
  // sort alphabetically
  if (a.type === b.type) {
    if (a.path < b.path) {
      return -1
    }
    if (a.path > b.path) {
      return 1
    }
    return 0
  }

  // if one of the two files is a tree(folder) sort by tree first
  if (a.type === 'tree') return -1
  if (b.type === 'tree') return 1
}

export const filterTree = (tree: TreeAPI[], parentDirectory = '.') => {
  const filtered = tree.filter(item => {
    return (path.dirname(item.path) === parentDirectory)
  })

  const sorted = filtered.sort(sorter)

  return sorted
}