import { motion } from 'framer-motion'
import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

const gradients = {
  cal: 'from-cal-red via-cal-red-light to-cal-red',
  mixed: 'from-cal-red via-bear-light to-grass',
  bear: 'from-bear-tan via-bear-light to-bear-medium',
  grass: 'from-grass-light via-grass to-grass-dark',
  white: 'from-white via-accent-gray to-white',
}

function GradientText({
  children,
  as: Component = 'span',
  gradient = 'cal',
  animate = true,
  className,
  ...props
}) {
  const MotionComponent = motion.create(Component)

  return (
    <MotionComponent
      className={twMerge(
        clsx(
          'bg-gradient-to-r bg-clip-text text-transparent',
          gradients[gradient],
          animate && 'bg-[length:200%_auto] animate-gradient',
          className
        )
      )}
      {...props}
    >
      {children}
    </MotionComponent>
  )
}

export default GradientText
