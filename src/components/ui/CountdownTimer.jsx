import { motion, AnimatePresence } from 'framer-motion'
import { useCountdown } from '../../hooks/useCountdown'
import { useTheme } from '../../hooks/useTheme'

// Target date: April 25, 2026 at 10:00 AM PST
const EVENT_DATE = new Date('2026-04-25T10:00:00-07:00')

/**
 * Individual flip digit component with animation
 */
function FlipDigit({ value, label, isDark }) {
  // Pad single digits with leading zero
  const displayValue = String(value).padStart(2, '0')

  return (
    <div className="flex flex-col items-center">
      <div className="relative">
        {/* Digit container with glassmorphism */}
        <div className={`relative overflow-hidden rounded-xl ${isDark ? 'bg-surface-800/70 border-white/10' : 'bg-white/90 border-light-300'} backdrop-blur-xl border shadow-2xl`}>
          {/* Neon glow effect */}
          <div className="absolute inset-0 bg-gradient-to-b from-grass/10 to-transparent pointer-events-none" />

          {/* Top reflection */}
          <div className="absolute top-0 left-0 right-0 h-1/2 bg-gradient-to-b from-white/5 to-transparent pointer-events-none" />

          {/* Digit display */}
          <div className="relative px-4 py-3 sm:px-6 sm:py-4 md:px-8 md:py-5">
            <AnimatePresence mode="popLayout">
              <motion.span
                key={displayValue}
                initial={{ y: -20, opacity: 0, scale: 0.8 }}
                animate={{ y: 0, opacity: 1, scale: 1 }}
                exit={{ y: 20, opacity: 0, scale: 0.8 }}
                transition={{
                  type: 'spring',
                  stiffness: 300,
                  damping: 25,
                  mass: 0.8
                }}
                className={`block font-mono text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold ${isDark ? 'text-white' : 'text-surface-900'} tracking-tight`}
                style={{ fontFamily: "'JetBrains Mono', monospace" }}
              >
                {displayValue}
              </motion.span>
            </AnimatePresence>
          </div>

          {/* Center divider line */}
          <div className={`absolute left-0 right-0 top-1/2 h-px ${isDark ? 'bg-surface-700/50' : 'bg-light-300'} transform -translate-y-1/2`} />
        </div>

        {/* Outer glow */}
        <div className="absolute -inset-1 rounded-xl bg-grass/20 blur-xl opacity-50 -z-10" />
      </div>

      {/* Label */}
      <span className={`mt-2 sm:mt-3 text-xs sm:text-sm font-medium ${isDark ? 'text-gray-400' : 'text-surface-600'} uppercase tracking-widest`}>
        {label}
      </span>
    </div>
  )
}

/**
 * Pulsing separator colon between digit groups
 */
function Separator() {
  return (
    <motion.div
      className="flex flex-col justify-center items-center gap-2 sm:gap-3 px-1 sm:px-2 md:px-3 pb-6"
      animate={{ opacity: [1, 0.3, 1] }}
      transition={{
        duration: 1,
        repeat: Infinity,
        ease: 'easeInOut'
      }}
    >
      <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-grass shadow-lg shadow-grass/50" />
      <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-grass shadow-lg shadow-grass/50" />
    </motion.div>
  )
}

/**
 * Event status display for completed or in-progress states
 */
function EventStatus({ isLive, isDark }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col items-center justify-center py-8 sm:py-12"
    >
      {isLive ? (
        <>
          <motion.div
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="relative"
          >
            <div className="absolute inset-0 rounded-full bg-green-500/30 blur-xl animate-pulse" />
            <div className="relative px-6 py-3 rounded-full bg-green-500/20 border border-green-500/50">
              <span className="flex items-center gap-3 text-green-400 font-bold text-xl sm:text-2xl uppercase tracking-wider">
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500" />
                </span>
                Event In Progress
              </span>
            </div>
          </motion.div>
          <p className={`mt-4 ${isDark ? 'text-gray-400' : 'text-surface-600'} text-sm sm:text-base`}>
            The competition is happening now!
          </p>
        </>
      ) : (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="relative px-6 py-3 rounded-full bg-surface-700/50 border border-white/10"
          >
            <span className={`${isDark ? 'text-gray-300' : 'text-surface-800'} font-bold text-xl sm:text-2xl uppercase tracking-wider`}>
              Event Completed
            </span>
          </motion.div>
          <p className={`mt-4 ${isDark ? 'text-gray-400' : 'text-surface-600'} text-sm sm:text-base`}>
            Thank you for an amazing competition!
          </p>
        </>
      )}
    </motion.div>
  )
}

/**
 * Main countdown timer component
 * Displays a futuristic flip-clock style countdown to the event
 */
export function CountdownTimer() {
  const { isDark } = useTheme()
  const { days, hours, minutes, seconds, isComplete, isLive } = useCountdown(EVENT_DATE)

  return (
    <div className="w-full max-w-4xl mx-auto px-4">
      {/* Container with glassmorphism and neon glow */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="relative rounded-2xl sm:rounded-3xl overflow-hidden"
      >
        {/* Background glow effects */}
        <div className="absolute -inset-1 bg-gradient-to-r from-grass/30 via-bear-medium/20 to-grass/30 rounded-3xl blur-xl opacity-60" />

        {/* Main container */}
        <div className="relative glass-strong rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-10">
          {/* Subtle top border glow */}
          <div className="absolute top-0 left-1/4 right-1/4 h-px bg-gradient-to-r from-transparent via-grass/50 to-transparent" />

          {isComplete ? (
            <EventStatus isLive={isLive} isDark={isDark} />
          ) : (
            <>
              {/* Header */}
              <motion.h3
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className={`text-center ${isDark ? 'text-gray-400' : 'text-surface-600'} text-sm sm:text-base font-medium uppercase tracking-widest mb-6 sm:mb-8`}
              >
                Competition Starts In
              </motion.h3>

              {/* Countdown display */}
              <div className="flex justify-center items-start gap-1 sm:gap-2 md:gap-4">
                <FlipDigit value={days} label="Days" isDark={isDark} />
                <Separator />
                <FlipDigit value={hours} label="Hours" isDark={isDark} />
                <Separator />
                <FlipDigit value={minutes} label="Mins" isDark={isDark} />
                <Separator />
                <FlipDigit value={seconds} label="Secs" isDark={isDark} />
              </div>

              {/* Event date display */}
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className={`text-center ${isDark ? 'text-gray-500' : 'text-surface-500'} text-xs sm:text-sm mt-6 sm:mt-8`}
              >
                April 25, 2026 at 10:00 AM PST
              </motion.p>
            </>
          )}

          {/* Bottom accent line */}
          <div className="absolute bottom-0 left-1/4 right-1/4 h-px bg-gradient-to-r from-transparent via-cal-red/30 to-transparent" />
        </div>
      </motion.div>
    </div>
  )
}

export default CountdownTimer
