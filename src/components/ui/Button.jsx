import { motion } from 'framer-motion'
import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { forwardRef } from 'react'
import { useTheme } from '../../hooks/useTheme'

const Button = forwardRef(function Button(
  {
    children,
    variant = 'primary',
    size = 'md',
    className,
    disabled = false,
    ...props
  },
  ref
) {
  const { isDark } = useTheme()

  const variants = {
    primary: [
      'bg-gradient-cal bg-[length:200%_200%] animate-gradient',
      'text-white font-bold',
      'border border-transparent',
      isDark ? 'shadow-glow-red' : 'shadow-lg shadow-cal-red/20',
      'hover:scale-105',
    ],
    secondary: [
      'bg-transparent',
      isDark ? 'text-white' : 'text-cal-red',
      'font-bold',
      'border-2 border-cal-red',
      isDark ? 'hover:bg-cal-red/10 hover:shadow-glow-red' : 'hover:bg-cal-red/5',
      'hover:scale-105',
    ],
    ghost: [
      'bg-transparent',
      isDark ? 'text-white/80' : 'text-surface-700',
      'font-semibold',
      'border border-transparent',
      isDark ? 'hover:text-white hover:bg-white/5' : 'hover:text-surface-900 hover:bg-surface-100',
    ],
  }

  const sizes = {
    sm: 'px-4 py-2 text-sm rounded-lg',
    md: 'px-6 py-3 text-base rounded-xl',
    lg: 'px-8 py-4 text-lg rounded-2xl',
  }

  const buttonClasses = twMerge(
    clsx(
      'relative inline-flex items-center justify-center',
      'font-display tracking-wide',
      'transition-all duration-300 ease-out',
      isDark
        ? 'focus:outline-none focus:ring-2 focus:ring-cal-red/50 focus:ring-offset-2 focus:ring-offset-surface-900'
        : 'focus:outline-none focus:ring-2 focus:ring-cal-red/50 focus:ring-offset-2 focus:ring-offset-white',
      'disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100',
      variants[variant],
      sizes[size],
      className
    )
  )

  return (
    <motion.button
      ref={ref}
      className={buttonClasses}
      disabled={disabled}
      whileHover={disabled ? {} : { scale: 1.05 }}
      whileTap={disabled ? {} : { scale: 0.98 }}
      transition={{
        type: 'spring',
        stiffness: 400,
        damping: 17,
      }}
      {...props}
    >
      {variant === 'primary' && isDark && (
        <span className="absolute inset-0 rounded-[inherit] bg-gradient-cal opacity-0 blur-xl transition-opacity duration-300 group-hover:opacity-50" />
      )}
      <span className="relative z-10 flex items-center gap-2">{children}</span>
    </motion.button>
  )
})

export default Button
