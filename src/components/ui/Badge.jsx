import { motion } from 'framer-motion'
import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { useTheme } from '../../hooks/useTheme'

function Badge({ children, variant = 'default', className, ...props }) {
  const { isDark } = useTheme()
  const isLive = variant === 'live'

  const variants = {
    default: [
      isDark ? 'bg-surface-700/80' : 'bg-surface-100',
      isDark ? 'text-white/80' : 'text-surface-700',
      isDark ? 'border border-white/10' : 'border border-light-300',
    ],
    success: [
      'bg-grass/10',
      'text-grass-light',
      'border border-grass/30',
    ],
    warning: [
      'bg-gold/10',
      'text-gold',
      'border border-gold/30',
    ],
    live: [
      'bg-cal-red/10',
      'text-cal-red-light',
      'border border-cal-red/50',
      'shadow-glow-red',
    ],
  }

  return (
    <motion.span
      className={twMerge(
        clsx(
          'inline-flex items-center gap-1.5',
          'px-3 py-1',
          'text-xs font-semibold font-display uppercase tracking-wider',
          'rounded-full',
          'transition-all duration-300',
          variants[variant],
          className
        )
      )}
      initial={isLive ? { scale: 1 } : undefined}
      animate={
        isLive
          ? {
              boxShadow: [
                '0 0 10px rgba(196, 30, 58, 0.3)',
                '0 0 20px rgba(196, 30, 58, 0.5)',
                '0 0 10px rgba(196, 30, 58, 0.3)',
              ],
            }
          : undefined
      }
      transition={
        isLive
          ? {
              duration: 1.5,
              repeat: Infinity,
              ease: 'easeInOut',
            }
          : undefined
      }
      {...props}
    >
      {isLive && (
        <span className="relative flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cal-red opacity-75" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-cal-red" />
        </span>
      )}
      {children}
    </motion.span>
  )
}

export default Badge
