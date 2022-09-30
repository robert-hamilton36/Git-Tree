import React, { useContext, useState } from 'react'

const UserContext = React.createContext<Context>(null)

export function useUserData (): Context {
  return useContext(UserContext)
}

export const UserProvider: React.FC<ReactChildren> = ({ children }) => {
  const [user, setUser] = useState<UserData>(null)

  const value = {
    user,
    setUser
  }

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  )
}

interface Context {
  user: UserData,
  setUser: React.Dispatch<React.SetStateAction<UserData>>
}