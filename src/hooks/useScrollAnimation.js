import { useState, useEffect, useRef } from 'react'

/**
 * Custom hook for scroll-triggered animations using Intersection Observer
 * @param {Object} options - Configuration options
 * @param {number} options.threshold - Visibility threshold (0-1), default 0.2
 * @param {string} options.rootMargin - Root margin for observer, default '0px'
 * @param {boolean} options.triggerOnce - Only trigger once, default true
 * @returns {Object} - { ref, isInView }
 */
export function useScrollAnimation({
  threshold = 0.2,
  rootMargin = '0px',
  triggerOnce = true
} = {}) {
  const ref = useRef(null)
  const [isInView, setIsInView] = useState(false)
  const hasTriggered = useRef(false)

  useEffect(() => {
    const element = ref.current
    if (!element) return

    // Skip if already triggered and triggerOnce is true
    if (triggerOnce && hasTriggered.current) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        const inView = entry.isIntersecting

        if (inView) {
          setIsInView(true)
          if (triggerOnce) {
            hasTriggered.current = true
            observer.unobserve(element)
          }
        } else if (!triggerOnce) {
          setIsInView(false)
        }
      },
      {
        threshold,
        rootMargin
      }
    )

    observer.observe(element)

    return () => {
      observer.unobserve(element)
    }
  }, [threshold, rootMargin, triggerOnce])

  return { ref, isInView }
}

export default useScrollAnimation
