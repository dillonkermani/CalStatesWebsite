import { useState, useEffect, useCallback } from 'react'

/**
 * Custom hook for countdown timer logic
 * @param {Date} targetDate - The target date to count down to
 * @returns {Object} - { days, hours, minutes, seconds, isComplete, isLive }
 */
export function useCountdown(targetDate) {
  const calculateTimeLeft = useCallback(() => {
    const now = new Date().getTime()
    const target = new Date(targetDate).getTime()
    const difference = target - now

    if (difference <= 0) {
      return {
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
        isComplete: true,
        isLive: difference > -86400000 // Within 24 hours after start = "live"
      }
    }

    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
      minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
      seconds: Math.floor((difference % (1000 * 60)) / 1000),
      isComplete: false,
      isLive: false
    }
  }, [targetDate])

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft)

  useEffect(() => {
    // Update immediately on mount
    setTimeLeft(calculateTimeLeft())

    // Set up interval to update every second
    const intervalId = setInterval(() => {
      setTimeLeft(calculateTimeLeft())
    }, 1000)

    // Cleanup interval on unmount
    return () => clearInterval(intervalId)
  }, [calculateTimeLeft])

  return timeLeft
}

export default useCountdown
