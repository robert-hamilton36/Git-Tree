import React, { useContext, useState } from 'react'

const TreeContext = React.createContext<Context>(null)

export function useTree (): Context {
  return useContext(TreeContext)
}

export const TreeProvider: React.FC<Children> = ({ children }) => {
  const [tree, setTree] = useState<TreeAPI[]>([])

  const value = {
    tree,
    setTree
  }

  return (
    <TreeContext.Provider value={value}>
      {children}
    </TreeContext.Provider>
  )
}

interface Children {
  children: React.ReactNode
}

interface Context {
  tree: TreeAPI[],
  setTree: React.Dispatch<React.SetStateAction<TreeAPI[]>>
}
