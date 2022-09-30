import React, { useState } from 'react'
import { useUserData } from '../../contexts/UserContext'
import { sendLoginMessage, sendLogoutMessage } from '../../util/sendMessage'

export const Login = () => {
  const { user, setUser } = useUserData()
  const [ loading, setLoading ] = useState(false)
  const [ error, setError ] = useState(null)
  
  const handleClick = async () => {
    setLoading(true)
    try {
      const data = await sendLoginMessage()
      setUser(data)
    } catch(e) {
      setError(e)
    } finally {
      setLoading(false)
    }
  }

  const handleLogout = () => {
    setUser(null)
    sendLogoutMessage()
  }

  if (loading) {
    return <h1> loading ...</h1>
  }

  if (error) {
    return <h1> {error} </h1>
  }

  if (user) {
    // className avatar-user from github
    return (
      <>
        <img className='avatar-user' src={user.avatar_url} width='24' height='24'/>
        <p className='gitTree-TextHeading'>{user.login}</p>

        <button className='gitTree-Buttons' onClick={handleLogout}>Log out</button>
      </>
    )
  }

  return (
    <>
      <button className='gitTree-Buttons' onClick={handleClick}>Login with github</button>
    </>
  )
}
