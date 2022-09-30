import React from 'react'
import { renderHook, act } from '@testing-library/react'
import { UserProvider, useUserData } from "../UserContext";
import { TEST_APIUserData } from '../../../testing/testdata/GithubUser';

describe('<UserProvider>', () => {
  test('renders provider with initial state', () => {
    const wrapper = ({ children }: ReactChildren) => <UserProvider> {children} </UserProvider>
    const { result } = renderHook(() => useUserData(), { wrapper })

    expect(result.current.user).toBeUndefined()
  })

  test('changes user data', () => {
    const wrapper = ({ children }: ReactChildren) => <UserProvider> {children} </UserProvider>
    const { result } = renderHook(() => useUserData(), { wrapper })

    expect(result.current.user).toBeUndefined()

    act(() => result.current.setUser(TEST_APIUserData))

    expect(result.current.user).toEqual(TEST_APIUserData)
  })
})