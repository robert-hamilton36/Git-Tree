import React, { useEffect, useState } from 'react'
import { startingWidth, useNavWidth } from '../contexts/NavWidthContext'

const borderWidth = 3
const minWidth = startingWidth - borderWidth

/**
 *  Element has full height
 *  3px width
 * 
 * Resizing occurs with three different mouse events
 * 1. mousedown
 *      resize can only start after clicking on this element so mousedownevent is tied to this component
 *      it sets resizingActive to true
 * 2. mouseup
 *      resize ends whenever mouse button is let go regardless of where the mouse is, so event is tied to the document to always listen
 *      it sets resizingActive to false
 * 3. mousemove
 *      the width is taken from mousemove pageX location, is tied to the document
 *      if tied to component you couldn't get a width larger than the width of container, as you'd move out of the container before its size changed
 *      it sets the navWidth
 */

export const ResizeBorder: React.FC<Props> = ({children, showNav, setShowNav}) => {
  const { setNavWidth } = useNavWidth()
  const [ resizingActive, setResizingActive ] = useState(false)
  
  useEffect(() => {
    // add these listeners to the document so they still happen when mouse moves away from this component
    document.addEventListener('mouseup', handleMouseUp)
    document.addEventListener('mousemove', handler)

    return () => {
      document.removeEventListener('mouseup', handleMouseUp)
      document.removeEventListener('mousemove', handler)
    }
  })

  const handler = (event: MouseEvent) => {
    // if the mouse moves off the browsers window stop editing size
    if (resizingActive && event.pageX < 1) {
      setResizingActive(false)
    }

    // only resize navbar if resizing is active and resize would be larger than minwidth
    if (resizingActive && event.pageX > minWidth) {
      setNavWidth(event.pageX)
    }
    
    // close navbar when dragged below 50
    if (showNav && resizingActive && event.pageX <= 50) {
      setShowNav(false)
    }

    //open navbar when dragged beyond 100
    if (!showNav && resizingActive && event.pageX >= 100) {
      setShowNav(true)
    }
  } 
  
  const handleMouseDownClick = () => {
    setResizingActive(true)
  }

  const handleMouseUp = () => {
    setResizingActive(false)
  }

  return (
    <>
      {children}
      <div className='GitTree-ResizeBorder' style={{borderRightWidth: borderWidth}}
        onMouseDown={handleMouseDownClick}
        >
      </div>
    </>
  )
}

interface Props {
  children?: React.ReactNode;
  showNav: boolean;
  setShowNav: React.Dispatch<React.SetStateAction<boolean>>;

}