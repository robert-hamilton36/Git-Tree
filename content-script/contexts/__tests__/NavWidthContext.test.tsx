import React from 'react'
import { renderHook, act } from '@testing-library/react'
import { NavWidthProvider, TestStartingWidth, useNavWidth } from '../NavWidthContext'
import { editDocumentBodyMargin } from '../../util/createElements'

jest.mock('../../util/createElements')

const MockEditDocumentBodyMargin = editDocumentBodyMargin as jest.Mock


describe('<NavWidthProvider>', () => {
  test('renders provider with initial state', () => {
    const wrapper = ({ children }: ReactChildren) => <NavWidthProvider> {children} </NavWidthProvider>
    const { result } = renderHook(() => useNavWidth(), { wrapper })

    expect(result.current.navWidth).toBe(TestStartingWidth)
  })

  test('changes width to 400 ', () => {
    const wrapper = ({ children }: ReactChildren) => <NavWidthProvider> {children} </NavWidthProvider>
    const { result } = renderHook(() => useNavWidth(), { wrapper })

    expect(result.current.navWidth).toBe(TestStartingWidth)
    expect(MockEditDocumentBodyMargin).toHaveBeenCalledTimes(0)


    act(() => result.current.setNavWidth(400))

    expect(result.current.navWidth).toBe(400)
    expect(MockEditDocumentBodyMargin).toHaveBeenCalledTimes(1)
  })
})

