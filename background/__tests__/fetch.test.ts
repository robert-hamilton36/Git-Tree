import { fetchBranch, fetchTree } from "../api"

import { TEST_FetchBranchAPIUrl, TEST_FetchTreeAPIUrl } from "../../testing/testdata/urls"
import { TEST_blobOnlyArrayUnsorted } from "../../testing/testdata/GithubTree"

describe('fetchTree', () => {
  test('returns default Tree', async () => {
    const Tree = await fetchTree(TEST_FetchTreeAPIUrl)
    expect(Tree).toEqual(TEST_blobOnlyArrayUnsorted)
  })

  test('returns error', async () => {
    try {
      await fetchTree('https://api.github.com/fail/fail')
    } catch(e) {
      expect(e).toBe('Not Found')
    }
  })
})

describe('fetchBranch', () => {
  test('returns default branch', async () => {
    const branch = await fetchBranch(TEST_FetchBranchAPIUrl)
    expect(branch).toBe('main')
  })

  test('returns error', async () => {
    try {
      await fetchBranch('https://api.github.com/fail/fail')
    } catch(e) {
      expect(e).toBe('Not Found')
    }
  })
})
