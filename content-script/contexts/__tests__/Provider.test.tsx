import React from 'react'
import { render, renderHook } from '@testing-library/react'
import { Providers } from '../Providers'
import { startingWidth, useNavWidth, useShowNav } from '../NavShowWidthContext'
import { useTree } from '../TreeContext'
import { useGitRepo } from '../GitRepoContexts'
import { useUserData } from '../UserContext'

describe('<Providers>', () => {
  test('renders all Providers and has access to all contexts', () => {
    const wrapper = ({ children }: ReactChildren) => <Providers> {children} </Providers>
    const { result: navResult } = renderHook(() => useNavWidth(), { wrapper })
    const { result: showResult } = renderHook(() => useShowNav(), { wrapper })
    const { result: treeResult } = renderHook(() => useTree(), { wrapper })
    const { result: gitRepoResult } = renderHook(() => useGitRepo(), { wrapper })
    const { result: userDataResult } = renderHook(() => useUserData(), { wrapper })

    expect(navResult.current.navWidth).toBe(startingWidth)
    expect(navResult.current.setNavWidth).toBeTruthy()

    expect(showResult.current.showNav).toBe(true)
    expect(showResult.current.setShowNav).toBeTruthy()

    expect(treeResult.current.tree).toEqual([])
    expect(treeResult.current.setTree).toBeTruthy()

    expect(gitRepoResult.current.userName).toEqual('')
    expect(gitRepoResult.current.setUserName).toBeTruthy()

    expect(gitRepoResult.current.repo).toEqual('')
    expect(gitRepoResult.current.setRepo).toBeTruthy()

    expect(gitRepoResult.current.branch).toEqual('')
    expect(gitRepoResult.current.setBranch).toBeTruthy()

    expect(userDataResult.current.user).toBeNull()
    expect(userDataResult.current.setUser).toBeTruthy()
  })
  test('renders children', () => {
    const Children = () => {
      return (
        <div>
          child
        </div>
      )
    }
    
    const { getByText } = render(
      <Providers>
        <Children />
      </Providers>
    )

    const child = getByText('child')
    expect(child).toBeTruthy()
  })
})