import { useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ChevronRight } from 'lucide-react'
import { useTheme } from '../../hooks/useTheme'

const menuVariants = {
  closed: {
    x: '100%',
    transition: {
      type: 'spring',
      stiffness: 400,
      damping: 40,
    },
  },
  open: {
    x: 0,
    transition: {
      type: 'spring',
      stiffness: 400,
      damping: 40,
    },
  },
}

const overlayVariants = {
  closed: {
    opacity: 0,
    transition: {
      duration: 0.3,
    },
  },
  open: {
    opacity: 1,
    transition: {
      duration: 0.3,
    },
  },
}

const linkVariants = {
  closed: {
    x: 50,
    opacity: 0,
  },
  open: (i) => ({
    x: 0,
    opacity: 1,
    transition: {
      delay: i * 0.1,
      type: 'spring',
      stiffness: 300,
      damping: 30,
    },
  }),
}

function MobileMenu({ isOpen, onClose, navLinks }) {
  const { isDark } = useTheme()

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }

    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        onClose()
      }
    }

    if (isOpen) {
      window.addEventListener('keydown', handleEscape)
    }

    return () => {
      window.removeEventListener('keydown', handleEscape)
    }
  }, [isOpen, onClose])

  const getAllLinks = () => {
    const links = []
    navLinks.forEach((link) => {
      links.push(link)
      if (link.dropdown) {
        link.dropdown.forEach((sublink) => {
          links.push({ ...sublink, isSublink: true })
        })
      }
    })
    return links
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop Overlay */}
          <motion.div
            variants={overlayVariants}
            initial="closed"
            animate="open"
            exit="closed"
            onClick={onClose}
            className={`fixed inset-0 z-50 backdrop-blur-md lg:hidden ${
              isDark ? 'bg-surface-900/80' : 'bg-white/80'
            }`}
          />

          {/* Slide-in Menu */}
          <motion.div
            variants={menuVariants}
            initial="closed"
            animate="open"
            exit="closed"
            className={`fixed top-0 right-0 bottom-0 z-50 w-full max-w-sm backdrop-blur-2xl border-l shadow-2xl lg:hidden ${
              isDark
                ? 'bg-surface-800/95 border-white/5'
                : 'bg-white/95 border-light-300'
            }`}
          >
            {/* Header */}
            <div className={`flex items-center justify-between p-6 border-b ${
              isDark ? 'border-white/5' : 'border-light-300'
            }`}>
              <div className="flex items-center gap-3">
                <img
                  src="/images/logo.png"
                  alt="Cal States Logo"
                  className="h-10 w-auto object-contain"
                />
                <span className="font-display text-lg font-bold">
                  <span className="bg-gradient-to-r from-cal-red via-cal-red-light to-cal-red bg-clip-text text-transparent">
                    CAL STATES
                  </span>
                  <span className={`ml-2 ${isDark ? 'text-white' : 'text-surface-900'}`}>2026</span>
                </span>
              </div>

              <motion.button
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                onClick={onClose}
                className={`p-2 rounded-lg transition-colors duration-200 ${
                  isDark
                    ? 'text-gray-400 hover:text-white hover:bg-white/10'
                    : 'text-surface-500 hover:text-surface-900 hover:bg-surface-100'
                }`}
                aria-label="Close menu"
              >
                <X className="h-6 w-6" />
              </motion.button>
            </div>

            {/* Navigation Links */}
            <nav className="p-6 space-y-2 overflow-y-auto max-h-[calc(100vh-200px)]">
              {getAllLinks().map((link, index) => (
                <motion.div
                  key={`${link.path}-${index}`}
                  custom={index}
                  variants={linkVariants}
                  initial="closed"
                  animate="open"
                  exit="closed"
                >
                  <NavLink
                    to={link.path}
                    onClick={onClose}
                    className={({ isActive }) =>
                      `group flex items-center justify-between px-4 py-3 rounded-xl text-lg font-semibold transition-all duration-300 ${
                        link.isSublink ? 'ml-4 text-base' : ''
                      } ${
                        isActive
                          ? 'bg-gradient-to-r from-grass/20 to-transparent text-grass border-l-2 border-grass'
                          : isDark
                            ? 'text-gray-300 hover:text-white hover:bg-white/5'
                            : 'text-surface-600 hover:text-surface-900 hover:bg-surface-100'
                      }`
                    }
                  >
                    {({ isActive }) => (
                      <>
                        <span className="relative">
                          {link.isSublink && (
                            <span className="mr-2 text-cal-red">-</span>
                          )}
                          {link.name}
                        </span>
                        <motion.div
                          animate={{ x: isActive ? 0 : -5, opacity: isActive ? 1 : 0 }}
                          transition={{ duration: 0.2 }}
                        >
                          <ChevronRight
                            className={`h-5 w-5 ${
                              isActive ? 'text-grass' : isDark ? 'text-gray-500' : 'text-surface-400'
                            }`}
                          />
                        </motion.div>
                      </>
                    )}
                  </NavLink>
                </motion.div>
              ))}
            </nav>

            {/* Footer */}
            <div className={`absolute bottom-0 left-0 right-0 p-6 border-t ${
              isDark ? 'border-white/5 bg-surface-900/50' : 'border-light-300 bg-light-100/50'
            }`}>
              <div className="text-center">
                <p className={`text-sm font-medium ${isDark ? 'text-gray-500' : 'text-surface-500'}`}>
                  California State Yo-Yo Contest
                </p>
                <a
                  href="mailto:california.state.yoyo@gmail.com"
                  className="text-sm text-grass hover:underline font-medium"
                >
                  california.state.yoyo@gmail.com
                </a>
              </div>

              {/* Decorative Gradient Line */}
              <motion.div
                className="mt-4 h-1 rounded-full bg-gradient-to-r from-cal-red via-cal-red-light to-cal-red"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 0.5, duration: 0.6 }}
              />
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

export default MobileMenu
