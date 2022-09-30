import { parseUrl } from "../parseUrl"

describe('parseUrl()', () => {
  test('no url returns empty strings', () => {
    const {userName, repo, branch} = parseUrl('')

    expect(userName).toBe('')
    expect(repo).toBe('')
    expect(branch).toBe('')
  })

  test('url with user returns a user and empty repo and branch', () => {
    const {userName, repo, branch} = parseUrl('https://github.com/username123')

    expect(userName).toBe('username123')
    expect(repo).toBe('')
    expect(branch).toBe('')
  })

  test('url with user and repo returns a user and repo and empty branch', () => {
    const {userName, repo, branch} = parseUrl('https://github.com/username123/GitTree')

    expect(userName).toBe('username123')
    expect(repo).toBe('GitTree')
    expect(branch).toBe('')
  })

  test('url with user and repo and branch returns a user, repo and branch', () => {
    const {userName, repo, branch} = parseUrl('https://github.com/username123/GitTree/tree/main')

    expect(userName).toBe('username123')
    expect(repo).toBe('GitTree')
    expect(branch).toBe('main')
  })
})