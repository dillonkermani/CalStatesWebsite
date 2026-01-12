import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

const animations = {
  fadeUp: {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0 },
  },
  fadeDown: {
    hidden: { opacity: 0, y: -40 },
    visible: { opacity: 1, y: 0 },
  },
  fadeLeft: {
    hidden: { opacity: 0, x: -40 },
    visible: { opacity: 1, x: 0 },
  },
  fadeRight: {
    hidden: { opacity: 0, x: 40 },
    visible: { opacity: 1, x: 0 },
  },
  scale: {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1 },
  },
  blur: {
    hidden: { opacity: 0, filter: 'blur(10px)' },
    visible: { opacity: 1, filter: 'blur(0px)' },
  },
}

function AnimatedSection({
  children,
  animation = 'fadeUp',
  delay = 0,
  duration = 0.6,
  staggerChildren = false,
  staggerDelay = 0.1,
  threshold = 0.2,
  once = true,
  className,
  ...props
}) {
  const ref = useRef(null)
  const isInView = useInView(ref, {
    once,
    amount: threshold,
  })

  const containerVariants = staggerChildren
    ? {
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: {
            staggerChildren: staggerDelay,
            delayChildren: delay,
          },
        },
      }
    : animations[animation]

  const itemVariants = staggerChildren ? animations[animation] : undefined

  return (
    <motion.div
      ref={ref}
      className={twMerge(clsx(className))}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={containerVariants}
      transition={
        !staggerChildren
          ? {
              duration,
              delay,
              ease: [0.25, 0.1, 0.25, 1],
            }
          : undefined
      }
      {...props}
    >
      {staggerChildren
        ? Array.isArray(children)
          ? children.map((child, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                transition={{
                  duration,
                  ease: [0.25, 0.1, 0.25, 1],
                }}
              >
                {child}
              </motion.div>
            ))
          : children
        : children}
    </motion.div>
  )
}

export default AnimatedSection
