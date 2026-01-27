import { useEffect, useState } from 'react'

export function useIsMdDown() {
  const [isMdDown, setIsMdDown] = useState(false)
  useEffect(() => {
    function handleResize() {
      setIsMdDown(window.innerWidth <= 768)
    }
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])
  return isMdDown
}

export function useIsLgDown() {
  const [isLgDown, setIsLgDown] = useState(false)
  useEffect(() => {
    function handleResize() {
      setIsLgDown(window.innerWidth <= 1024)
    }
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])
  return isLgDown
}
