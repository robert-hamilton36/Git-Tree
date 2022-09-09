export const TEST_USER = 'robert-hamilton36'
export const TEST_REPO = 'GitTree'
export const TEST_BRANCH = 'main'

export const TEST_FetchTreeAPIUrl = `https://api.github.com/repos/${TEST_USER}/${TEST_REPO}/git/trees/${TEST_BRANCH}?recursive=1`
export const TEST_FetchTreeAPIUrlWithOutQueries = `https://api.github.com/repos/${TEST_USER}/${TEST_REPO}/git/trees/${TEST_BRANCH}`
export const TEST_FetchBranchAPIUrl = `https://api.github.com/repos/${TEST_USER}/${TEST_REPO}`