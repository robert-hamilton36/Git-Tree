import path from 'path-browserify'


/*
 * function that filters tree data from githubapi
 * from url in form: https://api.github.com/repos/{user}/{repo}/git/trees/{tree_sha}
 * 
 * If no parentDirectory passed returns all files that is from parent directory
 * 
 * If parentDirectory passed will filter all files so it returns all files (and folders) inside that parentDirectory
*/

export const filterTree = (tree: TreeAPI[], parentDirectory = '.') => {
  return tree.filter(item => {
    return (path.dirname(item.path) === parentDirectory)
  })
}