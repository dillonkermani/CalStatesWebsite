import { motion } from 'framer-motion'
import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { useTheme } from '../../hooks/useTheme'

function GlowCard({ children, className, glowColor = 'cal', intensity = 'normal', ...props }) {
  const { isDark } = useTheme()

  // Border accent colors for subtle colored borders
  const borderColors = {
    cal: isDark ? 'border-cal-red/30' : 'border-cal-red/40',
    grass: isDark ? 'border-grass/30' : 'border-grass/40',
    bear: isDark ? 'border-bear-light/30' : 'border-bear-medium/40',
    mixed: isDark ? 'border-cal-red/20' : 'border-cal-red/30',
  }

  // Hover border colors
  const hoverBorderColors = {
    cal: 'group-hover:border-cal-red/60',
    grass: 'group-hover:border-grass/60',
    bear: 'group-hover:border-bear-light/60',
    mixed: 'group-hover:border-cal-red/50',
  }

  // Shadow colors for hover state (dark mode only)
  const shadowColors = {
    cal: 'group-hover:shadow-glow-red',
    grass: 'group-hover:shadow-glow-green',
    bear: 'group-hover:shadow-glow-brown',
    mixed: 'group-hover:shadow-glow-red',
  }

  // Left accent bar colors
  const accentColors = {
    cal: 'bg-cal-red',
    grass: 'bg-grass',
    bear: 'bg-bear-light',
    mixed: 'bg-gradient-to-b from-cal-red via-bear-light to-grass',
  }

  return (
    <motion.div
      className={twMerge(
        clsx(
          'group relative rounded-2xl',
          className
        )
      )}
      whileHover={{ y: -2 }}
      transition={{
        type: 'spring',
        stiffness: 400,
        damping: 25,
      }}
      {...props}
    >
      {/* Main card container */}
      <div
        className={clsx(
          'relative rounded-2xl overflow-hidden h-full',
          'transition-all duration-300',
          // Background - solid and opaque for readability
          isDark ? 'bg-surface-800' : 'bg-white',
          // Border with accent color
          'border-2',
          borderColors[glowColor],
          hoverBorderColors[glowColor],
          // Shadow - glow in dark mode, subtle shadow in light mode
          isDark ? shadowColors[glowColor] : 'shadow-card-light group-hover:shadow-card-light-hover',
        )}
      >
        {/* Left accent bar */}
        <div
          className={clsx(
            'absolute left-0 top-0 bottom-0 w-1 rounded-l-2xl',
            accentColors[glowColor],
          )}
        />

        {/* Subtle top gradient highlight (dark mode only) */}
        {isDark && (
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
        )}

        {/* Content */}
        <div className="relative z-10 h-full">{children}</div>
      </div>
    </motion.div>
  )
}

export default GlowCard
