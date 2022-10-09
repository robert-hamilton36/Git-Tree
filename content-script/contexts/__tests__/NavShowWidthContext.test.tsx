import React from 'react'
import { renderHook, act } from '@testing-library/react'
import { NavWidthProvider, startingWidth, TestStartingWidth, useNavWidth, useShowNav } from '../NavShowWidthContext'
import { editDocumentBodyMargin } from '../../util/createElements'

jest.mock('../../util/createElements')

const MockEditDocumentBodyMargin = editDocumentBodyMargin as jest.Mock


describe('<NavWidthProvider>', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })
  test('renders provider with initial state', () => {
    const wrapper = ({ children }: ReactChildren) => <NavWidthProvider> {children} </NavWidthProvider>
    const { result: widthResult } = renderHook(() => useNavWidth(), { wrapper })
    const { result: showResult } = renderHook(() => useShowNav(), { wrapper })

    expect(widthResult.current.navWidth).toBe(TestStartingWidth)
    expect(widthResult.current.setNavWidth).toBeTruthy()
    expect(showResult.current.showNav).toBe(true)
    expect(showResult.current.setShowNav).toBeTruthy()
    expect(MockEditDocumentBodyMargin).toHaveBeenCalledTimes(0)
  })

  test('changes width to 400 and updates ', () => {
    const wrapper = ({ children }: ReactChildren) => <NavWidthProvider> {children} </NavWidthProvider>
    const { result } = renderHook(() => useNavWidth(), { wrapper })

    expect(result.current.navWidth).toBe(TestStartingWidth)
    expect(MockEditDocumentBodyMargin).toHaveBeenCalledTimes(0)


    act(() => result.current.setNavWidth(400))

    expect(result.current.navWidth).toBe(400)
    expect(MockEditDocumentBodyMargin).toHaveBeenCalledTimes(1)
    expect(MockEditDocumentBodyMargin).toHaveBeenCalledWith(400)
  })

  test('changes showNav to false and back to true', () => {
    const wrapper = ({ children }: ReactChildren) => <NavWidthProvider> {children} </NavWidthProvider>
    const { result } = renderHook(() => useShowNav(), { wrapper })

    expect(result.current.showNav).toBe(true)
    expect(MockEditDocumentBodyMargin).toHaveBeenCalledTimes(0)

    act(() => result.current.setShowNav(false))

    expect(result.current.showNav).toBe(false)
    expect(MockEditDocumentBodyMargin).toHaveBeenCalledTimes(1)
    expect(MockEditDocumentBodyMargin).toHaveBeenCalledWith(0)

    act(() => result.current.setShowNav(true))

    expect(result.current.showNav).toBe(true)
    expect(MockEditDocumentBodyMargin).toHaveBeenCalledTimes(2)
    expect(MockEditDocumentBodyMargin).toHaveBeenCalledWith(startingWidth)

  })
})
