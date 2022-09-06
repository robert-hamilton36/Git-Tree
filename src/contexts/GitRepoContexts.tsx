import React, { useContext, useState } from 'react'

const GitRepoContext = React.createContext<Context>(null)

export function useGitRepo (): Context {
  return useContext(GitRepoContext)
}

export const GitRepoProvider: React.FC<Children> = ({ children }) => {
  const [user, setUser] = useState('')
  const [repo, setRepo] = useState('')
  const [branch, setBranch] = useState('')

  const value = {
    user,
    setUser,
    repo,
    setRepo,
    branch,
    setBranch
  }

  return (
    <GitRepoContext.Provider value={value}>
      {children}
    </GitRepoContext.Provider>
  )
}

interface Children {
  children: React.ReactNode
}

interface Context {
  user: string;
  setUser: React.Dispatch<React.SetStateAction<string>>;
  repo: string;
  setRepo: React.Dispatch<React.SetStateAction<string>>;
  branch: string;
  setBranch: React.Dispatch<React.SetStateAction<string>>;
}
