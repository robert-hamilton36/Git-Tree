import { CLIENT_ID, CLIENT_SECRET, SCOPE } from "../env"
import { parseCodeAndStateFromURL } from "./util/parseUrl"
import { v4 as uuidv4 } from 'uuid'

let authToken: string


// calls githubapi
// `https://api.github.com/repos/${user}/${repo}/git/trees/${branch}?recursive=1`
// returns tree data

export const fetchTree = async (url: string) => {
  const response = await fetch(url, { headers: { "Authorization" : `Bearer ${authToken}`} } )
  if (response.status !== 200) throw 'Not Found'
  const jason = await response.json()
  if (!jason.tree) throw 'No data recieved'
  return jason.tree as TreeAPI[]
}

// calls githubapi
// `https://api.github.com/repos/${user}/${repo}`
// returns default_branch

export const fetchBranch = async (url: string) => {
  const response = await fetch(url, { headers: { "Authorization" : `Bearer ${authToken}`} } )
  if (response.status !== 200) throw 'Not Found'
  const jason = await response.json()
  if (!jason.default_branch) throw 'No data recieved'
  return jason.default_branch as string
}

// calls githubapi
// `https://api.github.com/user`
// relies on an auth token to get correct user
// returns login name and avatar_id

export const fetchUser = async () => {
  const response = await fetch('https://api.github.com/user', { headers: { "Authorization" : `Bearer ${authToken}`} } )
  if (response.status !== 200) throw 'Need authentication'
  const jason = await response.json()

  const { login, avatar_url } = jason
  const data = { login, avatar_url }
  return data as UserData
}

// calls github oauth authorize
// uses identity api:
//    to get the redirect url for this extension
//    and to start a webAuthFlow
// requires github oauthapp client id
// and needs a random string, state which is sent to github and returned with the code
// this state string is protection against cross site request forgery attacks
// parses the return url for its state and code
// compares the recieved state and the original state
// returns code

export const requestCode = async () => {
  const state = uuidv4()

  const redirectURL = browser.identity.getRedirectURL()

  const returnURL = await browser.identity.launchWebAuthFlow({
    interactive: true,
    url:`https://github.com/login/oauth/authorize/?client_id=${CLIENT_ID}&redirect_uri=${redirectURL}&scope=${SCOPE}&state=${state}`,
  })

  const { code, returnedState } = parseCodeAndStateFromURL(returnURL)

  if (returnedState !== state) throw new Error('state mismatch')

  return code
}

// calls github oauth access_token
// requires github oauthapp client_id and client_secret
// makes a post request with the code recieved from the previous function
// and returns the recieved access_token

export const requestOAuthToken = async (code: string) => {
  const url =  `https://github.com/login/oauth/access_token/?client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}&code=${code}`

  const tokenResponse = await fetch(url, {
    method: 'POST',
    headers: { 'Accept': 'application/json' }
  })

  const jason = await tokenResponse.json()

  if (jason.error) throw new Error(jason.error)

  authToken = jason?.access_token
  return 
}

// functions for testing only
// to check and set the auth token
export const TESTING_SetAuthToken = (token: string) => {
  authToken = token
}

export const TESTING_GetAuthToken = () => {
  return authToken
}