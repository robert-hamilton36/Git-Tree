import React from "react"
import { renderHook, act } from '@testing-library/react'
import { GitRepoProvider, useGitRepo } from "../GitRepoContexts"

describe('<GitRepoProvider>', () => {
  test('renders provider with initial state', () => {
    const wrapper = ({ children }: ReactChildren) => <GitRepoProvider> {children} </GitRepoProvider>
    const { result } = renderHook(() => useGitRepo(), { wrapper })

    expect(result.current.user).toBe('')
    expect(result.current.repo).toBe('')
    expect(result.current.branch).toBe('')
  })

  test('sets user, repo and branch', () => {
    const wrapper = ({ children }: ReactChildren) => <GitRepoProvider> {children} </GitRepoProvider>
    const { result } = renderHook(() => useGitRepo(), { wrapper })

    expect(result.current.user).toBe('')
    expect(result.current.repo).toBe('')
    expect(result.current.branch).toBe('')

    act(() => result.current.setUser('username123'))
    act(() => result.current.setRepo('GitTree'))
    act(() => result.current.setBranch('main'))

    expect(result.current.user).toBe('username123')
    expect(result.current.repo).toBe('GitTree')
    expect(result.current.branch).toBe('main')
  })
})
