import { useState, useEffect, useCallback, useRef } from 'react'

/**
 * Custom hook for tracking scroll position with debouncing
 * @param {number} delay - Debounce delay in milliseconds, default 10
 * @returns {number} - Current scrollY position
 */
export function useScrollPosition(delay = 10) {
  const [scrollY, setScrollY] = useState(0)
  const timeoutRef = useRef(null)

  const handleScroll = useCallback(() => {
    // Clear any pending timeout
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }

    // Debounce the scroll update
    timeoutRef.current = setTimeout(() => {
      setScrollY(window.scrollY)
    }, delay)
  }, [delay])

  useEffect(() => {
    // Set initial scroll position
    setScrollY(window.scrollY)

    // Add scroll listener with passive flag for performance
    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => {
      window.removeEventListener('scroll', handleScroll)
      // Clean up any pending timeout
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [handleScroll])

  return scrollY
}

export default useScrollPosition
