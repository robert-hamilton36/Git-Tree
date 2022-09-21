export const TEST_USER = 'username123'
export const TEST_REPO = 'GitTree'
export const TEST_PRIVATE_REPO = 'GitTreeRevamp'
export const TEST_BRANCH = 'main'

export const TEST_FetchTreeAPIUrl = `https://api.github.com/repos/${TEST_USER}/${TEST_REPO}/git/trees/${TEST_BRANCH}?recursive=1`
export const TEST_FetchPrivateTreeAPIUrl = `https://api.github.com/repos/${TEST_USER}/${TEST_PRIVATE_REPO}/git/trees/${TEST_BRANCH}?recursive=1`
export const TEST_FetchTreeAPIUrlWithOutQueries = `https://api.github.com/repos/${TEST_USER}/${TEST_REPO}/git/trees/${TEST_BRANCH}`
export const TEST_FetchPrivateTreeAPIUrlWithOutQueries = `https://api.github.com/repos/${TEST_USER}/${TEST_PRIVATE_REPO}/git/trees/${TEST_BRANCH}`

export const TEST_FetchBranchAPIUrl = `https://api.github.com/repos/${TEST_USER}/${TEST_REPO}`
export const TEST_FetchPrivateBranchAPIUrl = `https://api.github.com/repos/${TEST_USER}/${TEST_PRIVATE_REPO}`