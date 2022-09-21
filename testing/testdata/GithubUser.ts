export const TEST_AuthState = 'aaaatest-uuid-v4v4-3333-bbbbbbbbbbbb'
export const TEST_AuthCode = 'iamtotallyarealcode'
export const TEST_OAuthToken = 'iamtotallyarealoauthtokenacceptmeplease'

export const TEST_RedirectUrl = 'https://784e5c39-d41e-441e-bebe-3754ba02d5c4.extensions.allizom.org'
export const TEST_AuthFlowReturnUrl = `https://784e5c39-d41e-441e-bebe-3754ba02d5c4.extensions.allizom.org/?code=${TEST_AuthCode}&state=${TEST_AuthState}`

export const TEST_CleanedUserData = { 
  login: 'username123', 
  avatar_url: "https://avatars.githubusercontent.com/u/11111111?v=1"
}

export const TEST_APIUserData = {
  "login": "username123",
  "id": 12345678,
  "node_id": "ABCDEFGHIJKLMNOPQRST",
  "avatar_url": "https://avatars.githubusercontent.com/u/11111111?v=1",
  "gravatar_id": "",
  "url": "https://api.github.com/users/username123",
  "html_url": "https://github.com/username123",
  "followers_url": "https://api.github.com/users/username123/followers",
  "following_url": "https://api.github.com/users/username123/following{/other_user}",
  "gists_url": "https://api.github.com/users/username123/gists{/gist_id}",
  "starred_url": "https://api.github.com/users/username123/starred{/owner}{/repo}",
  "subscriptions_url": "https://api.github.com/users/username123/subscriptions",
  "organizations_url": "https://api.github.com/users/username123/orgs",
  "repos_url": "https://api.github.com/users/username123/repos",
  "events_url": "https://api.github.com/users/username123/events{/privacy}",
  "received_events_url": "https://api.github.com/users/username123/received_events",
  "type": "User",
  "site_admin": false,
  "blog": "",
  "bio": "username123 totally exists",
  "public_repos": 24,
  "public_gists": 0,
  "followers": 0,
  "following": 0,
  "created_at": "1970-01-01T00:00:00Z",
  "updated_at": "2022-01-01T00:00:00Z"
}