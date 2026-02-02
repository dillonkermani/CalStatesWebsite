import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { useTheme } from '../../hooks/useTheme'

function TimelineItem({
  time,
  title,
  description,
  icon,
  index,
  isLast,
  variant = 'default',
  isDark,
}) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.5 })
  const isEven = index % 2 === 0

  const variantColors = {
    default: 'bg-cal-red',
    highlight: 'bg-grass',
    warning: 'bg-gold',
    live: 'bg-cal-red',
  }

  const glowColors = {
    default: 'shadow-cal-red',
    highlight: 'shadow-grass',
    warning: '0 0 20px rgba(254, 228, 64, 0.5)',
    live: 'shadow-cal-red',
  }

  return (
    <div ref={ref} className="relative">
      {/* Desktop layout - alternating sides */}
      <div className="hidden md:grid md:grid-cols-[1fr_auto_1fr] md:gap-8">
        {/* Left content */}
        <motion.div
          className={clsx(
            'flex',
            isEven ? 'justify-end' : 'justify-end opacity-0'
          )}
          initial={{ opacity: 0, x: isEven ? -50 : 50 }}
          animate={isInView ? { opacity: isEven ? 1 : 0, x: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {isEven && (
            <div className="text-right">
              <span className="inline-block px-3 py-1 mb-2 text-sm font-mono text-grass bg-grass/10 rounded-lg border border-grass/30">
                {time}
              </span>
              <div className={`p-4 rounded-xl ${isDark ? 'bg-surface-800/60 border-white/5' : 'bg-white border-light-300'} backdrop-blur-sm border max-w-sm`}>
                <h4 className={`font-display font-semibold ${isDark ? 'text-white' : 'text-surface-900'} mb-1`}>
                  {title}
                </h4>
                {description && (
                  <p className={`text-sm ${isDark ? 'text-white/60' : 'text-surface-600'}`}>{description}</p>
                )}
              </div>
            </div>
          )}
        </motion.div>

        {/* Center line and node */}
        <div className="relative flex flex-col items-center">
          {/* Glowing node */}
          <motion.div
            className={clsx(
              'relative z-10 flex items-center justify-center w-4 h-4 rounded-full',
              variantColors[variant]
            )}
            initial={{ scale: 0 }}
            animate={isInView ? { scale: 1 } : {}}
            transition={{
              type: 'spring',
              stiffness: 300,
              damping: 20,
              delay: 0.1,
            }}
            style={{
              boxShadow:
                typeof glowColors[variant] === 'string' &&
                glowColors[variant].startsWith('0')
                  ? glowColors[variant]
                  : undefined,
            }}
          >
            {/* Pulse effect for live variant */}
            {variant === 'live' && (
              <span className="absolute inset-0 rounded-full bg-cal-red animate-ping opacity-50" />
            )}
            {icon && (
              <span className="absolute -top-1 -right-1 text-xs">{icon}</span>
            )}
          </motion.div>

          {/* Connecting line */}
          {!isLast && (
            <motion.div
              className="w-[2px] h-24 bg-gradient-to-b from-cal-red/50 to-gold/30"
              initial={{ scaleY: 0, originY: 0 }}
              animate={isInView ? { scaleY: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.3 }}
            />
          )}
        </div>

        {/* Right content */}
        <motion.div
          className={clsx(
            'flex',
            !isEven ? 'justify-start' : 'justify-start opacity-0'
          )}
          initial={{ opacity: 0, x: !isEven ? 50 : -50 }}
          animate={isInView ? { opacity: !isEven ? 1 : 0, x: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {!isEven && (
            <div>
              <span className="inline-block px-3 py-1 mb-2 text-sm font-mono text-grass bg-grass/10 rounded-lg border border-grass/30">
                {time}
              </span>
              <div className={`p-4 rounded-xl ${isDark ? 'bg-surface-800/60 border-white/5' : 'bg-white border-light-300'} backdrop-blur-sm border max-w-sm`}>
                <h4 className={`font-display font-semibold ${isDark ? 'text-white' : 'text-surface-900'} mb-1`}>
                  {title}
                </h4>
                {description && (
                  <p className={`text-sm ${isDark ? 'text-white/60' : 'text-surface-600'}`}>{description}</p>
                )}
              </div>
            </div>
          )}
        </motion.div>
      </div>

      {/* Mobile layout - single side */}
      <div className="md:hidden flex gap-4">
        {/* Line and node */}
        <div className="relative flex flex-col items-center">
          <motion.div
            className={clsx(
              'relative z-10 flex items-center justify-center w-3 h-3 rounded-full',
              variantColors[variant]
            )}
            initial={{ scale: 0 }}
            animate={isInView ? { scale: 1 } : {}}
            transition={{
              type: 'spring',
              stiffness: 300,
              damping: 20,
            }}
          >
            {variant === 'live' && (
              <span className="absolute inset-0 rounded-full bg-cal-red animate-ping opacity-50" />
            )}
          </motion.div>
          {!isLast && (
            <motion.div
              className="w-[2px] flex-1 min-h-[60px] bg-gradient-to-b from-cal-red/50 to-gold/30"
              initial={{ scaleY: 0, originY: 0 }}
              animate={isInView ? { scaleY: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.2 }}
            />
          )}
        </div>

        {/* Content */}
        <motion.div
          className="flex-1 pb-6"
          initial={{ opacity: 0, x: 20 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <span className="inline-block px-2 py-0.5 mb-2 text-xs font-mono text-grass bg-grass/10 rounded border border-grass/30">
            {time}
          </span>
          <div className={`p-3 rounded-lg ${isDark ? 'bg-surface-800/60 border-white/5' : 'bg-white border-light-300'} backdrop-blur-sm border`}>
            <h4 className={`font-display font-semibold ${isDark ? 'text-white' : 'text-surface-900'} text-sm mb-0.5`}>
              {title}
            </h4>
            {description && (
              <p className={`text-xs ${isDark ? 'text-white/60' : 'text-surface-600'}`}>{description}</p>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  )
}

function Timeline({ items, className, ...props }) {
  const { isDark } = useTheme()

  return (
    <div
      className={twMerge(clsx('relative py-8', className))}
      {...props}
    >
      {items.map((item, index) => (
        <TimelineItem
          key={index}
          {...item}
          index={index}
          isLast={index === items.length - 1}
          isDark={isDark}
        />
      ))}
    </div>
  )
}

export default Timeline
